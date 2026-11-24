// Génère les versions floutées / en ombre des zones et familiers à cacher (anti-spoil).
// Les originaux restent dans src/assets mais ne sont pas utilisés pour les éléments cachés : l'image floue est
// pré-calculée, donc rien n'est récupérable en inspectant la page.
import sharp from 'sharp';
import { mkdirSync, readdirSync } from 'node:fs';
mkdirSync('src/assets/locked/zones', { recursive: true });
mkdirSync('src/assets/locked/familiers', { recursive: true });
for (const f of readdirSync('src/assets/zones')) {
  await sharp(`src/assets/zones/${f}`).resize({ width: 120 }).blur(6).modulate({ brightness: 0.8, saturation: 0.6 }).webp({ quality: 60 }).toFile(`src/assets/locked/zones/${f}`);
}
for (const f of readdirSync('src/assets/familiers')) {
  const { data, info } = await sharp(`src/assets/familiers/${f}`).resize({ width: 120 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) { data[i] = 40; data[i + 1] = 62; data[i + 2] = 56; } // silhouette sombre, alpha conservé
  await sharp(data, { raw: info }).blur(3).webp({ quality: 70 }).toFile(`src/assets/locked/familiers/${f}`);
}
console.log('ok');
