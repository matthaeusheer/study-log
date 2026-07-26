import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const entriesDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../entries');

const entries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: entriesDir }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    depth: z.enum(['quick-read', 'solid', 'deep', 'repetition']),
    links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { entries };
