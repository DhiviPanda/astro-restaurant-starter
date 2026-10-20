import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://brasa.example',

  integrations: [
    sitemap({
      // La política de cookies lleva noindex: fuera del sitemap.
      filter: (page) => !page.includes('/cookies'),
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-ES', en: 'en-US', fr: 'fr-FR' },
      },
    }),
  ],

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr'],
    routing: { prefixDefaultLocale: false },
  },

  output: 'static',

  build: {
    // Todo el CSS va inline en el HTML. Son ~15 KB en total:
    // compensa ahorrarse las peticiones y el render blocking.
    inlineStylesheets: 'always',
  },

  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
