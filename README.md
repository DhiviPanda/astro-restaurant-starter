# 🔥 Astro Restaurant Starter — BRASA

Template gratuito para restaurantes premium. Astro 7 + i18n nativo (ES / EN / FR) + carta QR por mesa + WordPress headless ready.

Diseño de alta tensión: tipografía de cartel sobre blanco roto clínico, rojo sangre y amarillo, cortes a negro entre capítulos. Listo para producción, accesible (WCAG AA) y optimizado para Core Web Vitals.

**BRASA es un restaurante ficticio** de hamburguesas en el Barrio de Salamanca, usado como ejemplo. No existe.

Creado por Cris Culebras · Daruma Producciones · Licencia MIT

---

## ✨ Demo

🚧 Próximamente — URL de demo en vivo

---

## 🧩 Lo que hace distinto a este starter

La mayoría de cartas digitales son un PDF con peor experiencia. Esta decide qué enseñar según **quién**, **cuándo** y **qué no puede comer** el comensal, y lo hace sin pedirle una cuenta ni instalar nada.

| Función | Qué hace | Quién la mantiene |
|---|---|---|
| **Carta QR por mesa** | `/carta?mesa=12` muestra el número de mesa en pantalla | Nadie: va en el QR |
| **Idioma ES / EN / FR** | Un QR por idioma, o el selector de la barra superior | Nadie |
| **Franja horaria** | La carta indica si se sirve mediodía o noche según la hora | Nadie: la hora del navegador |
| **Disponibilidad por días** | Un plato solo se ofrece los días marcados en el catálogo | El encargado, una vez por temporada |
| **Temporada con cuenta atrás** | "Quedan 9 días" aparece solo en los últimos 21 días | Nadie: fechas en el catálogo |
| **Filtros de alérgenos** | Marcas lo que no puedes comer y la carta se reordena sola | Nadie |
| **Lo de siempre** | Recuerda el plato que marcaste a mano o lo deduce de tus últimas visitas, sin registro ni cuenta | Nadie: `localStorage` |
| **Memoria opt-in** | El historial de visitas solo se activa si el comensal lo enciende. Al apagarlo, se borra todo | El comensal |
| **Maridaje** | Cada plato sugiere su vino, con copa y botella | El encargado, al cambiar carta |
| **Productor** | Quién cultivó o crió lo que estás comiendo | El encargado, al cambiar proveedor |
| **Abierto / cerrado** | La barra superior lo calcula con la hora y el día | Nadie |
| **Mesa del chef** | Se activa sola los días que toca | Nadie |
| **Lista de la parrilla** | Fidelización por acceso, no por descuento: solo un email | Nadie |
| **Grupos** | Página de privatización con formulario corto | Nadie |

**Nada de esto se toca durante el servicio.** Esa fue la regla al diseñarlo: si una función exige que alguien abra el panel con platos en la mano, no entra.

---

## 📋 Páginas y componentes

| Página | Ruta | Qué incluye |
|---|---|---|
| Home | `/` | Hero, capítulos, carteles de plato, ficha técnica, verdes, acompañantes, chef, productores, lista, reservar |
| Carta QR | `/carta` | Filtros de alérgenos, franja horaria, mesa, lo de siempre |
| Ficha de plato | `/carta/[slug]` | Historia, vídeo, alérgenos, días, maridaje, productor |
| Grupos | `/grupos` | Privatización y formulario |
| Cookies | `/cookies` | Política, `noindex`, fuera del sitemap |

| Componente | Notas |
|---|---|
| `TopBar.astro` | Fija, estado abierto/cerrado, selector de idioma |
| `Hero.astro` | Tipografía a sangre, foto tratada, grito en amarillo |
| `Chapter.astro` | Corte a negro reutilizable, con goteo opcional |
| `DishPosters.astro` | Cada hamburguesa como cartel de cine |
| `SpecSheet.astro` | Ficha técnica clínica en blanco puro |
| `GreenCut.astro` | Sección vegetal, otro registro visual |
| `Sides.astro` | Rejilla de acompañantes |
| `ChefTable.astro` | Mesa del chef, activa según el día |
| `Producers.astro` | Retratos de proveedores |
| `GrillList.astro` | Alta por email (Web3Forms) |
| `Reserve.astro` | Bloque rojo a sangre |
| `Credits.astro` | Pie como créditos de película |
| `CookieBanner.astro` | RGPD, Consent Mode v2, 3 idiomas |

