# Ferromapas

Sitio estático de ferromapas.com.ar: mapa libre de la infraestructura ferroviaria
argentina (KMZ para Google Earth e instalador para GPS Garmin).

## Reglas
- Este es un proyecto Astro. Se publica el contenido de `dist/` (generado con `pnpm build`).
- JavaScript solo si es imprescindible; el sitio tiene que funcionar completo sin JS
  (Astro no envía JS al navegador; mantenerlo así).
- Idioma es-AR. El contenido se respeta tal cual está en `src/pages/`.
- URLs iguales al WordPress: /, /acerca-de/, /descargas/, /creditos-de-ferromapas/,
  /licencia-de-ferromapas/ (`trailingSlash: 'always'`, formato carpeta).
- Enlaces internos absolutos desde la raíz ("/descargas/"), con barra final.
- Nombre, menú y contacto en `src/data/site.ts`; el menú también arma `/sitemap.xml`.
- Estética: diagrama de red ferroviaria. Tokens y estilos en
  `src/styles/global.css`; respetarlos.
- Meta de rendimiento: Lighthouse 95+ en todo, medido sobre `pnpm preview`.
- Accesibilidad: "Ir al contenido", foco visible, contraste AA, alt en imágenes,
  prefers-reduced-motion, modo oscuro con prefers-color-scheme.

## Estructura
  astro.config.mjs
  src/data/site.ts            (nombre, URL, contacto, menú)
  src/layouts/Base.astro      (<head>, encabezado, pie)
  src/components/             (SiteHeader, SiteFooter, NetworkMap, Captura)
  src/pages/                  (una .astro por página + 404 + sitemap.xml.ts)
  src/styles/global.css
  src/assets/img/             (capturas de Google Earth: Astro las optimiza a WebP)
  public/
    descargas/                (ferromapas_v1.0.0.kmz y ferromapas_v1.0.0.msi)
    favicon.svg  favicon.ico  apple-touch-icon.png  og-2.png  robots.txt
    _redirects  _headers      (Cloudflare: 301 de enlaces viejos y cabeceras)

Los mapas (.kmz y .msi) se versionan con git (no van en `.gitignore`).
Si cambian los nombres de las descargas: `src/pages/descargas.astro`, `public/_redirects` y `public/_headers`.

## Probar en local
pnpm install && pnpm dev   →  http://localhost:4321
pnpm build && pnpm preview     →  revisa dist/ tal como se publica
