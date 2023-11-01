import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const base = './svelte-portfolio-site';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({ fallback: '404.html', static: '' }),
		paths: {
			base: process.env.NODE_ENV === 'production' ? base : ''
		}
	},

	vite: {
		// Vite-specific configuration goes here
		plugins: [
			{
				inspector: {
					showToggleButton: 'always'
				}
			}
		]
	}
};

export default config;
