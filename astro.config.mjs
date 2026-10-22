// @ts-check
import { defineConfig } from 'astro/config';

// Las URLs se mantienen iguales a las del sitio WordPress
// (/acerca-de/, /descargas/, etc.) para no perder posicionamiento ni enlaces.
export default defineConfig({
  site: 'https://ferromapas.com.ar',
  trailingSlash: 'always',
  // Enlaces viejos del plugin Download Monitor de WordPress (páginas con redirección).
  redirects: {
    '/download/60/': '/descargas/ferromapas_v1.0.0.kmz',
    '/download/70/': '/descargas/ferromapas_v1.0.0.msi',
    '/download/': '/descargas/',
  },
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
});
