<script lang="ts">
	import { dev } from '$app/environment';
	import SocialLinks from '$lib/components/Contact/SocialLinks.svelte';
	import LoadingProvider from '$lib/components/LoadingProvider.svelte';
	import NavMenu from '$lib/components/NavMenu/NavMenu.svelte';
	import '$lib/index.scss';
	import { onHydrated, theme, ThemeType } from '$lib/stores/theme';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { onMount } from 'svelte';
	import 'uno.css';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	inject({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();

	onMount(() => {
		onHydrated();
	});
</script>

<div class={`body contents ${$theme === ThemeType.DARK ? 'theme-dark' : 'theme-light'}`}>
	<NavMenu />
	<main id="main-content" class="content container" tabindex="-1">
		<LoadingProvider transition={true}>
			{@render children?.()}
		</LoadingProvider>
		<SocialLinks showOnMobile={true} showText={false} />
	</main>
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
		overflow: hidden;
	}

	:global(p) {
		margin: 0px;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		margin: 5px 0px;
	}
</style>
