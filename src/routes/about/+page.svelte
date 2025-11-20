<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import CommonPage from '$lib/components/Page/CommonPage.svelte';
	import { HOME } from '$lib/params';
       import { handleNavigation } from '$lib/utils/navigation';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { fade } from 'svelte/transition';
	import SocialLinks from '$lib/components/Contact/SocialLinks.svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	function getAnimationDelay() {
		return 0;
	}

	// Safe translation for SSR
	function safeTranslate(key: string): string {
		if (!browser) {
			return key.split('.').pop() || key;
		}
		try {
			return $_(key);
		} catch {
			return key.split('.').pop() || key;
		}
	}

	const aboutTitle = 'NAVBAR.about';
</script>

<svelte:head>
	<title>{safeTranslate(aboutTitle)}</title>
</svelte:head>

<CommonPage title={aboutTitle}>
	<div class="max-w-full mx-auto px-2 py-1 relative">
		<main
			class="text-left flex flex-col gap-6 md:gap-6 lg:gap-12 md:flex-row lg:flex-row items-stretch"
			style="z-index: 0;"
		>
			{#if mounted}
				<div class="flex-1 flex flex-col gap-6 md:max-h-[80vh] overflow-x-visible">
					<div in:fade={{ delay: getAnimationDelay(), duration: 200 }}>
						<div class="mx-auto w-full max-w-[800px]">
							<Card classes={'w-full'}>
								<h2 class="text-xl font-semibold mb-2 md:text-2xl pb-2">
									{$_('ABOUT.title')}
								</h2>
								<p class="text-base md:text-lg leading-relaxed">
									{$_('ABOUT.full_about')}
								</p>
							</Card>
							<div class="mt-3 grid grid-cols-1 md:grid-cols-[auto,1fr] items-start gap-3">
								<Card
									classes={'inline-flex'}
									ariaLabel={$_('SKILLS.cta')}
									onClick={(e) => handleNavigation(e, '/skills')}
								>
									<div class="flex items-center gap-2">
										<UIcon icon="i-carbon-software-resource-cluster" />
										<span>{$_('SKILLS.cta')}</span>
									</div>
								</Card>
							</div>
						</div>
					</div>

					<div class="hidden md:block w-px my-12 bg-border" style="animation-delay: 0.8s;"></div>

				</div>
			{/if}
		</main>
	</div>
</CommonPage>
