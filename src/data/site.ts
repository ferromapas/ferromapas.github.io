// Datos globales del sitio. Editá acá nombre, menú, contacto y descargas.

export const SITE = {
  name: 'Ferromapas',
  url: 'https://ferromapas.com.ar',
  description:
    'Mapa detallado y de libre acceso de la infraestructura ferroviaria de Argentina en formato KMZ, para Google Earth y GPS Garmin.',
  email: 'ferromapas@gmail.com',
  facebook: 'https://www.facebook.com/ferromapas',
  lang: 'es-AR',
};

// Cada página es una "estación" de la línea del menú.
// `color` es la línea del diagrama que acompaña a esa página.
export const NAV = [
  { href: '/', label: 'Inicio', color: 'var(--l-mitre)' },
  { href: '/acerca-de/', label: 'Acerca de', color: 'var(--l-sanmartin)' },
  { href: '/descargas/', label: 'Descargas', color: 'var(--l-roca)' },
  { href: '/creditos-de-ferromapas/', label: 'Créditos', color: 'var(--l-belgrano)' },
  { href: '/licencia-de-ferromapas/', label: 'Licencia', color: 'var(--l-urquiza)' },
] as const;
