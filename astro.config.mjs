import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import auth from "auth-astro";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [svelte(), auth()],
  adapter: vercel()
});