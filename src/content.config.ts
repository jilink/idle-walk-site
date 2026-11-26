import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Articles du blog : un fichier Markdown par article dans src/content/blog/.
// Le nom du fichier (sans .md) devient l'URL : /blog/<nom>/.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(10).max(70),
    description: z.string().min(80).max(165),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(['motivation', 'podometre', 'jeu', 'habitudes', 'actu']),
    keyword: z.string(), // requête principale visée (anti-cannibalisation)
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
