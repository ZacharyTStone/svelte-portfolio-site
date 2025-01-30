<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import CommonPage from '$lib/components/Page/CommonPage.svelte';
	import { HOME, RESUME } from '$lib/params';
	import { handleNavigation } from '$lib/utils/helpers';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';

	let fadeInDelay = 0;

	let mounted = false;

	onMount(() => {
		mounted = true;
		fadeInDelay = 0;
	});

	function getAnimationDelay() {
		const delay = fadeInDelay;
		fadeInDelay += 200;
		return delay;
	}
</script>

<svelte:head>
	<title>{$_('NAVBAR.about')}</title>
</svelte:head>

<CommonPage title={$_('NAVBAR.about')}>
	<div class="max-w-full mx-auto px-2 py-1 relative">
		<main
			class="text-left flex flex-col gap-6 md:gap-6 lg:gap-12 md:flex-row lg:flex-row items-stretch"
			style="z-index: 0;"
		>
			{#if mounted}
				<div class="flex-1 flex flex-col gap-6 md:max-h-[80vh] overflow-x-visible animate-fadeIn">
					<div in:fade={{ delay: getAnimationDelay(), duration: 200 }}>
						<Card classes={['w-full', 'animate-slideInUp']}>
							<h2 class="text-xl font-semibold mb-2 md:text-2xl pb-2">
								{$_('ABOUT.title')}
							</h2>
							<p class="text-base md:text-lg leading-relaxed">
								{$_('ABOUT.full_about')}
							</p>
						</Card>
					</div>
				</div>
			{/if}
		</main>
	</div>
</CommonPage>

<style>
	@keyframes fadeInLocal {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.animate-fadeIn {
		animation: fadeInLocal 1s ease-out;
	}

	@keyframes slideInUpLocal {
		0% {
			transform: translateY(20px);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
