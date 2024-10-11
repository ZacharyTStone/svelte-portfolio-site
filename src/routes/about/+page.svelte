<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import ChipIcon from '$lib/components/Chip/ChipIcon.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import CommonPage from '$lib/components/Page/CommonPage.svelte';
	import { getPlatfromIcon, HOME, RESUME } from '$lib/params';
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let { description, lastName, links, name, title, skills } = HOME;
	let fadeInDelay = 0;

	let mounted = false;

	onMount(() => {
		mounted = true;
		fadeInDelay = 0; // Reset fadeInDelay when component mounts
	});

	function getAnimationDelay() {
		const delay = fadeInDelay;
		fadeInDelay += 200; // Increase delay for each subsequent item
		return delay;
	}
</script>

<svelte:head>
	<title>{$_('NAVBAR.about')}</title>
</svelte:head>

<CommonPage title={$_('ABOUT.title')}>
	<div class="max-w-full mx-auto px-2 py-1 relative">
		<main
			class="text-left flex flex-col gap-6 md:gap-6 lg:gap-12 md:flex-row lg:flex-row items-stretch"
			style="z-index: 0;"
		>
			{#if mounted}
				<div
					class="flex-1 flex flex-col gap-4 md:max-h-[80vh] lg:max-h-[80vh] px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8 overflow-y-auto overflow-x-visible"
				>
					<div in:fade={{ delay: getAnimationDelay(), duration: 300 }}>
						<Card classes={['unblur-blurb-text', 'w-full']}>
							<h2 class="text-lg md:text-xl font-semibold mb-2">
								{$_('ABOUT.title')}
							</h2>
							<p class="blur-on-hover blurb-text">
								{$_('ABOUT.full_about')}
							</p>
						</Card>
					</div>
				</div>

				<div class="hidden md:block stylized-vr" />

				<div
					class="flex-1 flex flex-col gap-4 md:max-h-[80vh] lg:max-h-[80vh] px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8 overflow-y-auto overflow-x-visible"
				>
					{#each [$_('ABOUT.blurb1')] as blurb, index}
						<div in:fade={{ delay: getAnimationDelay(), duration: 300 }}>
							<Card classes={['unblur-blurb-text', 'w-full']}>
								<h2 class="text-lg md:text-xl font-semibold mb-2">
									{$_(`ABOUT.blurb${index + 1}.title`)}
								</h2>
								<p class="blur-on-hover blurb-text">{$_(`ABOUT.blurb${index + 1}.text`)}</p>
							</Card>
						</div>
					{/each}
					<div class="flex flex-col w-full gap-6 mt-6">
						<div class="flex flex-col w-full gap-3">
							{#each RESUME?.links as item}
								<div in:fade={{ delay: getAnimationDelay(), duration: 500 }}>
									<Card href={item?.to} classes={['w-full']}>{$_(item?.label)}</Card>
								</div>
							{/each}
						</div>
						<div
							class="hidden lg:fixed bottom-0 left-0 lg:right-auto lg:left-0 flex justify-center gap-5 pb-15 px-15"
						>
							{#each links as { platform, link }}
								<div in:fade={{ delay: getAnimationDelay(), duration: 600 }}>
									<ChipIcon name={platform} href={link} newtab>
										<Icon
											icon={getPlatfromIcon(platform)}
											color={'var(--accent-text)'}
											size={'24px'}
										/>
									</ChipIcon>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		</main>
	</div>
</CommonPage>

<style>
	:global(.zach) {
		display: block;
		margin: 0 auto;
		object-fit: cover;
		width: 250px;
		height: 250px;
		@media (min-width: 640px) {
			width: 300px;
			height: 300px;
			margin-top: 100px;
		}
		transition: transform 1.2s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1.5s;
		z-index: 10;
	}

	@media (min-width: 1024px) {
		.blurb-text {
			filter: blur(4px);
			transition: filter 0.2s;
			cursor: default;
		}
	}

	.stylized-vr {
		width: 1px;
		margin: 0 1rem;
		background-color: var(--border);
		transition: background-color 1s ease;
	}

	.stylized-vr:hover {
		animation: card_shimmer 2s infinite;
	}

	@media (min-width: 768px) {
		:global(.main-about-card) {
			font-size: 1.25rem; /* 20px */
			line-height: 1.875rem; /* 30px */
		}

		:global(.main-about-card h2) {
			font-size: 1.875rem; /* 30px */
			line-height: 2.25rem; /* 36px */
		}
	}

	/* Updated styles for blurb text */
	:global(.blurb-text) {
		line-height: 1.5;
		margin-bottom: 0.75rem;
	}

	@media (min-width: 768px) {
		:global(.blurb-text) {
			line-height: 1.6;
		}
	}
</style>
