import { getCollection } from 'astro:content';

const parts = (v: string) => v.split('.').map(Number);

// Versiones del mapa, de la más nueva a la más vieja (orden numérico, no alfabético).
export async function getReleases() {
  const entries = await getCollection('changelog');
  return entries
    .map((e) => e.data)
    .sort((a, b) => {
      const [x, y] = [parts(a.version), parts(b.version)];
      return y[0] - x[0] || y[1] - x[1] || y[2] - x[2];
    });
}

// Versión que se usa si todavía no hay ningún registro en src/data/changelog/.
export const DEFAULT_VERSION = '1.0.0';

export async function currentVersion() {
  const [latest] = await getReleases();
  return latest?.version ?? DEFAULT_VERSION;
}
