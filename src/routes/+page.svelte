<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import HeroLetters from '$lib/components/Page/HeroLetters.svelte';
	import { HOME, TITLE_SUFFIX } from '$lib/params';
	import { handleNavigation, useTitle } from '$lib/utils/helpers';
	import { _ } from 'svelte-i18n';

	let { description, lastName, links, name, title } = HOME;
</script>

<svelte:head>
	<title>{useTitle(title, TITLE_SUFFIX)}</title>
</svelte:head>

<HeroLetters />
<div
	class="hero-container relative flex h-[calc(100dvh-151px)] items-center justify-center overflow-hidden bg-transparent"
>
	<div class="hero-content relative z-10 mx-auto max-w-2xl text-center">
		<h3 class="hero-description mb-8 max-w-xl text-xl text-accent-text sm:text-2xl">
			{$_(description)}
		</h3>
		<div class="cta-button hidden lg:block">
			<Card nofade={true} onClick={(e) => handleNavigation(e, '/about')}>{$_('ABOUT.cta')}</Card>
		</div>
	</div>
</div>

<style>
	.hero-container {
		height: calc(100dvh - 151px);
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		position: relative;
		overflow: hidden;
		animation: fadeIn 7s ease-in;
	}

	.hero-description,
	.cta-button {
		opacity: 0;
		animation: flyIn 1s ease-out forwards;
	}

	.hero-description {
		animation-delay: 3s;
	}

	.cta-button {
		animation-delay: 3.5s;
	}

	@keyframes flyIn {
		0% {
			transform: translateY(50px);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes fadeIn {
		0%,
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
