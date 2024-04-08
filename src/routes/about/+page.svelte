<script>
	import ChipIcon from '$lib/components/Chip/ChipIcon.svelte';
	import CommonPage from '$lib/components/CommonPage.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import { getPlatfromIcon } from '$lib/params';
	import { _ } from 'svelte-i18n';

	import Card from '$lib/components/Card/Card.svelte';

	import { HOME, RESUME } from '$lib/params';

	import Zach from '$lib/assets/images/zach.jpeg';
	import Image from '$lib/components/Image.svelte';

	let { description, lastName, links, name, title, skills } = HOME;
</script>

<svelte:head>
	<title>{$_('NAVBAR.about')}</title>
</svelte:head>

<CommonPage title={$_('ABOUT.title')}>
	<div
		class="max-w-full mx-auto px-2 py-1
	"
	>
		<main
			class="text-left flex flex-col
		 gap-6 md:gap-6 lg:gap-12 md:flex-row
		lg:flex-row"
		>
			<div class="flex-1">
				<Image
					src={Zach}
					alt="Zach Stone"
					classes="zach rounded-full"
					loadingHeight="200px"
					loadingWidth="200px"
				/>
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
		margin: 0 auto; /* 中央揃えに変更 */
		object-fit: cover;
		width: 200px; /* 画像の幅を調整 */
		height: 200px; /* 画像の高さを調整 */
		@media (min-width: 640px) {
			/* タブレットと大きなビューポート用 */
			width: 300px; /* 画像の幅を大きく */
			height: 300px; /* 画像の高さを大きく */
			margin-top: 100px; /* マージンを追加 */
		}
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
			transition: filter 0.3s; /* ぼかし効果の変化を滑らかに */
			cursor: default; /* カーソルをデフォルトに */
		}
	}
</style>
