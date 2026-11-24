# Idle Walk – site officiel

Site marketing / SEO statique (100 % français) du jeu de marche **Idle Walk** (Android).
Astro 5, aucun JavaScript côté client (menu et FAQ en HTML pur), images WebP optimisées au build, police auto-hébergée.
Projet indépendant de l'app mobile (`../idle-walk`, jamais modifiée).

## Pages
`/` · `/jeu-de-marche/` · `/podometre-ludique/` · `/motivation-marche/` · `/faq/` · `404`
+ `sitemap-index.xml` et `robots.txt` générés au build.

## Commandes
```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # sortie dans dist/
npm run preview   # sert dist/ en local
```

## Configuration (tout optionnel)
Copie `.env.example` en `.env`.

| Variable | Rôle |
|---|---|
| `SITE_URL` | URL finale (canonicals, Open Graph, sitemap, robots). **À définir avant la mise en ligne** (défaut : `https://idle-walk.pages.dev`) |
| `PUBLIC_GSC_VERIFICATION` | balise de vérification Google Search Console |
| `PUBLIC_GA_ID` | Google Analytics 4 (`G-…`) |
| `PUBLIC_PLAUSIBLE_DOMAIN` | Plausible (sans cookie) |

Vide = aucun script chargé. Constantes (lien Play, liens légaux, e-mail de contact) : `src/config.ts`.

## Déploiement gratuit
**Cloudflare Pages** (recommandé) : connecter le dépôt Git → build `npm run build`, dossier `dist`, variable `SITE_URL`. Domaine perso : *Custom domains*, puis mettre `SITE_URL` à jour et relancer un build.

**GitHub Pages** : build avec `SITE_URL=https://<user>.github.io/<repo>` (si sous-dossier, ajouter `base` dans `astro.config.mjs`), publier `dist/` (action `actions/deploy-pages`). Domaine perso : fichier `public/CNAME`.

Ensuite : ajouter le site dans Google Search Console et soumettre `/sitemap-index.xml`.

## Contenus et visuels
- Captures : captures officielles de la fiche Google Play, non retouchées. Autres visuels copiés de l'app en lecture seule par `scripts/import-assets.mjs` (déjà exécuté ; à relancer seulement si les visuels changent).
- Les textes ne décrivent que des fonctionnalités vérifiées dans le code de l'app (Premium : œufs, familiers, Maison, fin de la limite de 1 500 pas/jour de conversion en pièces). Si l'app change, relire `src/data/faq.ts` et les pages.
- Schema.org : `SoftwareApplication` (accueil), `WebSite`, `BreadcrumbList`. Pas de `FAQPage` : Google ne l'affiche plus en résultat enrichi que pour des sites institutionnels/santé.
- Ni note, ni avis, ni stats de téléchargements : rien d'inventé.

## Ajouter l'anglais plus tard
Pages FR à la racine de `src/pages/`. Prévoir `src/pages/en/…`, dupliquer `NAV` et `FAQ_ITEMS` par langue, ajouter `hreflang` dans `Seo.astro` et `i18n` dans `astro.config.mjs`.

## Badge Google Play
`src/assets/brand/google-play-badge-fr.png` : badge officiel français de Google, toujours lié à la fiche de l'app.
