// Configuration centrale du site. Rien ici n'est secret.
export const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.cozycodeur.idlewalk';
export const SITE_NAME = 'Idle Walk';
export const LOCALE = 'fr-FR';

// Liens légaux et assistance (pages Notion publiées de l'app).
export const PRIVACY_URL =
  'https://funky-share-bf6.notion.site/Politique-de-confidentialit-Idle-Walk-3e27acdf0c2e801187ffd1fda67124d9?pvs=74';
export const TERMS_URL =
  'https://funky-share-bf6.notion.site/Conditions-d-utilisation-Idle-Walk-3e47acdf0c2e8047bc32f930d2e8081d?pvs=73';
export const SUPPORT_URL =
  'https://funky-share-bf6.notion.site/Assistance-Idle-Walk-3e77acdf0c2e80ec8c67e0aa4d58d96b?pvs=73';
export const CONTACT_EMAIL = 'jimmy.soussan@gmail.com';

// Analytics / Search Console : optionnels. Renseigne-les dans .env (voir .env.example).
export const GA_ID = import.meta.env.PUBLIC_GA_ID || '';
export const PLAUSIBLE_DOMAIN = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN || '';
export const GSC_VERIFICATION = import.meta.env.PUBLIC_GSC_VERIFICATION || '';

// Navigation principale (français uniquement pour l'instant).
export const NAV = [
  { href: '/jeu-de-marche/', label: 'Le jeu' },
  { href: '/podometre-ludique/', label: 'Podomètre' },
  { href: '/motivation-marche/', label: 'Motivation' },
  { href: '/faq/', label: 'FAQ' },
];