---

## 🚀 Inicio rápido

```bash
# 1. Clona el repositorio
git clone https://github.com/DhiviPanda/astro-restaurant-starter
cd astro-restaurant-starter

# 2. Instala dependencias
npm install

# 3. Copia el archivo de variables de entorno
cp .env.example .env

# 4. Inicia el servidor de desarrollo
npm run dev        # http://localhost:4321

# 5. Build de producción
npm run build
npm run preview
```

Sin WordPress y sin configurar nada. El starter arranca con los datos de ejemplo.

> **Si clonas el repositorio sin las fotos** (porque las has borrado o porque partes de un fork que no las incluye), añade `npm run fotos` después del `npm install`. Descarga las 17 imágenes de ejemplo a `src/assets/`. Normalmente no hace falta: las fotos viajan en el repositorio.

**Pruébalo así:** abre `http://localhost:4321/carta?mesa=12`, marca un par de alérgenos y mira cómo se reordena la carta.

---

## 🎨 Design system

```css
/* Colores */
--bg:        #f2ede6   /* blanco roto cálido */
--bg-alt:    #ede8df
--bg-clean:  #ffffff   /* el corte clínico */
--ink:       #0a0a0a
--red:       #c8001a   /* acento sobre fondo claro */
--red-dark:  #f03045   /* el mismo rojo aclarado, SOLO sobre negro */
--yellow:    #e8c840

/* Tipografía */
Bebas Neue     — titulares de cartel
Cormorant      — cursiva editorial
Special Elite  — máquina de escribir, etiquetas y precios
```

**Por qué hay dos rojos:** `#c8001a` sobre negro da 3.3:1 y no pasa WCAG AA en texto pequeño. `--red-dark` da 4.9:1 y se usa solo sobre fondo oscuro. Si cambias el color de marca, cambia los dos y comprueba ambos contrastes.

Todo el CSS vive en `BaseLayout.astro` y en bloques `is:global` de cada componente, para que Astro no genere hojas de estilo externas que bloqueen el renderizado.

---

## ⚙️ Stack

- **Astro 7** — salida estática, cero JS por defecto
- **CSS vanilla** — variables, sin Tailwind
- **@astrojs/sitemap** — sitemap multilocale automático
- **Web3Forms** — formularios sin backend
- **Vanilla JS** — solo en los filtros de la carta y el banner de cookies

---

## 🗂️ Cómo están organizados los datos

Dos capas separadas, y esto importa:

```
src/data/
├── catalog.json      ← NEUTRO al idioma
└── mock/
    ├── es.json       ← solo textos
    ├── en.json
    └── fr.json
```

**`catalog.json`** guarda lo que no se traduce: precios, alérgenos, días disponibles, franjas de servicio, temporada, maridaje, productor, imágenes, horarios de apertura.

**`mock/{idioma}.json`** guarda solo los textos, cruzados por `slug`.

Así el precio de una hamburguesa vive en un único sitio. Si estuviera en los tres ficheros, tarde o temprano uno se quedaría desactualizado.

### Añadir un plato

1. Añade el objeto en `catalog.json` → `dishes`
2. Añade sus textos en los tres `mock/*.json` → `dishes`, con el mismo `slug`
3. Listo: aparece en la carta, genera su ficha en los tres idiomas y entra en el sitemap

```jsonc
// catalog.json
{
  "slug": "la-nueva",
  "no": "12",
  "category": "carnes",        // carnes | verdes | acompanantes
  "price": "22 €",
  "allergens": ["gluten", "lactosa"],
  "days": [4, 5, 6],           // 0 = domingo … 6 = sábado
  "service": ["noche"],        // mediodia | noche
  "season": { "from": "2026-11-01", "to": "2027-02-28" },  // o null
  "pairing": "ribera",         // slug de wines, o null
  "producer": "la-erilla",     // slug de producers, o null
  "vegan": false,
  "img": "/images/la-nueva.jpg",
  "video": ""                  // mp4 opcional en la ficha
}
```

---

## 🍽️ Cómo funciona cada automatismo

### Carta por mesa

