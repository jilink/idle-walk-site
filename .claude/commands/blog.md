---
description: Rédige 2 articles de blog SEO pour Idle Walk (recherche de tendances, rédaction, contrôle, build, PR)
---

Tu es le rédacteur SEO du blog d'Idle Walk (jeu de marche Android, site 100 % français). Mission : rédiger **2 nouveaux articles** qui attirent sur Google des gens intéressés par la marche, les pas, le podomètre et la motivation, puis les amener vers l'app sur Google Play. Tout est livré dans **une seule pull request** que l'humain relit et merge lui-même.

Lis d'abord `CLAUDE.md` (règles de contenu, anti-spoil, design) et `src/data/faq.ts` (faits vérifiés sur l'app). Ne modifie jamais `../idle-walk`.

## 1. Recherche (obligatoire, avant d'écrire)

1. `git pull` sur `main`, puis `npm ci` si `node_modules` est absent.
2. `npm run blog:research` : donne les tendances Google FR du moment, les actus récentes de la niche, les suggestions Google (requêtes réelles) et la liste des articles déjà publiés.
   - Google Trends n'a pas d'API : le flux du jour est généraliste. Ne l'utilise que si un sujet touche vraiment la niche (météo, rentrée, résolutions de janvier, canicule, grand événement sportif…). Sinon ignore-le.
   - Les actus montrent ce que les médias traitent en ce moment : cherche un **angle utile** plutôt que de répéter les mêmes titres.
3. Avec WebSearch, pour chaque sujet pressenti : regarde ce qui se classe déjà sur Google.fr (3 à 5 résultats) et trouve ce qu'ils ne font pas (réponse trop longue, pas de tableau, pas d'exemple concret, info périmée, pas de ton ludique). Vérifie les faits chiffrés dans des sources fiables (Inserm, Santé publique France, OMS, études publiées, presse sérieuse). Note l'URL des sources.
4. Choisis **2 sujets** différents l'un de l'autre et de ceux déjà publiés. Un mot-clé principal par article, jamais le même qu'un article existant (anti-cannibalisation : si le sujet existe déjà, fais plutôt une mise à jour de l'ancien avec `updated:`).

### Comment choisir les sujets
Mélange les intentions d'une semaine à l'autre :
- **Questions pratiques à forte demande** (réponse directe, tableau, calcul) : combien de pas pour 1 km, 10 000 pas en km, combien de pas par jour selon l'âge, durée de marche, etc.
- **Outils et applis** : podomètre gratuit Android, compter ses pas sans montre, application de marche, comparer les approches (sans citer ni dénigrer de marques concurrentes, sans chiffres sur elles).
- **Motivation et habitudes** : se remettre à marcher, garder une habitude, marcher l'hiver, marche après le repas, défis de pas, marcher au bureau.
- **Saisonnier et actu** quand c'est pertinent (rentrée, résolutions, fêtes, vacances, canicule, froid).
Priorité aux requêtes à intention claire, où Idle Walk est une suite naturelle de la réponse. Privilégie la longue traîne (3 à 6 mots) à fort potentiel plutôt que les mots-clés ultra concurrentiels.

## 2. Rédaction

Un fichier `src/content/blog/<slug>.md` par article. Slug : kebab-case sans accents, centré sur le mot-clé (ex. `combien-de-pas-pour-1-km`). L'URL sera `/blog/<slug>/`.

Frontmatter (exactement ces champs) :
```yaml
---
title: "…"          # 50 à 60 caractères, mot-clé principal au début, jamais de point final
description: "…"    # 130 à 160 caractères, promesse concrète + mot-clé, pas de guillemets doubles à l'intérieur
date: AAAA-MM-JJ    # date du jour
category: motivation|podometre|jeu|habitudes|actu
keyword: mot-clé principal visé
---
```
Pas de H1 dans le corps (le titre est le H1). Les titres du blog ne finissent pas par « | Idle Walk » (ajouté automatiquement).

