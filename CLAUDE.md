# Idle Walk – site officiel (projet web)

Site marketing/SEO **100 % français** du jeu mobile Idle Walk (Android, app dans `../idle-walk`, **ne jamais la modifier depuis ici**). Objectif : faire découvrir le jeu, générer des installs Google Play, gagner du trafic Google (jeu de marche, podomètre ludique, motivation marche).

## Stack
Astro 5 statique, aucun JS client (menu burger = `<details>`, FAQ = `<details>`), CSS global dans `src/styles/global.css`, police Nunito auto-hébergée, images via `astro:assets` (WebP). Pas de backend ni base de données.

## Commandes
`npm install` · `npm run dev` (localhost:4321) · `npm run build` (→ `dist/`) · `npm run preview`.

## Structure
- `src/pages/` : `index`, `jeu-de-marche`, `podometre-ludique`, `motivation-marche`, `faq`, `404`, `robots.txt.ts`, `blog/` (liste + article).
- `src/layouts/Base.astro` : header, footer, SEO, JSON-LD (WebSite + BreadcrumbList). `src/components/Seo.astro` : title, description, canonical, OG, Twitter.
- `src/config.ts` : lien Google Play, liens légaux/assistance, navigation, variables analytics. `src/data/faq.ts` : FAQ. `src/data/game.ts` : zones, familiers, œufs.
- `src/assets/` : visuels WebP (captures Play dans `shots/`). `src/assets/locked/` : versions floutées anti-spoil.
- `public/` : favicon, image OG, `CNAME`. `.github/workflows/deploy.yml` : déploiement GitHub Pages à chaque push sur `main`.

## Règles de contenu
- Ne décrire que des fonctionnalités **réellement présentes** dans l'app (vérifier dans `../idle-walk/src`). Ne rien inventer : ni avis, ni notes, ni stats de téléchargements, ni récompenses.
- Gratuit : conversion pas→pièces plafonnée à 1 500 pas/jour. Premium (essai gratuit proposé) : œufs, familiers, Maison, fin du plafond. Disponible sur Android uniquement (pas iOS).
- Aucune promesse médicale ou de perte de poids (c'est un jeu).
- **Anti-spoil** : seules les 2 premières zones (`ZONES_REVEALED`) et les 3 premiers familiers (`PETS_REVEALED`) sont montrés ; les autres sont floutés/en ombre via des images pré-floutées (`scripts/make-locked.mjs`). Ne pas citer dans les textes les noms des autres zones, boss, bonus ou familiers. Les œufs peuvent être montrés. **Ne jamais indiquer le nombre d'œufs ni de familiers** (il va augmenter) ; la liste affichée est volontairement tronquée.
- Un seul H1 par page, title et description uniques, lien Google Play sur chaque page (badge officiel + bouton).
- Pas d'e-mail ni d'adresse perso sur le site. Les liens légaux/assistance sont des pages Notion.

## Blog
Articles Markdown dans `src/content/blog/<slug>.md` (schéma : `src/content.config.ts`). 2 articles/semaine générés par la commande `/blog` (`.claude/commands/blog.md`), livrés en PR (branche `blog/AAAA-MM-JJ`) que l'utilisateur merge lui-même. `npm run blog:research` (tendances, actus, suggestions Google) · `npm run blog:check` (règles de contenu et anti-spoil, à passer avant toute PR). Les règles de contenu ci-dessus s'appliquent aux articles.

## Design
Charte de l'app : crème `#FBF7F0`, vert `#8BCF82`, encre `#1C3B34`, brun `#4A281C` (contours), jaune `#FFD86B`. Cartes « autocollant » (bord 3 px brun + tranche 3D). Mignon, ludique, pas de dégradé violet/glassmorphism.

## Déploiement
GitHub Pages + domaine `idle-walk.cozy-codeur.fr` (CNAME DNS vers `<user>.github.io`). `SITE_URL` fixe les canonicals/sitemap. Analytics optionnels via `.env` (voir `.env.example`). Anglais prévu plus tard (voir README).

## Commits
Quand l'utilisateur dit « sauvegarde » : tout ajouter, commit d'une phrase, pousser sur `main` (jamais de branche, jamais de force push), aucun secret dans le dépôt.