El QR de cada mesa apunta a `/carta?mesa=12`. La carta lee el parámetro y muestra el número. Para servicio en varios idiomas, genera un QR por idioma: `/en/carta?mesa=12`.

Solo acepta de uno a tres dígitos, así que un parámetro manipulado no inyecta nada en la página.

### Franja horaria

Las franjas se definen en `catalog.json` → `service`. La carta compara con la hora del navegador y muestra cuál se está sirviendo. Al ser cliente, funciona en una web totalmente estática y respeta la zona horaria de quien mira.

### Disponibilidad y días de cierre

Un plato con `days: [4,5,6]` solo se ofrece de jueves a sábado. Los demás días aparece atenuado con el aviso "Hoy no".

**Detalle importante:** en un día en que el restaurante no abre, ese aviso **no** se muestra en ningún plato. Marcar once platos como "hoy no" cuando el local está cerrado es ruido; el estado de cierre ya se comunica en la barra superior.

### Temporada

Un plato con `season` desaparece fuera de sus fechas. En los últimos 21 días muestra los días restantes. No es un truco de urgencia: es información real, calculada con la fecha del build.

> Con salida estática la cuenta atrás se congela en el momento del build. Si quieres que avance sola, programa un build diario en tu hosting (Netlify y Vercel lo hacen con un build hook y un cron) o pasa a SSR.

### Filtros de alérgenos

Es el único JavaScript real de la carta. Al marcar un alérgeno:

- los platos que lo contienen se atenúan y muestran **qué** contienen, no desaparecen
- los platos seguros se marcan y suben dentro de su categoría
- la selección se guarda en `localStorage` para la próxima visita

Se atenúan en lugar de ocultarse a propósito: alguien con intolerancia leve quizá quiera verlo igual, y esconder platos sin explicar por qué genera desconfianza.

### Lo de siempre

Dos formas de llegar al mismo resultado, sin cuenta ni registro:

**Declarado.** En la ficha de cada plato hay un botón para marcarlo. Gana siempre sobre cualquier otra lógica.

**Deducido.** Si el comensal activa la memoria en la carta, el starter registra qué fichas visita y en cuántas sesiones distintas. A partir de dos visitas al mismo plato en sesiones separadas, ese plato sube arriba con el texto "Lo hemos deducido de tus últimas visitas."

En ambos casos: si ese plato choca con un filtro de alérgenos activo o no se sirve hoy, el bloque desaparece. Nunca se anuncia arriba algo que el comensal no puede comer.

Todo vive en `localStorage` del navegador. Cambias de móvil, usas incógnito o borras datos y empieza de cero. Eso está escrito en la propia carta, no solo en este README.

**Claves que usa:**
- `brasa_v1_memoria` — opt-in activo/inactivo
- `brasa_v1_historial` — visitas por sesión
- `brasa_usual` — plato declarado a mano
- `brasa_allergens` — alérgenos marcados

### Lista de la parrilla

Fidelización por **acceso**, no por descuento. Los sellos y los puntos suenan a cafetería; en un sitio de ticket alto lo que fideliza es enterarse antes. Solo pide un email y va a Web3Forms.

---

## 📬 Formularios

