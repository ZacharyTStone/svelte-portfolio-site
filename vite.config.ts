import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

const config: UserConfig = {
	plugins: [sveltekit(), enhancedImages(), UnoCSS()],
	build: {
		minify: true,
		sourcemap: true,
		cssMinify: true,
		cssCodeSplit: true
	},
	assetsInclude: ['**/*.svg'] // Treat all SVG files as assets
};

export default config;
