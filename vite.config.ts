import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import compression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import preload from 'vite-plugin-preload';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		enhancedImages(),
		UnoCSS(),
		compression({ algorithm: 'gzip' }),
		compression({ algorithm: 'brotliCompress', ext: '.br' }),
		ViteImageOptimizer({
			png: {
				quality: 80
			},
			jpeg: {
				quality: 80
			},
			jpg: {
				quality: 80
			},
			webp: {
				lossless: true
			}
		}),
		preload()
	],
	build: {
		minify: 'esbuild',
		sourcemap: false,
		cssMinify: true,
		cssCodeSplit: true,
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['svelte', 'svelte-i18n', '@vercel/analytics', '@vercel/speed-insights']
				}
			}
		},
		target: 'esnext'
	},
	assetsInclude: ['**/*.svg'],
	optimizeDeps: {
		exclude: ['@vercel/analytics', '@vercel/speed-insights']
	},
	server: {
		fs: {
			strict: true
		}
	}
};

export default config;
