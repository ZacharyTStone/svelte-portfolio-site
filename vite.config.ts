import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from 'unocss/vite';
import type { UserConfig } from 'vite';
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
				manualChunks: (id) => {
					// Split vendor chunks for better caching
					if (id.includes('node_modules')) {
						// Separate large libraries
						if (id.includes('svelte-i18n')) {
							return 'i18n';
						}
						if (id.includes('@vercel')) {
							return 'analytics';
						}
						if (id.includes('svelte')) {
							return 'svelte';
						}
						// Other node_modules
						return 'vendor';
					}
					// Split large local modules
					if (id.includes('$lib/data/assets')) {
						return 'assets';
					}
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
	},
	css: {
		preprocessorOptions: {
			scss: {
				silenceDeprecations: ['legacy-js-api']
			}
		}
	}
};

export default config;
