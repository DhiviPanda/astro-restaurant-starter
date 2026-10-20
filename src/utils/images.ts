/* ═══════════════════════════════════════════════════════════
   IMÁGENES

   Las fotos viven en src/assets/ (no en public/) para que Astro
   las procese en el build: genera WebP, crea las variantes de
   cada ancho y escribe width y height en el HTML, con lo que no
   hay salto de maquetación.

   catalog.json guarda el nombre de archivo en `img`. El campo
   `imgSource` solo lo usa `npm run fotos` para bajar las fotos
   de ejemplo la primera vez; cuando pongas las tuyas lo borras.

   En producción no se pide nada a ningún tercero.
   ═══════════════════════════════════════════════════════════ */

import type { ImageMetadata } from 'astro';

/* Astro resuelve este glob en el build y devuelve los metadatos
   (ruta final, ancho, alto, formato) de cada archivo. */
const ASSETS = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

/**
 * Metadatos de una imagen de src/assets/ por nombre de archivo.
 * Falla en el build, no en el navegador: una foto que falta es un
 * error de datos y conviene verlo antes de desplegar.
 */
export function asset(nombre: string): ImageMetadata {
  const encontrada = ASSETS[`/src/assets/${nombre}`];

  if (!encontrada) {
    const disponibles = Object.keys(ASSETS).length;
    throw new Error(
      `No encuentro src/assets/${nombre}\n\n` +
      (disponibles === 0
        ? 'La carpeta src/assets/ está vacía. Ejecuta:\n\n    npm run fotos\n\n' +
          'Eso descarga las fotos de ejemplo que declara catalog.json.'
        : `Hay ${disponibles} imágenes en src/assets/ pero ninguna se llama así.\n` +
          'Revisa el campo "img" de ese elemento en src/data/catalog.json.'),
    );
  }

  return encontrada.default;
}

/**
 * Calidad del WebP que genera Astro. El valor por defecto es 80.
 * Estas fotos van filtradas (blanco y negro, mucho contraste), que es
 * donde menos se nota bajar calidad: a 68 pesan un tercio menos y la
 * diferencia no se aprecia. Súbelo si usas fotos sin filtro.
 */
export const CALIDAD = 68;

/**
 * Anchos a generar según dónde se usa la imagen.
 * El salto pequeño de abajo es para móviles: sin él, un teléfono con
 * pantalla densa salta directo al ancho grande y se trae de más.
 */
export const ANCHOS = {
  hero: [320, 480, 760, 1100],
  poster: [320, 420, 640, 760, 900],
  retrato: [240, 360, 480, 720],
  ficha: [400, 600, 760, 900, 1200],
} as const;

/** El valor de `sizes` que acompaña a cada juego de anchos. */
export const SIZES = {
  hero: '(max-width: 880px) 100vw, 34vw',
  poster: '(max-width: 760px) 100vw, 36vw',
  retrato: '(max-width: 860px) 100vw, 30vw',
  ficha: '(max-width: 860px) 100vw, 50vw',
} as const;
