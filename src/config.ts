/* ═══════════════════════════════════════════════════════════
   CONFIGURACIÓN DEL RESTAURANTE

   Este es el archivo que tienes que tocar. Todo lo que hay aquí
   es igual en los tres idiomas, así que vive en un solo sitio y
   no puede desincronizarse entre es.json, en.json y fr.json.

   Lo que NO está aquí:
   · El dominio          → astro.config.mjs, campo `site`
   · Textos traducibles  → src/data/mock/{es,en,fr}.json
   · Carta y horarios    → src/data/catalog.json
   · Claves y secretos   → .env
   ═══════════════════════════════════════════════════════════ */

/**
 * Red de seguridad por si falta `site` en astro.config.mjs.
 * No hace falta tocarlo: el dominio real va allí.
 */
export const FALLBACK_SITE = 'https://brasa.example';

export const restaurant = {
  /** Nombre de marca. Sale en el logo, el pie y los metadatos. */
  name: 'BRASA',

  /* ── Dirección ─────────────────────────────────────────── */
  address: 'Claudio Coello 41',
  district: 'Barrio de Salamanca',
  city: 'Madrid',
  region: 'Madrid',
  postalCode: '28001',
  country: 'ES',

  /** Coordenadas para el schema y el enlace al mapa.
   *  Las sacas de Google Maps: clic derecho sobre el punto. */
  geo: { lat: '40.4283', lng: '-3.6843' },

  /* ── Contacto ──────────────────────────────────────────── */
  phone: '+34 910 00 00 00',
  email: 'hola@brasa.example',

  /** Horario tal y como se muestra en la barra superior.
   *  El horario real que gobierna la lógica está en catalog.json. */
  hours: '13:30 - 00:00',

  /* ── Datos para el schema de Google ────────────────────── */
  cuisine: ['Burgers', 'Grill'],
  priceRange: '€€€',

  /** Perfiles sociales. Google los usa para el panel de conocimiento.
   *  Déjalo vacío si no hay: es mejor que poner enlaces falsos. */
  sameAs: [] as string[],

  /** Sistema de reservas. Vacío = el botón ancla a la sección de reservas.
   *  Si usas Covermanager, TheFork o similar, pega aquí la URL. */
  reservationUrl: '',
} as const;

/** Lo que se mezcla dentro de `t.site` para que los componentes
 *  sigan leyendo `t.site.phone` sin saber de dónde viene. */
export const siteIdentity = {
  name: restaurant.name,
  address: restaurant.address,
  district: restaurant.district,
  city: restaurant.city,
  phone: restaurant.phone,
  email: restaurant.email,
  hours: restaurant.hours,
};
