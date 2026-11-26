// Contrôle qualité / règles de contenu des articles (src/content/blog/*.md). Code de sortie 1 si erreur.
// Usage : node scripts/check-blog.mjs   (ou npm run blog:check)
import { readdirSync, readFileSync, existsSync } from 'node:fs';

const DIR = new URL('../src/content/blog/', import.meta.url);
const PLAY = 'https://play.google.com/store/apps/details?id=com.cozycodeur.idlewalk';
const STATIC = ['/', '/jeu-de-marche/', '/podometre-ludique/', '/motivation-marche/', '/faq/', '/blog/'];

// Anti-spoil : zones (sauf les 2 premières), familiers (sauf les 3 premiers), boss, bonus de zone.
const spoil = ['Côte tropicale', 'Forêt sucrée', 'Archipel céleste', 'Banquise', 'Récif englouti', 'Caldeira',
  'Bourgeon', 'Éclat', 'Embrun', 'Foudre', 'Goutte', 'Lierre', 'Lueur', 'Mousseline', 'Nacre', 'Pollen', 'Racine', 'Silex', 'Tison',
  'Marée montante', 'Arôme de caramel', 'Vent porteur', 'Air glacé', 'Courant profond', 'Chaleur ardente'];
const rules = [
  [/\b\d+\s+(œufs|oeufs|familiers)\b/i, 'nombre d\'œufs/familiers interdit (il va augmenter)'],
  [/\b(maigrir|perdre (du poids|des kilos|\d+ kilos?)|brûler (des|vos|tes) calories|guérir|soigne[rz]?)\b/i, 'promesse médicale / perte de poids interdite'],
  [/\b\d[\d\s.,]*\s*(k|m|millions?|milliers)?\s*(de\s+)?(téléchargements|installations|joueurs|utilisateurs)\b/i, 'stat de téléchargements/joueurs inventée'],
  [/\b(\d[.,]\d\s*\/\s*5|\d\s*étoiles|avis (positifs|clients))\b/i, 'note/avis inventé'],
  [/[\w.-]+@[\w-]+\.[a-z]{2,}/i, 'adresse e-mail interdite'],
  [/—/, 'tiret cadratin (—) : style IA, utiliser « : » ou une virgule'],
];
const healthRe = /\b(santé|poids|calorie|cardio|tension|maladie|mortalité|sommeil|stress|diabète)\b/i;

const errors = [], warns = [];
const files = readdirSync(DIR).filter((f) => f.endsWith('.md')).sort();
const slugs = new Set(files.map((f) => f.replace(/\.md$/, '')));
const seen = { title: new Map(), description: new Map(), keyword: new Map() };

for (const f of files) {
  const slug = f.replace(/\.md$/, '');
  const err = (m) => errors.push(`${f}: ${m}`);
  const raw = readFileSync(new URL(f, DIR), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) { err('frontmatter manquant'); continue; }
  const fm = Object.fromEntries(m[1].split('\n').map((l) => l.match(/^(\w+):\s*(.*)$/)).filter(Boolean).map(([, k, v]) => [k, v.replace(/^["']|["']$/g, '')]));
  const body = m[2];
  const words = body.split(/\s+/).filter(Boolean).length;

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) err('nom de fichier : kebab-case sans accents');
  for (const k of ['title', 'description', 'keyword']) {
    if (seen[k].has(fm[k])) err(`${k} dupliqué avec ${seen[k].get(fm[k])}`);
    seen[k].set(fm[k], f);
  }
  if ((fm.title || '').length > 62) warns.push(`${f}: title ${fm.title.length} car. (viser ≤ 60)`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fm.date || '')) err('date au format AAAA-MM-JJ');
  if (words < 900) err(`${words} mots (min 900)`);
  if (words > 2200) warns.push(`${f}: ${words} mots (long)`);
  if (/^# /m.test(body)) err('H1 dans le corps : le titre est déjà le H1');
  if ((body.match(/^## /gm) || []).length < 3) err('au moins 3 sections H2');
  if (!body.includes(PLAY)) err('lien Google Play (URL exacte de config.ts) absent du corps');
  if ((body.match(new RegExp(PLAY.replace(/[.?]/g, '\\$&'), 'g')) || []).length > 2) warns.push(`${f}: plus de 2 liens Play dans le corps (trop insistant)`);
  if (/\b(iOS|iPhone|App Store)\b/.test(body) && !/Android/.test(body)) err('mentionne iOS sans préciser Android seulement');

  const internal = [...body.matchAll(/\]\((\/[^)#\s]*)/g)].map((x) => x[1]);
  const goodInternal = internal.filter((u) => STATIC.includes(u) || (u.startsWith('/blog/') && slugs.has(u.replace(/^\/blog\/|\/$/g, ''))));
  for (const u of internal) if (!STATIC.includes(u) && !(u.startsWith('/blog/') && slugs.has(u.replace(/^\/blog\/|\/$/g, '')))) err(`lien interne cassé : ${u}`);
  if (new Set(goodInternal).size < 2) err('au moins 2 liens internes distincts (pages du site ou autres articles)');
  if (!/\]\(\/(jeu-de-marche|podometre-ludique|motivation-marche)\//.test(body)) warns.push(`${f}: aucun lien vers une page pilier`);
  if ((body.match(/\]\(https?:\/\/(?!play\.google\.com)/g) || []).length < 1) warns.push(`${f}: aucune source externe citée`);

  const text = fm.title + '\n' + fm.description + '\n' + body;
  for (const s of spoil) if (new RegExp(`(^|[^\\p{L}])${s}([^\\p{L}]|$)`, 'iu').test(text)) err(`spoil : « ${s} » ne doit pas être cité`);
  for (const [re, msg] of rules) if (re.test(text)) err(msg);
  if (healthRe.test(body) && !/Idle Walk est un jeu/i.test(body)) err('sujet santé : ajouter l\'avertissement « Idle Walk est un jeu… pas un avis médical »');
}

for (const w of warns) console.log('⚠ ', w);
for (const e of errors) console.log('✗ ', e);
console.log(errors.length ? `\n${errors.length} erreur(s)` : `\n✓ ${files.length} article(s) conformes`);
process.exit(errors.length ? 1 : 0);
