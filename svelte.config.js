import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const base = '';

// /** @type {import('@sveltejs/kit').Config} */

const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: '404.html',
			static: '',
			precompress: true
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? base : ''
		},
		prerender: {
			handleHttpError({ path, message }) {
				const spaRedirects = ['/about', '/skills', '/projects', '/experience', '/resume', '/contact'];
				if (spaRedirects.includes(path)) {
					return;
				}
				throw new Error(message);
			}
		},
		inlineStyleThreshold: 5000,
		csp: {
			mode: 'auto'
		}
	}
};

export default config;