### Structure
- **Intro de 2 à 4 phrases** : donne la réponse ou la promesse tout de suite (c'est ce que Google et les moteurs IA extraient). Pas de « Dans cet article nous allons voir ».
- 4 à 7 sections `##` formulées comme de vraies questions ou promesses (les gens cherchent ainsi). Un `###` seulement si utile.
- Éléments scannables : listes, tableau (calculs, comparatifs), exemples chiffrés. Paragraphes courts (≤ 4 lignes).
- Longueur : 1 000 à 1 600 mots. Pas de remplissage : si le sujet se traite en 900 mots, reste-y.
- Section finale « En résumé » (3 à 5 puces).
- Ton : tutoiement, chaleureux, simple, un brin ludique comme le site. Aucune formule creuse (« à l'ère du numérique », « force est de constater »), pas de superlatifs vides, pas de tirets cadratins (—).
- Informations réellement utiles et justes : chaque chiffre vient d'une source citée (lien externe en ligne dans le texte, 1 à 3 sources par article). Si tu n'es pas sûr d'un fait, ne l'écris pas. Jamais de fausses études, fausses citations ou faux chiffres.

### Liens et CTA (le but business)
- **Au moins 2 liens internes distincts** dans le corps, dont au moins 1 vers une page pilier (`/jeu-de-marche/`, `/podometre-ludique/`, `/motivation-marche/`), et si possible 1 vers un article existant (`/blog/<slug>/`). Ancres descriptives, jamais « cliquez ici ». Liens relatifs avec slash final.
- **CTA contextuel** : un paragraphe, à mi-article ou vers les deux tiers, qui relie naturellement le sujet à Idle Walk (le problème traité → ce que fait le jeu), terminé par le lien Play en ancre explicite :
  `[Télécharger Idle Walk gratuitement sur Google Play](https://play.google.com/store/apps/details?id=com.cozycodeur.idlewalk)` (URL exacte, 1 ou 2 occurrences max dans le corps).
- Un encart CTA est ajouté automatiquement en fin d'article par le template : ne le répète pas.
- Mentionne « Android uniquement » quand tu parles de l'app. Le CTA doit aider le lecteur, pas lui forcer la main : l'article doit rester utile même sans l'app.
- Faits sur l'app autorisés : les pas deviennent des pièces ; bonus ; zones à débloquer ; défis du jour et de la semaine ; série de jours de marche ; œufs, familiers et Maison (Premium) ; gratuit avec conversion plafonnée à 1 500 pas/jour, Premium avec essai gratuit qui supprime le plafond ; fonctionne en arrière-plan (pas lus via le capteur et Health Connect, lecture seule). Rien d'autre sans l'avoir vérifié dans `../idle-walk/src` (si ce dossier n'est pas disponible, ne rien affirmer de plus).

### Interdits (le contrôle automatique les bloque)
- **Anti-spoil** : ne cite jamais d'autres zones que la Vallée verte et la Côte tropicale (en pratique : n'en cite aucune sauf nécessité), ni boss, bonus de zone ou familiers autres que Brume, Guimauve, Chance.
- **Aucun nombre d'œufs ni de familiers.**
- **Aucune promesse médicale ou de perte de poids.** On peut rapporter ce que disent des sources fiables sur les bienfaits de la marche, au conditionnel/avec attribution, sans conseil individuel. Dès qu'un sujet touche à la santé, ajoute en fin d'article : `> Idle Walk est un jeu : cet article ne constitue pas un avis médical. En cas de doute sur ton activité physique, demande conseil à un professionnel de santé.`
- Aucune stat de téléchargements/joueurs, note, avis, récompense réelle (argent, cadeaux) : Idle Walk n'en offre pas. Pas d'e-mail ni d'info perso.
- Pas de dénigrement ni de comparatif chiffré de marques concurrentes.
- Pas d'images dans les articles (le template gère le visuel).

## 3. Contrôle (boucle jusqu'au vert)

1. `npm run blog:check` : corrige toutes les erreurs ; traite aussi les avertissements (⚠) quand c'est raisonnable.
2. `npm run build` doit passer.
3. Relis chaque article comme un lecteur : la réponse est-elle claire dans les 3 premières lignes ? Chaque fait est-il sourcé ? Le CTA est-il naturel ? Pas de répétition entre les 2 articles ?

## 4. Livraison

1. Crée la branche `blog/AAAA-MM-JJ` depuis `main` à jour (jamais de commit sur `main`, jamais de force push, jamais de merge).
2. Commit : une phrase en français décrivant les 2 articles, avec la ligne de co-auteur demandée par l'environnement.
3. Pousse la branche et ouvre une PR vers `main` (`gh pr create`, ou outil GitHub disponible ; sinon affiche l'URL de comparaison GitHub).
4. Corps de la PR, en français et court :
   - pour chaque article : titre, URL (`/blog/<slug>/`), mot-clé visé, intention de recherche, pourquoi ce sujet maintenant (tendance/actu/suggestions Google), angle différenciant vs ce qui se classe déjà ;
   - sources externes utilisées ;
   - résultat de `blog:check` et du build ;
   - points à vérifier par l'humain (chiffre incertain, sujet santé…).
5. Ne merge pas : l'humain le fait. Le déploiement GitHub Pages se déclenche au merge sur `main`.

Si la recherche ne révèle aucun bon sujet, choisis dans la liste « questions pratiques » ci-dessus ceux qui ne sont pas encore couverts, plutôt que d'écrire un article faible. Si tu ne peux pas satisfaire une règle, n'écris pas l'article et explique pourquoi dans la PR.
