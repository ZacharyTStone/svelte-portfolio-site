<script lang="ts">
	import { dev } from '$app/environment';
	import SocialLinks from '$lib/components/Contact/SocialLinks.svelte';
	import LoadingProvider from '$lib/components/LoadingProvider.svelte';
	import NavMenu from '$lib/components/NavMenu/NavMenu.svelte';
	import '$lib/index.scss';
	import { onHydrated, theme, ThemeType } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import 'uno.css';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	// Load analytics and speed insights non-blocking but early
	// Using requestIdleCallback with timeout ensures they load early but don't block render
	if (typeof window !== 'undefined') {
		const loadAnalytics = () => {
			Promise.all([
				import('@vercel/analytics').then(({ inject }) => {
					inject({ mode: dev ? 'development' : 'production' });
				}),
				import('@vercel/speed-insights/sveltekit').then(({ injectSpeedInsights }) => {
					injectSpeedInsights();
				})
			]).catch(() => {
				// Silently fail if analytics can't load
			});
		};

		// Use requestIdleCallback with timeout to ensure early loading without blocking
		// Timeout ensures it loads within 1s even if browser is busy
		if ('requestIdleCallback' in window) {
			requestIdleCallback(loadAnalytics, { timeout: 1000 });
		} else {
			// Fallback: load immediately but asynchronously
			setTimeout(loadAnalytics, 0);
		}
	}

	onMount(() => {
		onHydrated();
	});
</script>

<div class={`body contents ${$theme === ThemeType.DARK ? 'theme-dark' : 'theme-light'}`}>
	<NavMenu />
	<div class="content container">
		<LoadingProvider transition={true}>
			{@render children?.()}
		</LoadingProvider>
		<SocialLinks showOnMobile={true} showText={false} />
	</div>
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 0px 0px;
	}

	.body {
		margin: 0px;
		background-color: var(--main);
		color: var(--main-text);
		font-family: var(--text-f);
		display: flex;
		flex-direction: column;

		letter-spacing: 1px;
		min-height: 100dvh;
		overflow: hidden;
	}

	:global(p) {
		margin: 0px;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		margin: 5px 0px;
	}
</style>
