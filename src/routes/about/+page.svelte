<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import CommonPage from '$lib/components/Page/CommonPage.svelte';
	import { HOME, RESUME } from '$lib/params';
	import { handleNavigation } from '$lib/utils/helpers';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import TopLikedProjects from '$lib/components/TopLikedProjects/TopLikedProjects.svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	function getAnimationDelay() {
		return 0;
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
				<div class="flex-1 flex flex-col gap-6 md:max-h-[80vh] overflow-x-visible">
					<div in:fade={{ delay: getAnimationDelay(), duration: 200 }}>
						<Card classes={['w-full']}>
							<h2 class="text-xl font-semibold mb-2 md:text-2xl pb-2">
								{$_('ABOUT.title')}
							</h2>
							<p class="text-base md:text-lg leading-relaxed">
								{$_('ABOUT.full_about')}
							</p>
						</Card>
					</div>
				</div>

				<div class="hidden md:block w-px my-12 bg-border" style="animation-delay: 0.8s;"></div>

				<div class="flex-1 flex flex-col gap-6 md:max-h-[80vh] overflow-x-visible">
					<div
						class="flex flex-col w-full gap-6 mt-6"
						in:fade={{ delay: getAnimationDelay(), duration: 500 }}
					>
						<div class="flex flex-col w-full gap-4">
							{#each RESUME?.links as item}
								<div>
									<Card
										newtab
										onClick={(e) => handleNavigation(e, item?.to, true)}
										classes={['w-full']}
									>
										<div class="flex items-center gap-2">
											<UIcon icon="i-carbon-document" />
											{$_(item?.label)}
										</div>
									</Card>
								</div>
							{/each}
						</div>

						<!-- Popular Projects Section -->
						<div class="mt-8">
							<Card classes={['w-full']}>
								<TopLikedProjects limit={3} />
							</Card>
						</div>
					</div>
				</div>
			{/if}
		</main>
	</div>
</CommonPage>
