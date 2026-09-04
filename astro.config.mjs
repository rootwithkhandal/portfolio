import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://khandal.tech',
  integrations: [sitemap()],
  devToolbar: { enabled: false },
});
