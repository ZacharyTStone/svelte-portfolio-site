import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const base = '';

// /** @type {import('@sveltejs/kit').Config} */

const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),
		paths: {
			base: process.env.NODE_ENV === 'production' ? base : ''
		},
		inlineStyleThreshold: 5000, // Inline styles less than 5kb
		csp: {
			mode: 'auto'
		}
	}
};

export default config;
