import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import UnoCSS from 'unocss/vite';

const config: UserConfig = {
	plugins: [UnoCSS(), sveltekit()],
	build: {
		minify: true,
		sourcemap: true,
		cssMinify: true,
		cssCodeSplit: true
	}
};

export default config;
