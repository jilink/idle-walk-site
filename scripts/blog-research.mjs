// Recherche de sujets pour le blog : tendances Google (FR), actus récentes, suggestions Google (long traîne)
// et articles déjà publiés. Sortie Markdown sur stdout. Aucune clé API, aucune dépendance.
// Usage : node scripts/blog-research.mjs
import { readdirSync, readFileSync } from 'node:fs';

const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; idle-walk-blog-research)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const get = async (url) => {
  try {
    const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(15000) });
    return r.ok ? await r.text() : '';
  } catch { return ''; }
};
const decode = (s) => s.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const tags = (xml, tag) => [...xml.matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'g'))].map((m) => decode(m[1]).trim());

const out = [];
const h = (t) => out.push(`\n## ${t}\n`);

// 1. Tendances Google du moment (France). Généraliste : sert à repérer un angle d'actualité ou de saison.
h('Google Trends France : recherches du moment (généraliste)');
const trends = await get('https://trends.google.com/trending/rss?geo=FR');
const items = trends.split('<item>').slice(1, 26);
const nicheRe = /marche|pas\b|sport|rando|course|footing|météo|neige|froid|chaleur|canicule|rentrée|janvier|résolution|santé|sommeil|stress|jeu|jeux|mobile|android|podom|montre|apple watch|fitbit|garmin/i;
for (const it of items) {
  const title = tags(it, 'title')[0];
  const traffic = tags(it, 'ht:approx_traffic')[0] || '';
  const news = tags(it, 'ht:news_item_title').slice(0, 1).join('');
  out.push(`- ${nicheRe.test(title + ' ' + news) ? '**[lié niche ?]** ' : ''}${title} (${traffic})${news ? ` — ${news}` : ''}`);
}
if (!items.length) out.push('- (indisponible)');

// 2. Actus récentes dans la niche (Google Actualités, 30 jours).
h('Actus récentes dans la niche (Google Actualités FR, 30 j)');
const newsQueries = ['"10 000 pas"', 'podomètre', 'marche à pied santé étude', 'application de marche', 'marche quotidienne habitude'];
const seen = new Set();
for (const q of newsQueries) {
  const xml = await get(`https://news.google.com/rss/search?q=${encodeURIComponent(q + ' when:30d')}&hl=fr&gl=FR&ceid=FR:fr`);
  const titles = xml.split('<item>').slice(1, 7).map((i) => tags(i, 'title')[0]).filter((t) => t && !seen.has(t));
  if (!titles.length) continue;
  out.push(`**${q}**`);
  titles.forEach((t) => { seen.add(t); out.push(`- ${t}`); });
  await sleep(300);
}

// 3. Suggestions Google (ce que les gens tapent vraiment) : idées de long traîne.
h('Suggestions Google (autocomplete FR) : requêtes réelles');
const seeds = ['marcher', 'marche à pied', '10000 pas', 'combien de pas', 'podomètre', 'compteur de pas', 'application marche', 'motivation marche', 'marche quotidienne', 'jeu de marche', 'comment marcher', 'pourquoi marcher'];
const suffixes = ['', ' a', ' c', ' d', ' e', ' l', ' p', ' q', ' s'];
const sugg = new Map();
for (const seed of seeds) {
  for (const suf of suffixes) {
    const raw = await get(`https://suggestqueries.google.com/complete/search?client=firefox&hl=fr&gl=fr&q=${encodeURIComponent(seed + suf)}`);
    try { for (const s of JSON.parse(raw)[1] || []) if (!sugg.has(s)) sugg.set(s, seed); } catch {}
    await sleep(120);
  }
}
const bySeed = {};
for (const [s, seed] of sugg) (bySeed[seed] ||= []).push(s);
for (const [seed, list] of Object.entries(bySeed)) out.push(`- **${seed}** → ${list.slice(0, 14).join(' · ')}`);

// 4. Déjà publié : à ne pas dupliquer.
h('Articles déjà publiés (ne pas cannibaliser)');
const dir = new URL('../src/content/blog/', import.meta.url);
let n = 0;
for (const f of readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
  const fm = readFileSync(new URL(f, dir), 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] || '';
  const g = (k) => fm.match(new RegExp(`^${k}:\\s*["']?(.*?)["']?\\s*$`, 'm'))?.[1] || '';
  out.push(`- ${f.replace(/\.md$/, '')} | mot-clé : ${g('keyword')} | ${g('date')} | ${g('title')}`);
  n++;
}
if (!n) out.push('- (aucun)');

console.log(`# Recherche blog Idle Walk — ${new Date().toISOString().slice(0, 10)}${out.join('\n')}`);
