import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const entriesDir = new URL('../../entries/', import.meta.url);

const entries = defineCollection({
  // Ignore underscore-prefixed files (e.g. _template.md) so they aren't rendered.
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: entriesDir }),
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
