import { crearMemoria } from './memoria-local.js';

/* Claves que ya existen en el proyecto */
const K_ALERGENOS = 'brasa_allergens';
const K_USUAL = 'brasa_usual';

export const memoria = crearMemoria({
  ns: 'brasa',
  clavesExtra: [K_ALERGENOS, K_USUAL],
});

/* ── Plato de siempre declarado a mano ── */

export function usualManual() {
  if (!memoria.disponible()) return null;
  try { return localStorage.getItem(K_USUAL); } catch { return null; }
}

export function alternarUsual(slug) {
  if (!memoria.disponible() || !slug) return;
  try {
    if (usualManual() === slug) localStorage.removeItem(K_USUAL);
    else localStorage.setItem(K_USUAL, slug);
  } catch {}
  document.dispatchEvent(new CustomEvent(memoria.EVENTO));
}

/**
 * Lo declarado gana. El historial solo decide si no hay elección manual.
 * Devuelve { id, origen } para poder matizar el texto.
 */
export function platoDestacado() {
  const manual = usualManual();
  if (manual) return { id: manual, origen: 'manual' };
  const favorito = memoria.favorito();
  return favorito ? { id: favorito.id, origen: 'historial' } : null;
}

/* ── Pintado de la sección .usual de la carta ── */

/**
 * Llámala al cargar y al final de apply() del filtro.
 * Oculta el bloque si el plato está bloqueado por alérgenos
 * o no se sirve hoy: anunciar arriba algo que no puede comer
 * o no está disponible es peor que no anunciar nada.
 */
export function pintarUsual(root) {
  const box = document.getElementById('usual');
  const out = document.getElementById('usual-link');
  if (!box || !out) return;

  box.hidden = true;

  const elegido = platoDestacado();
  if (!elegido) return;

  const item = root.querySelector(`.item[data-slug="${CSS.escape(elegido.id)}"]`);
  if (!item) return;
  if (item.classList.contains('is-blocked')) return;
  if (item.classList.contains('is-off')) return;

  const link = item.querySelector('.item-link');
  const name = item.querySelector('.item-name')?.textContent;
  if (!link || !name) return;

  out.textContent = name;
  out.href = link.href;

  const body = box.querySelector('.usual-body');
  if (body) {
    const txt = elegido.origen === 'historial'
      ? body.dataset.auto
      : body.dataset.manual;
    if (txt) body.textContent = txt;
  }

  box.hidden = false;
}

/* ── Controles de memoria (opt-in y borrado) ── */

export function iniciarControles(root, alCambiar) {
  const toggle = root.querySelector('[data-memoria-toggle]');
  const borrar = root.querySelector('[data-memoria-olvidar]');

  if (!memoria.disponible()) {
    if (toggle) {
      toggle.disabled = true;
      toggle.closest('label')?.setAttribute('data-sin-soporte', '1');
    }
    return;
  }

  const estado = () => {
    if (toggle) toggle.checked = memoria.activa();
    if (borrar) borrar.hidden = !memoria.activa() && !usualManual();
  };

  toggle?.addEventListener('change', () => memoria.activar(toggle.checked));
  borrar?.addEventListener('click', () => memoria.olvidarTodo());

  document.addEventListener(memoria.EVENTO, () => {
    estado();
    alCambiar?.();
  });

  estado();
}