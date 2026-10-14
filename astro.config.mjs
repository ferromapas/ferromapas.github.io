// @ts-check
import { defineConfig } from 'astro/config';

// Las URLs se mantienen iguales a las del sitio WordPress
// (/acerca-de/, /descargas/, etc.) para no perder posicionamiento ni enlaces.
export default defineConfig({
  site: 'https://ferromapas.com.ar',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
});
