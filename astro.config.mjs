import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URL publique du site : à définir avec SITE_URL au build (ex. SITE_URL=https://idle-walk.fr npm run build).
// Sert aux URLs canoniques, Open Graph, sitemap.xml et robots.txt.
const site = process.env.SITE_URL || 'https://idle-walk.pages.dev';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [sitemap()],
  image: { layout: 'constrained' },
});
