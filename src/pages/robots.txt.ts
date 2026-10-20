import type { APIRoute } from 'astro';
import { FALLBACK_SITE } from '../config.ts';

/**
 * robots.txt generado, no estático.
 * El dominio sale de `site` en astro.config.mjs, así que cambiarlo
 * ahí actualiza también el sitemap que se anuncia aquí.
 */
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL(FALLBACK_SITE);

  const body = `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', base).href}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
