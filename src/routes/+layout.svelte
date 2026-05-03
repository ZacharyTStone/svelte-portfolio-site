<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { browser, dev } from '$app/environment';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import SocialLinks from '$lib/components/Contact/SocialLinks.svelte';
	import LoadingProvider from '$lib/components/LoadingProvider.svelte';
	import NavMenu from '$lib/components/NavMenu/NavMenu.svelte';
	import ReadingProgress from '$lib/components/ReadingProgress/ReadingProgress.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop/ScrollToTop.svelte';
	import SectionRail from '$lib/components/Section/SectionRail.svelte';
	import '$lib/index.scss';
	import { onHydrated, theme, ThemeType } from '$lib/stores/theme';
	import { createKeyboardHandler, commonShortcuts } from '$lib/utils/keyboard';
	import { initLenis, onIdle } from '$lib/utils/motion';
	import { measurePageLoad } from '$lib/utils/performance';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { scrollToHash } from '$lib/utils/scrollToHash';
	import { onMount, tick } from 'svelte';
	import 'uno.css';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let onHome = $derived(page.url.pathname === '/');

	function isHomePath(pathname: string): boolean {
		if (pathname === '/' || pathname === '') return true;
		if (!base) return false;
		return pathname === base || pathname === `${base}/`;
	}

	afterNavigate(async (nav) => {
		if (!browser || !nav.to) return;
		const hash = nav.to.url.hash;
		if (!hash) return;
		if (!isHomePath(nav.to.url.pathname)) return;
		await tick();
		const prefersReduced =
			typeof window.matchMedia === 'function' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		scrollToHash(hash, prefersReduced ? 'instant' : 'smooth');
	});

	onMount(() => {
		onHydrated();
		// Speed Insights loads synchronously - it's lightweight and designed to not block
		injectSpeedInsights();

		// Initialize keyboard shortcuts
		const keyboardHandler = createKeyboardHandler(commonShortcuts);
		document.addEventListener('keydown', keyboardHandler);

		// Initialize performance monitoring
		measurePageLoad();

		// Idle-load Lenis smooth-scroll. No-op on touch / reduced-motion.
		let lenisCleanup: (() => void) | null = null;
		const cancelIdle = onIdle(() => {
			initLenis().then((cleanup) => {
				lenisCleanup = cleanup;
			});
		});

		return () => {
			document.removeEventListener('keydown', keyboardHandler);
			cancelIdle();
			lenisCleanup?.();
		};
	});
</script>

<div class={`body contents ${$theme === ThemeType.DARK ? 'theme-dark' : 'theme-light'}`}>
	<ReadingProgress />
	<NavMenu />
	{#if onHome}
		<SectionRail />
	{/if}
	<main id="main-content" class="content" class:container={!onHome} tabindex="-1">
		<LoadingProvider transition={true}>
			{@render children?.()}
		</LoadingProvider>
		{#if !onHome}
			<SocialLinks showOnMobile={true} showText={false} />
		{/if}
	</main>
	<ScrollToTop />
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
		transition-duration: 200ms;

		letter-spacing: 1px;
		min-height: 100dvh;
		/* `overflow: hidden` would kill position: sticky on every descendant.
		   Use overflow-x: clip to suppress horizontal overflow without establishing
		   a scroll container. */
		overflow-x: clip;
	}

	:global(p) {
		margin: 0px;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		margin: 5px 0px;
	}
</style>
