// Importe (copie + redimensionne en WebP) les visuels depuis le projet mobile (lecture seule)
// et depuis les captures Google Play déjà téléchargées. À relancer seulement si les visuels changent.
// Usage : node scripts/import-assets.mjs <dossier-projet-mobile> <dossier-captures-play>
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const [APP = '../idle-walk', PLAY = '/tmp/claude-1000/play/raw'] = process.argv.slice(2);
const OUT = 'src/assets';

const jobs = [];
const add = (src, dest, width, q = 82) => jobs.push({ src, dest, width, q });

// Captures officielles Google Play (1080x1920) — conservées entières, ratio 9:16
const shots = { 'accueil': 10, 'oeuf': 2, 'classement': 4, 'familiers': 5, 'activite': 9, 'boss': 15, 'maison': 18, 'carte': 21 };
for (const [n, i] of Object.entries(shots)) add(join(PLAY, `s${i}.png`), `shots/${n}.webp`, 720, 80);

// Marque
add(join(APP, '.claude/design/logo-no-bg.png'), 'brand/logo.webp', 640);
add(join(APP, '.claude/design/store-assets/icon-512.png'), 'brand/icon.webp', 512);
add(join(APP, 'assets/images/coin.png'), 'brand/coin.webp', 400);
add(join(APP, 'assets/images/illustration-shoe-smooth.png'), 'brand/shoe.webp', 600);
add(join(APP, 'assets/images/map-zones.png'), 'brand/carte-zones.webp', 900);
add(join(APP, '.claude/design/store-assets/feature-graphic.png'), 'brand/feature-graphic.webp', 1024);

const zones = ['vallee-verte', 'cote-tropicale', 'foret-sucree', 'archipel-celeste', 'banquise', 'recif-englouti', 'caldeira'];
for (const z of zones) add(join(APP, `assets/images/illustration-zone-${z}-hd.png`), `zones/${z}.webp`, 736);
for (const z of zones.slice(0, 6)) add(join(APP, `assets/images/bosses/boss-${z}.png`), `bosses/${z}.webp`, 320);

const pets = ['bourgeon','brume','chance','eclat','embrun','foudre','goutte','guimauve','lierre','lueur','mousseline','nacre','pollen','racine','silex','tison'];
for (const p of pets) add(join(APP, `assets/images/icons/icon-familier-${p}.png`), `familiers/${p}.webp`, 300);
const eggs = ['mousseux','brindille','silex','sable','corail','perle','brume','tonnerre','lave','stellaire'];
for (const e of eggs) add(join(APP, `assets/images/icons/icon-oeuf-${e}.png`), `oeufs/${e}.webp`, 260);
for (let i = 1; i <= 6; i++) add(join(APP, `assets/images/avatars/avatar-${i}.png`), `avatars/avatar-${i}.webp`, 360);

for (const b of ['shoe','clover','icon-bonus-winged-boot','icon-bonus-fireflies','icon-bonus-acorn','icon-bonus-roots','map-scroll','treasure-chest']) {
  add(join(APP, `assets/images/bonuses/${b}.png`), `bonus/${b}.webp`, 240);
}
for (const s of ['cloud','clover','star','mushroom','umbrella','snowman','volcano','wave','campfire','candy','treasure-chest','shell-pearl']) {
  add(join(APP, `assets/images/scene/${s}.png`), `deco/${s}.webp`, 240);
}

for (const j of jobs) {
  const dest = join(OUT, j.dest);
  mkdirSync(dirname(dest), { recursive: true });
  await sharp(j.src).resize({ width: j.width, withoutEnlargement: true }).webp({ quality: j.q }).toFile(dest);
}
console.log(`${jobs.length} images importées`);
