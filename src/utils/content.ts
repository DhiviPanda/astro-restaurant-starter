import type { Locale } from '../i18n/index.ts';
import catalog from '../data/catalog.json';
import { siteIdentity } from '../config.ts';

const WP_MODE = import.meta.env.WP_MODE === 'true';
const WP_API_URL = import.meta.env.WP_API_URL;

export type Service = 'mediodia' | 'noche';

export interface Dish {
  slug: string;
  no: string;
  category: 'carnes' | 'verdes' | 'acompanantes';
  price: string;
  allergens: string[];
  days: number[];
  service: Service[];
  season: { from: string; to: string } | null;
  pairing: string | null;
  producer: string | null;
  vegan: boolean;
  img: string;
  video: string;
  name: string;
  line: string;
  ingredients: string;
  story: string;
}

/** Textos del idioma. En WP_MODE se sustituye por la REST API de Polylang. */
async function getStrings(locale: Locale) {
  if (WP_MODE && WP_API_URL) {
    try {
      const res = await fetch(`${WP_API_URL}/pages?lang=${locale}&slug=home`);
      const pages = await res.json();
      if (pages?.[0]?.acf) return pages[0].acf;
    } catch {
      // Si WordPress no responde, caemos a los mocks sin romper el build.
    }
  }
  const data = await import(`../data/mock/${locale}.json`);
  return data.default;
}

/** Catálogo + textos cruzados por slug. */
export async function getContent(locale: Locale) {
  const raw = await getStrings(locale);

  // Los datos del restaurante vienen de config.ts, no del archivo de idioma.
  // Así dirección, teléfono y email viven en un sitio y no en tres.
  const t = { ...raw, site: { ...raw.site, ...siteIdentity } };

  const dishes: Dish[] = catalog.dishes.map((d) => ({
    ...(d as Omit<Dish, 'name' | 'line' | 'ingredients' | 'story'>),
    ...(t.dishes[d.slug] ?? { name: d.slug, line: '', ingredients: '', story: '' }),
  }));

  const wines = catalog.wines.map((w) => ({ ...w, ...(t.wines[w.slug] ?? {}) }));
  const producers = catalog.producers.map((p) => ({ ...p, ...(t.producers[p.slug] ?? {}) }));

  return { t, dishes, wines, producers, catalog };
}

/* ─────────────────────────────────────────────
   Lógica de disponibilidad — toda pura, sin JS
   en cliente salvo donde el navegador debe decidir
   ───────────────────────────────────────────── */

/** Franja de servicio según la hora. Devuelve null fuera de horario. */
export function serviceAt(date = new Date()): Service | null {
  const mins = date.getHours() * 60 + date.getMinutes();
  const { mediodia, noche } = catalog.service;
  const toMin = (s: string) => {
    const [h, m] = s.split(':').map(Number);
    return h * 60 + m;
  };
  if (mins >= toMin(mediodia.from) && mins < toMin(mediodia.to)) return 'mediodia';
  // La noche cruza medianoche: 20:00 → 00:00
  if (mins >= toMin(noche.from) || mins < toMin('04:00')) return 'noche';
  return null;
}

/** ¿El restaurante está abierto ahora? */
export function openState(date = new Date()) {
  const day = date.getDay();
  const slot = catalog.openingHours.find((h) => h.day === day);
  if (!slot) return { open: false, slot: null };

  const mins = date.getHours() * 60 + date.getMinutes();
  const toMin = (s: string) => {
    const [h, m] = s.split(':').map(Number);
    return h * 60 + m;
  };
  const from = toMin(slot.from);
  const to = toMin(slot.to);
  const open = to <= from
    ? mins >= from || mins < to  // cruza medianoche
    : mins >= from && mins < to;

  return { open, slot };
}

/** ¿El restaurante abre hoy? (hay franja definida para ese día) */
export function opensOnDay(date = new Date()): boolean {
  return catalog.openingHours.some((h) => h.day === date.getDay());
}

/**
 * ¿El plato se sirve hoy? (día de la semana + temporada)
 * En un día de cierre devuelve `true`: si el restaurante no abre,
 * marcar plato por plato "hoy no" es ruido — el estado de cierre
 * ya se comunica en la barra superior.
 */
export function availableToday(dish: Dish, date = new Date()): boolean {
  if (!opensOnDay(date)) return true;
  if (!dish.days.includes(date.getDay())) return false;
  if (dish.season) {
    const today = date.toISOString().slice(0, 10);
    if (today < dish.season.from || today > dish.season.to) return false;
  }
  return true;
}

/** Días que quedan de temporada. null si el plato no es de temporada. */
export function seasonDaysLeft(dish: Dish, date = new Date()): number | null {
  if (!dish.season) return null;
  const end = new Date(dish.season.to + 'T23:59:59');
  const diff = Math.ceil((end.getTime() - date.getTime()) / 86_400_000);
  return diff > 0 ? diff : 0;
}

/** ¿Hay mesa del chef hoy? */
export function chefTableToday(date = new Date()): boolean {
  const { active, days } = catalog.chefTable;
  return active && days.includes(date.getDay());
}
