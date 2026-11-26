import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export const CATEGORIES: Record<Post['data']['category'], string> = {
  motivation: 'Motivation',
  podometre: 'Podomètre & pas',
  jeu: 'Jeux de marche',
  habitudes: 'Habitudes',
  actu: 'Actu',
};

// Articles publiés, du plus récent au plus ancien.
export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('blog', (p) => !p.data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const readingMinutes = (body: string | undefined) =>
  Math.max(1, Math.round((body ?? '').split(/\s+/).length / 220));