Por defecto usan [Web3Forms](https://web3forms.com) (gratis hasta 250 envíos al mes, sin backend).

```env
PUBLIC_WEB3FORMS_KEY=tu_clave
```

Sin clave, los formularios no envían y avisan en consola. Nunca fingen un éxito que no ha ocurrido.

Ambos llevan honeypot antispam (`name="botcheck"`), que Web3Forms y Formspree reconocen automáticamente.

**Otras opciones:**

```html
<!-- Formspree -->
<form action="https://formspree.io/f/TU_FORM_ID" method="POST">

<!-- Netlify Forms -->
<form netlify name="grupos" method="POST">
  <input type="hidden" name="form-name" value="grupos" />
```

---

## 🔌 WordPress headless + Polylang

```env
WP_MODE=true
WP_API_URL=https://cms.tudominio.com/wp-json/wp/v2
```

1. Instala [Polylang](https://polylang.pro) (la versión gratuita sirve)
2. Configura los tres idiomas: `es`, `en`, `fr`
3. Añade en `functions.php`:

```php
add_filter('rest_prepare_post', function ($response, $post) {
    $response->data['translations'] = pll_get_post_translations($post->ID);
    return $response;
}, 10, 2);
```

4. Crea el CPT `plato` con CPT UI y los campos ACF que necesites
5. Conecta los textos en `src/utils/content.ts` → `getStrings()`

Si WordPress no responde, el starter cae a los datos de ejemplo sin romper el build. Esa caída es deliberada: un CMS caído no debería tumbar un despliegue.

---

## 🌍 Añadir un idioma

1. Añade el locale a `LOCALES` en `src/i18n/index.ts`
2. Crea `src/data/mock/[lang].json` con la misma estructura que `es.json`
3. Añádelo a `locales` en `astro.config.mjs` (en ambos bloques: `sitemap` e `i18n`)
4. Astro genera las rutas, el hreflang y el sitemap en el siguiente build

---

## 📊 Analytics: GA4 + Consent Mode v2

```env
PUBLIC_GA_ID=G-TU_ID
```

Vacío = no se carga ningún script. Con ID:

- el consentimiento arranca **denegado** (`analytics_storage: 'denied'`)
- el banner aparece 1,2 s después de cargar, para no afectar al LCP ni al CLS
- si la persona acepta, se actualiza el consentimiento; si rechaza, no se envía nada
- la decisión se guarda en `localStorage`

El `localStorage` de la carta (filtros y "lo de siempre") es independiente del consentimiento: no es rastreo, es una preferencia que nunca sale del dispositivo. Está explicado en `/cookies`.

**Alternativa sin cookies:** [Plausible](https://plausible.io) y quitas el banner.

---

## 🌐 Deploy

### Netlify / Vercel

```
Build command:     npm run build
Publish directory: dist
```

### IONOS / hosting compartido (FTP)

```bash
npm run build
# sube el contenido de /dist a public_html
```

---

## ♿ Accesibilidad

- WCAG AA en todos los textos (ver nota de los dos rojos arriba)
- Los filtros son `<input type="checkbox">` reales con `<label>`: funcionan con teclado y lector de pantalla
- Áreas táctiles de 40 px mínimo en los chips de alérgeno
- Los días de la semana llevan el nombre completo para lectores de pantalla, no solo la inicial
- `aria-live` en el contador de platos filtrados y en los mensajes de formulario
- `aria-hidden` en lo decorativo: goteo, rombos, rejillas, el grito del hero
- `prefers-reduced-motion` respetado

---

## 📝 Empieza aquí

Para poner el starter en producción tocas **cuatro archivos**. Nada más. Todo lo demás se genera a partir de ellos.

| Archivo | Qué pones | Qué se actualiza solo |
|---|---|---|
| `astro.config.mjs` | Tu dominio en `site` | Canonical, hreflang, Open Graph, sitemap, `robots.txt`, `llms.txt` |
| `src/config.ts` | Nombre, dirección, teléfono, email, coordenadas, redes | Barra superior, pie, schema de Google, `llms.txt`, los tres idiomas |
| `src/data/catalog.json` | Platos, precios, alérgenos, horarios | Carta, fichas de plato, filtros, schema `Menu`, `llms.txt` |
| `.env` | Claves de Web3Forms y GA4 | Formularios y analítica |

Los textos traducibles van aparte, en `src/data/mock/{es,en,fr}.json`. Ahí solo hay lo que de verdad cambia de un idioma a otro: nombres de plato, descripciones y copys. La dirección y el teléfono no están, porque no se traducen y tenerlos tres veces es pedir que se desincronicen.

### Detalle por archivo

**`astro.config.mjs`**
- [ ] `site: 'https://tudominio.com'`

**`src/config.ts`**
- [ ] Nombre, dirección, código postal, ciudad
- [ ] Coordenadas en `geo` (clic derecho en Google Maps sobre tu local)
- [ ] Teléfono y email
- [ ] `sameAs` con tus redes, o déjalo vacío si no hay
- [ ] `reservationUrl` si usas Covermanager, TheFork o similar

**`src/data/catalog.json`**
- [ ] Platos con precios, alérgenos, días y temporadas
- [ ] `openingHours` con tu horario real
- [ ] `chefTable` con `active: false` si no aplica
- [ ] Fotos propias en lugar de las de Unsplash

**`.env`**
- [ ] `PUBLIC_WEB3FORMS_KEY`
- [ ] `PUBLIC_GA_ID`

### Lo visual
- [ ] `BaseLayout.astro` → `--red`, `--red-dark` y `--yellow` (comprueba los dos contrastes)
- [ ] `public/favicon.svg` → tu logo
- [ ] `public/og-default.svg` → sustituir por PNG 1200 × 630

### Después de publicar
- [ ] Alta en Google Search Console y envío del sitemap
- [ ] Ficha de Google Business Profile con los mismos datos que `config.ts`

### Fuentes

Ya vienen en local, no hay nada que hacer. Están en `public/fonts/` y se declaran con `@font-face` en `BaseLayout.astro`.

| Archivo | Uso | Peso |
|---|---|---|
| `bebas-neue-400.woff2` | Titulares | 13 KB |
| `cormorant-300-italic.woff2` | Textos en cursiva | 23 KB |
| `cormorant-400-italic.woff2` | Cursivas de capítulo y pie | 23 KB |
| `special-elite-400.woff2` | Cuerpo y etiquetas | 52 KB |

Las tres que aparecen en la primera pantalla llevan `rel="preload"`; la cuarta carga por el camino normal. Todas con `font-display: swap`, así que no hay FOIT: el texto se lee desde el primer frame.

Cero peticiones a terceros, que en una web con banner de cookies importa: Google Fonts es una transferencia de IP a un tercero y te obligaría a contemplarla en la política.

Son todas OFL y las licencias viajan en `public/fonts/`. Si cambias de tipografía, el camino corto es `npm i @fontsource/<familia>`, copiar el `.woff2` del subset que uses desde `node_modules` y desinstalar el paquete.

### Imágenes

Las fotos viven en `src/assets/` y las procesa `astro:assets` en el build: convierte a WebP, genera una variante por cada ancho declarado y escribe `width` y `height` en el HTML. El sitio publicado **no pide nada a ningún tercero**.

La primera vez que clonas, la carpeta está vacía. Un comando:

```bash
npm run fotos
```

Lee `catalog.json`, descarga las 17 fotos de ejemplo desde el campo `imgSource` de cada elemento y las deja con el nombre que dice `img`. Las que ya existan las salta, así que puedes sustituir una por la tuya y volver a lanzarlo sin que te la pise.

**Esas imágenes van al repositorio.** No están en `.gitignore` a propósito: quien clone el starter tiene que poder arrancar sin descargar nada.

Si falta un archivo, el build falla con el nombre exacto que busca. Es deliberado: una foto que falta es un error de datos y prefieres verlo antes de desplegar, no después.

#### Por qué `src/assets/` y no `public/`

En `public/` los archivos se copian tal cual, sin tocar. En `src/assets/` Astro los procesa. La diferencia en esta home:

| | Antes (Unsplash) | Ahora (`astro:assets`) |
|---|---|---|
| Peticiones a terceros | 5 | 0 |
| Formato | JPEG | WebP |
| Ancho que pide un móvil de 412px | 1200px | 420px |
| `width`/`height` en el HTML | a mano | automáticos |

#### Poner fotos propias

1. Deja el archivo en `src/assets/`
2. Pon su nombre en el campo `img` del elemento en `catalog.json`
3. Borra su `imgSource`, que solo servía para la descarga de ejemplo

Los anchos que se generan están en `ANCHOS` dentro de `src/utils/images.ts`, junto a los `sizes` que les corresponden. Si cambias la maquetación, esos dos valores van de la mano.

#### Prioridad de carga

En cada página **una sola imagen carga en `eager`**: la que va a ser el LCP. En la home es la del hero; en una ficha de plato, la del plato. Todo lo demás es `lazy`.

Esto importa más de lo que parece. Los pósters de la carta están bajo el pliegue porque el hero ocupa la pantalla completa, pero los dos primeros cargaban en `eager` y se descargaban a la vez que la imagen del hero, robándole ancho de banda justo en el momento que mide el LCP. Pasarlos a `lazy` bajó lo que descarga un móvil durante el LCP de 183 KB a 40 KB.

Si cambias la maquetación y algún póster pasa a verse sin hacer scroll, ese es el que tiene que llevar `loading="eager"` y `fetchpriority="high"`, y el hero dejar de llevarlo. Solo uno.

#### Calidad

`CALIDAD` en `src/utils/images.ts` está en 68, frente al 80 que usa Astro por defecto. Estas fotos van filtradas con blanco y negro y mucho contraste, que es justo donde menos se nota bajar la calidad. Si pones fotos sin filtro, súbelo a 75 u 80 y compara.

#### Los escalones de ancho

Un móvil de 412px con pantalla a 1,75x pide 721px de imagen. El navegador coge el primer ancho del `srcset` que llegue a esa cifra, así que si el salto va de 640 a 900 se trae 900 y desperdicia un 25%. Por eso hay un escalón en 760. Si cambias los anchos, piensa en qué pide un móvil real, no en números redondos.

> Las fotos de ejemplo son de Unsplash y su licencia permite el uso libre, incluido el comercial. Aun así son placeholders: un restaurante de verdad necesita sus propias fotos.

### robots.txt y llms.txt

No están en `public/`. Se generan en `src/pages/robots.txt.ts` y `src/pages/llms.txt.ts` a partir del dominio y de `config.ts`, así que cambiar el dominio en un sitio los actualiza los dos. El `llms.txt` además lista la carta leyendo `catalog.json`, con lo que no puede quedarse desfasado respecto a los platos reales.

El formato sigue la especificación de [llmstxt.org](https://llmstxt.org): un H1, resumen en blockquote y secciones H2 con listas de enlaces Markdown. Lighthouse lo audita en la categoría de navegación agéntica y una lista de URLs sueltas no la pasa.

Si no quieres que los modelos usen tu contenido, edita la sección "Uso permitido" de `llms.txt.ts`.

### Seguridad
- [ ] Cabeceras en tu hosting (hay un comentario con las recomendadas en `BaseLayout.astro`)

---

## 🔍 SEO

| Schema | Dónde | Para qué |
|---|---|---|
| `Restaurant` | `HomePage.astro` | Entidad principal: dirección, teléfono, horarios, rango de precio |
| `Menu` + `MenuSection` + `MenuItem` | `HomePage.astro` | Carta estructurada con precios y dieta vegana |
| `MenuItem` | `DishPage.astro` | Cada plato como entidad propia |

Valida en [Rich Results Test](https://search.google.com/test/rich-results) y [Schema.org Validator](https://validator.schema.org).

El sitemap incluye `xhtml:link` cruzados entre los tres idiomas y excluye `/cookies`, que lleva `noindex`.

---

## 📄 Licencia

MIT. Libre para uso personal y comercial. Si te sirve, mantener el crédito se agradece, pero no es obligatorio.

---

## 🙋 Sobre la autora

Hecho por **Cris Culebras Barreiro**, desarrolladora web freelance especializada en rendimiento web (WPO), SEO técnico y arquitectura moderna con Astro + WordPress headless.

Fundadora de [Daruma Producciones](https://darumaproducciones.es), estudio de desarrollo web en Madrid orientado a resultados: sitios rápidos, accesibles y bien posicionados.

**Especialidades:**
- Arquitectura JAMstack: Astro, WordPress headless, APIs REST
- Core Web Vitals y optimización de rendimiento
- SEO técnico: Schema.org, indexación, auditorías
- i18n con Astro sin frameworks adicionales
- Licenciada en Bellas Artes: el diseño y el código van de la mano

Este starter forma parte de una **serie de templates open source** por sectores. El objetivo: que cualquiera pueda arrancar un proyecto profesional sin perder días en la configuración inicial.

📩 hola@darumaproducciones.es · 🌐 [darumaproducciones.es](https://darumaproducciones.es) · 🐙 [GitHub](https://github.com/DhiviPanda)

---

## 📦 Más starters de Culebra Lab

- [astro-agency-i18n-starter](https://github.com/DhiviPanda/astro-agency-i18n-starter) — Agencias de marketing, i18n ES/EN/FR
- [astro-medical-starter](https://github.com/DhiviPanda/astro-medical-starter) — Clínicas, schema MedicalClinic
- [astro-wp-starter](https://github.com/DhiviPanda/astro-wp-starter) — Base WordPress headless + Astro

---

MIT License · Culebra Lab
