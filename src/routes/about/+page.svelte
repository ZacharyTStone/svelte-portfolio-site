<script lang="ts">
	import ChipIcon from '$lib/components/Chip/ChipIcon.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import CommonPage from '$lib/components/Page/CommonPage.svelte';
	import { getPlatfromIcon } from '$lib/params';
	import { _ } from 'svelte-i18n';
	import Card from '$lib/components/Card/Card.svelte';
	import { HOME, RESUME } from '$lib/params';

	import Image from '$lib/components/Image/Image.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { description, lastName, links, name, title, skills } = HOME;
	let visible = false;
	let itemsVisible = Array(5 + RESUME?.links.length).fill(false); // Increased array size by 1

	onMount(() => {
		fadeInItems();
	});

	function fadeInItems() {
		itemsVisible.forEach((_, index) => {
			setTimeout(() => {
				itemsVisible[index] = true;
				if (index === itemsVisible.length - 1) {
					visible = true; // Set visible to true for the Zach image
				}
			}, index * 200);
		});
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
			<div
				class="flex-1 flex flex-col gap-4 md:max-h-[80vh] lg:max-h-[80vh] px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8 overflow-y-auto overflow-x-visible"
			>
				{#if itemsVisible[0]}
					<div transition:fade class="w-full">
						<Card classes={['unblur-blurb-text', 'w-full']}>
							<h2 class="text-lg md:text-xl font-semibold mb-2">
								{$_('ABOUT.title')}
							</h2>
							<p class="blur-on-hover blurb-text">
								{$_('ABOUT.full_about')}
							</p>
						</Card>
					</div>
				{/if}
			</div>

			<div class="hidden md:block stylized-vr fadeIn" />

			<div
				class="flex-1 flex flex-col gap-4 md:max-h-[80vh] lg:max-h-[80vh] px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8 overflow-y-auto overflow-x-visible"
			>
				{#each [$_('ABOUT.blurb1'), $_('ABOUT.blurb2'), $_('ABOUT.blurb3')] as blurb, index}
					{#if itemsVisible[index + 1]}
						<!-- Adjusted index for visibility -->
						<div transition:fade class="w-full">
							<Card classes={['unblur-blurb-text', 'w-full']}>
								<h2 class="text-lg md:text-xl font-semibold mb-2">
									{$_(`ABOUT.blurb${index + 1}.title`)}
								</h2>
								<p class="blur-on-hover blurb-text">{$_(`ABOUT.blurb${index + 1}.text`)}</p>
							</Card>
						</div>
					{/if}
				{/each}
				{#if itemsVisible[3]}
					<div class="flex flex-col w-full gap-6 mt-6" transition:fade>
						<div class="flex flex-col w-full gap-3">
							{#each RESUME?.links as item, index}
								{#if itemsVisible[3 + index]}
									<div transition:fade class="w-full">
										<Card href={item?.to} classes={['w-full']}>{$_(item?.label)}</Card>
									</div>
								{/if}
							{/each}
						</div>
						<div
							class="hidden lg:fixed bottom-0 left-0 lg:right-auto lg:left-0 flex justify-center gap-5 pb-15 px-15"
						>
							{#each links as { platform, link }}
								{#if itemsVisible[6]}
									<div transition:fade class="w-full">
										<ChipIcon name={platform} href={link} newtab>
											<Icon
												icon={getPlatfromIcon(platform)}
												color={'var(--accent-text)'}
												size={'24px'}
											/>
										</ChipIcon>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				{/if}
			</div>
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
</style>
