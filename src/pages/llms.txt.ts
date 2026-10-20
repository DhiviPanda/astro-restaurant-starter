import type { APIRoute } from 'astro';
import { restaurant, FALLBACK_SITE } from '../config.ts';
import { getContent } from '../utils/content.ts';

/**
 * llms.txt generado según la especificación de llmstxt.org:
 * un H1, un resumen en blockquote y secciones H2 con listas de
 * enlaces Markdown. Lighthouse audita ese formato en la categoría
 * de navegación agéntica y una lista de URLs sueltas no la pasa.
 *
 * Se genera en vez de ser estático para que las URLs sigan al
 * dominio de astro.config.mjs y la carta no quede desfasada.
 */
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL(FALLBACK_SITE);
  const url = (path: string) => new URL(path, base).href;

  const { t, dishes } = await getContent('es');

  const carta = dishes
    .map((d) => `- [${d.name}](${url(`carta/${d.slug}`)}): ${d.ingredients} ${d.price}`)
    .join('\n');

  const body = `# ${restaurant.name}

> ${t.site.description}

${restaurant.name} está en ${restaurant.address}, ${restaurant.district}, ${restaurant.city}.
Teléfono ${restaurant.phone}. Horario ${restaurant.hours}.

## Páginas

- [Inicio](${url('/')}): carta destacada, mesa del chef, productores y reservas
- [Carta](${url('carta')}): carta completa con filtros de alérgenos y disponibilidad diaria
- [Grupos](${url('grupos')}): reservas de 12 a 30 personas
- [Política de cookies](${url('cookies')}): analítica y consentimiento

## Otros idiomas

- [Home (EN)](${url('en/')}): English version
- [Menu (EN)](${url('en/carta')}): full menu in English
- [Accueil (FR)](${url('fr/')}): version française
- [Carte (FR)](${url('fr/carta')}): carte complète en français

## Carta

${carta}

## Uso permitido

- Puedes referenciar, citar y resumir el contenido de este sitio
- Puedes indexarlo
- Los precios y la disponibilidad cambian: comprueba la carta antes de citarlos

## Contacto

- [Correo](mailto:${restaurant.email}): ${restaurant.email}
- [Teléfono](tel:${restaurant.phone.replace(/\s/g, '')}): ${restaurant.phone}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
