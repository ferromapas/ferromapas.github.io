# Ferromapas — sitio estático

Versión estática de [ferromapas.com.ar](https://ferromapas.com.ar), migrada desde WordPress
a [Astro](https://astro.build). Mismo contenido y mismas URLs, nueva estética de diagrama de red.

## Archivos

- **Descargas** en `public/descargas/`: `ferromapas_v1.0.0.kmz` y `ferromapas_v1.0.0.msi`.
  Si cambian los nombres, actualizalos en `src/pages/descargas.astro` y en `public/.htaccess`
  (redirecciones de `/download/60/` y `/download/70/`).
- **Capturas de Google Earth** en `src/assets/img/` (1568×969). Se importan en
  `src/pages/index.astro`; Astro las convierte a WebP en varios tamaños (`srcset`) al hacer
  el build, y el enlace de cada una abre la versión grande en una pestaña nueva. Para sumar
  una captura: copiá el JPG a `src/assets/img/`, importalo y agregalo a la lista `capturas`.
  El ancho y el alto los toma Astro del propio archivo.

## Correr la página y hacer el build

Requiere Node 20.3 o superior. Todos los comandos se corren dentro de `web-astro/`:

```bash
cd ~/projects/ferromapas/web-astro
```

La primera vez (o si clonás el proyecto de nuevo) instalá las dependencias:

```bash
pnpm install
```

**Desarrollo.** Levanta el sitio en http://localhost:4321 y se recarga solo al editar
archivos. Para frenarlo, `Ctrl+C`.

```bash
pnpm dev
```

**Build.** Genera el sitio final en `dist/`. Ese contenido es lo que se sube por FTP,
incluido el `.htaccess` oculto.

```bash
pnpm build
```

**Vista previa del build** (opcional). Sirve `dist/` en local, tal como se va a publicar,
para chequearlo antes de subirlo.

```bash
pnpm preview
```

## Revisar antes de publicar

Con `pnpm build && pnpm preview`, abrí el sitio y revisá:

- Las 5 páginas y el menú, en celular (herramientas de desarrollo del navegador) y escritorio.
- Modo oscuro (cambiá el tema del sistema).
- Lighthouse (Chrome → DevTools → Lighthouse), sobre `pnpm preview` y no sobre `pnpm dev`:
  apuntá a 95+ en todo.
- La página 404 propia solo aparece en el hosting (la activa el `.htaccess`); en un servidor
  local es normal que no se vea.

## Publicar en tu hosting actual

1. `pnpm build`
2. Hacé un backup completo del WordPress (archivos + base de datos) y guardalo.
3. Por FTP, vaciá la carpeta pública del dominio (`public_html/` o similar).
4. Subí **todo el contenido** de `dist/` (no la carpeta), incluido el oculto `.htaccess`.
5. Verificá en el sitio real:
   - las 5 URLs: `/`, `/acerca-de/`, `/descargas/`, `/creditos-de-ferromapas/` y
     `/licencia-de-ferromapas/`;
   - que `/download/60/` y `/download/70/` descarguen el KMZ y el MSI;
   - que `www.` y `http://` redirijan a `https://ferromapas.com.ar/`;
   - que una URL inexistente muestre la 404 propia.
6. En Google Search Console, enviá `https://ferromapas.com.ar/sitemap.xml`.
7. Cuando todo funcione, podés borrar la base de datos de WordPress desde el panel.

El `.htaccess` es para Apache. Si tu hosting usa nginx, hay que traducir las redirecciones.

## Versionar con git (opcional)

```bash
cd ~/projects/ferromapas/web-astro
git init
git add . && git commit -m "Sitio de Ferromapas"
```

Los mapas (`public/descargas/*.kmz` y `*.msi`) se versionan junto con el resto del sitio, así
que un clon nuevo del repositorio ya puede hacer el build completo. Pesan unos 5 MB y cada
versión nueva que se suba con otro contenido queda en el historial.

## Estructura

```
src/
  data/site.ts            nombre, contacto y menú
  layouts/Base.astro      <head>, SEO, Open Graph, encabezado y pie
  components/             menú-línea, pie, diagrama de red y capturas
  pages/                  una página por archivo (la URL sale del nombre)
  styles/global.css       todos los estilos y los colores de línea
  assets/img/             capturas de Google Earth (se optimizan en el build)
public/
  .htaccess               redirecciones 301, MIME de KMZ, caché, HTTPS
  descargas/              archivos que se copian tal cual
```

## Qué se hizo

- **URLs iguales** a las de WordPress; los enlaces viejos de descarga (`/download/60/`,
  `/download/70/`) y restos de WordPress (`/feed/`, `/wp-admin`, `?p=`) redirigen con 301.
- **SEO:** título y descripción por página, canonical, Open Graph con imagen (`og.png`),
  `sitemap.xml`, `robots.txt` y datos estructurados `Dataset` (schema.org) en el inicio.
- **Rendimiento:** HTML estático, sin JavaScript, CSS mínimo, fuente autoalojada
  (Overpass vía Fontsource, sin depender de Google Fonts), caché de un año para assets con hash.
- **Accesibilidad:** HTML semántico, “Ir al contenido”, foco visible, contraste AA,
  modo oscuro automático y animación desactivada con `prefers-reduced-motion`.
- **Estética:** el menú es una línea con estaciones; cada página recorre su línea de color
  (Mitre, San Martín, Roca, Belgrano, Urquiza) y sus títulos son estaciones.

## Cambios de contenido respecto del WordPress

- Se quitó el texto de relleno del tema Neve (“Let’s work together on your next web project”)
  y el pie “Neve | Creado por WordPress”.
- Licencia: se restituyeron los títulos de las secciones 4 y 6 del texto legal de Creative
  Commons, que en WordPress habían quedado como “1. .”, y el texto completo quedó plegado.
- Correcciones menores de tildes (están, André, Ángel Ferrer, Fernández) y espacios pegados.
- El enlace `boletos.co.nr.elserver.com` parece caído: se dejó como texto, sin enlace.
