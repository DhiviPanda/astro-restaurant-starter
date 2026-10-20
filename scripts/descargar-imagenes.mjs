#!/usr/bin/env node
/**
 * npm run fotos
 *
 * Descarga a src/assets/ las fotos de ejemplo que declara catalog.json
 * en cada campo `imgSource`, guardándolas con el nombre de `img`.
 *
 * Se ejecuta UNA vez al clonar. Después las imágenes viven en el repo y
 * el sitio no vuelve a pedir nada a un tercero. Las que ya existen se
 * saltan, así que puedes sustituir una por la tuya y volver a lanzarlo
 * sin miedo a que te la pise.
 */

import { mkdir, writeFile, access } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const destino = join(raiz, 'src', 'assets');
const catalogo = JSON.parse(readFileSync(join(raiz, 'src/data/catalog.json'), 'utf-8'));

/** Todo lo que lleva par img + imgSource, venga de donde venga. */
function recopilar(cat) {
  const out = [];
  const añadir = (o) => o?.img && o?.imgSource && out.push({ img: o.img, src: o.imgSource });
  cat.dishes?.forEach(añadir);
  cat.producers?.forEach(añadir);
  Object.values(cat.images ?? {}).forEach(añadir);
  // Dos platos pueden compartir foto: nos quedamos con una entrada por archivo
  return [...new Map(out.map((o) => [o.img, o])).values()];
}

const existe = (p) => access(p).then(() => true, () => false);

async function descargar({ img, src }) {
  const ruta = join(destino, img);

  if (await existe(ruta)) {
    console.log(`  = ${img}  (ya estaba)`);
    return 'saltada';
  }

  const res = await fetch(src, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(ruta, buf);
  console.log(`  + ${img}  (${Math.round(buf.length / 1024)} KB)`);
  return 'descargada';
}

const lista = recopilar(catalogo);
await mkdir(destino, { recursive: true });

console.log(`\nDescargando ${lista.length} imágenes a src/assets/\n`);

let ok = 0, saltadas = 0;
const fallos = [];

for (const item of lista) {
  try {
    (await descargar(item)) === 'saltada' ? saltadas++ : ok++;
  } catch (e) {
    fallos.push({ ...item, error: e.message });
    console.log(`  ! ${item.img}  ${e.message}`);
  }
}

console.log(`\n${ok} descargadas · ${saltadas} ya estaban · ${fallos.length} fallidas`);

if (fallos.length) {
  console.log('\nLas que fallaron, para bajarlas a mano a src/assets/:');
  for (const f of fallos) console.log(`  ${f.img}\n    ${f.src}`);
  process.exit(1);
}

console.log('\nListo. Ya puedes hacer npm run dev.\n');
