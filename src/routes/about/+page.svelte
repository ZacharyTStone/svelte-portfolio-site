<script lang="ts">
	import ChipIcon from '$lib/components/Chip/ChipIcon.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import CommonPage from '$lib/components/Page/CommonPage.svelte';
	import { getPlatfromIcon } from '$lib/params';
	import { _ } from 'svelte-i18n';

	import Card from '$lib/components/Card/Card.svelte';

	import { HOME, RESUME } from '$lib/params';

	import Zach from '$lib/assets/images/zach.jpeg';
	import Image from '$lib/components/Image/Image.svelte';
	import { onMount } from 'svelte';

	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	let { description, lastName, links, name, title, skills } = HOME;

	let spinning = false;
	const spinDuration = 4000; // Reduced duration for faster animation
	const reappearDelay = 100; // Significantly reduced delay for quicker reappearance

	let imageContainer: HTMLDivElement | null = null;

	onMount(() => {
		imageContainer = document.querySelector('.image-container');
	});

	function handleClick() {
		if (spinning || !imageContainer) return;
		spinning = true;

		// Spin counterclockwise and move left
		imageContainer.style.transform = 'translateX(-100vw) rotate(-360deg)';

		setTimeout(() => {
			if (!imageContainer) return;
			// Instantly move to the right side without transition
			imageContainer.style.transition = 'none';
			imageContainer.style.transform = 'translateX(100vw) rotate(-360deg)';

			// Force a reflow
			void imageContainer.offsetWidth;

			// Re-enable transition and move back to center with continued counterclockwise rotation
			imageContainer.style.transition = `transform ${spinDuration}ms cubic-bezier(0.215, 0.61, 0.355, 1)`;
			imageContainer.style.transform = 'translateX(0) rotate(-720deg)';

			setTimeout(() => {
				if (!imageContainer) return;
				spinning = false;
				// Reset the rotation to 0 without transition
				imageContainer.style.transition = 'none';
				imageContainer.style.transform = 'translateX(0) rotate(0deg)';
				// Force a reflow
				void imageContainer.offsetWidth;
				// Re-enable transition for future animations
				imageContainer.style.transition = `transform ${spinDuration}ms cubic-bezier(0.215, 0.61, 0.355, 1)`;
			}, spinDuration);
		}, spinDuration / 2 + reappearDelay);
	}
</script>

<svelte:head>
	<title>{$_('NAVBAR.about')}</title>
</svelte:head>

<CommonPage title={$_('ABOUT.title')}>
	<div class="max-w-full mx-auto px-2 py-1 relative">
		<main
			class="text-left flex flex-col
		 gap-6 md:gap-6 lg:gap-12 md:flex-row
		lg:flex-row"
			style="z-index: 0;"
		>
			<div class="flex-1 relative z-10">
				<div
					class="image-container"
					style="transition: transform {spinDuration}ms cubic-bezier(0.215, 0.61, 0.355, 1);"
				>
					<Image
						src={Zach}
						alt="Zach Stone"
						classes="zach rounded-full cursor-pointer"
						onClick={handleClick}
						style="width: 250px; height: 250px; object-fit: cover;"
						loadingHeight="250px"
						loadingWidth="250px"
					/>
				</div>
			</div>
			<div
				class="flex-1 flex flex-col gap-4 md:max-h-[80vh] lg:max-h-[80vh]
			 px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8
			 overflow-y-auto
			 overflow-x-visible
			"
			>
				<p class="mb-4 md:mb-6 full-about">{$_('ABOUT.full_about')}</p>
				<Card classes={['unblur-quote-text']}>
					<h2 class="text-lg md:text-xl font-semibold mb-2">{$_('ABOUT.quote1.title')}</h2>
					<p class="blur-on-hover quote-text">{$_('ABOUT.quote1.text')}</p>
				</Card>
				<Card classes={['unblur-quote-text']}>
					<h2 class="text-lg md:text-xl font-semibold mb-2">{$_('ABOUT.quote2.title')}</h2>
					<p class="blur-on-hover quote-text">{$_('ABOUT.quote2.text')}</p>
				</Card>
				<div class="flex flex-wrap justify-center align-center gap-6 mt-6">
					<div
						class="hidden lg:fixed bottom-0 left-0 lg:right-auto lg:left-0 flex justify-center gap-5 pb-15 px-15"
					>
						{#each links as { platform, link }}
							<ChipIcon name={platform} href={link} newtab>
								<Icon icon={getPlatfromIcon(platform)} color={'var(--accent-text)'} size={'24px'} />
							</ChipIcon>
						{/each}
					</div>
					<div class="flex flex-wrap gap-3">
						{#each RESUME?.links as item}
							<Card href={item?.to}>{$_(item?.label)}</Card>
						{/each}
					</div>
				</div>
			</div>
		</main>
	</div>
</CommonPage>

<style>
	:global(.zach) {
		display: block;
		margin: 0 auto; /* 央揃えに変更 */
		object-fit: cover;
		width: 250px; /* 画像の幅を調整 */
		height: 250px; /* 画像の高さを調整 */
		@media (min-width: 640px) {
			/* タブレットと大きなューート用 */
			width: 300px; /* 画像の幅を大く */
			height: 300px; /* 画像の高さを大きく */
			margin-top: 100px; /* マージンを追加 */
		}
		transition: transform 2s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s;
		z-index: 10; /* Ensure the image is on top */
	}
	.full-about {
		font-size: 1rem; /* テキストサイズを大きく */
		font-weight: bold; /* テキストを太字に */
		margin: 10px 0; /* マージンを追加 */
		font-family: 'Noto Sans JP', sans-serif; /* フォントを変更 */
		line-height: 1.5; /* 行の高さを調整 */
	}

	@media (min-width: 1024px) {
		.quote-text {
			filter: blur(4px); /* 初期状態でのぼかし効果 */
			transition: filter 0.3s; /* ぼかし効果の変���滑らかに */
			cursor: default; /* カーソルをデフォルトに */
		}
	}
</style>
