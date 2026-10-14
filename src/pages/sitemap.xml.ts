import type { APIRoute } from 'astro';
import { NAV, SITE } from '../data/site';

// Una URL por cada página del menú (la 404 queda afuera).
export const GET: APIRoute = () => {
  const urls = NAV.map((n) => `  <url><loc>${SITE.url}${n.href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
