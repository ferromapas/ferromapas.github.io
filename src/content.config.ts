import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Una entrada por versión del mapa, generada con `ferromapas-toolkit changelog`.
const changelog = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/data/changelog' }),
  schema: z.object({
    version: z.string().regex(/^\d+\.\d+\.\d+$/),
    date: z.coerce.date(),
    notes: z.string().default(''),
    summary: z
      .object({ added: z.number(), changed: z.number(), removed: z.number() })
      .default({ added: 0, changed: 0, removed: 0 }),
    railways: z
      .array(
        z.object({
          name: z.string(),
          added: z.array(z.string()).default([]),
          changed: z.array(z.string()).default([]),
          removed: z.array(z.string()).default([]),
        }),
      )
      .default([]),
  }),
});

export const collections = { changelog };
