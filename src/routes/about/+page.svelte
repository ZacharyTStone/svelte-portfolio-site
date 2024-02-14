<script>
	import ChipIcon from '$lib/components/Chip/ChipIcon.svelte';
	import CommonPage from '$lib/components/CommonPage.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import { getPlatfromIcon } from '$lib/params';
	import { _ } from 'svelte-i18n';

	import Card from '$lib/components/Card/Card.svelte';

	import { HOME, RESUME } from '$lib/params';

	let { description, lastName, links, name, title, skills } = HOME;
</script>

<svelte:head>
	<title>{$_('NAVBAR.about')}</title>
</svelte:head>

<CommonPage title={$_('ABOUT.title')}>
	<div class="max-w-screen-md mx-auto px-4 py-8">
		<main class="text-left">
			<p class="mb-6">{$_('ABOUT.full_about')}</p>
			<h2 class="text-xl md:text-2xl font-semibold mb-2">{$_('ABOUT.quote1.title')}</h2>
			<p class="mb-6">{$_('ABOUT.quote1.text')}</p>
			<h2 class="text-xl md:text-2xl font-semibold mb-2">{$_('ABOUT.quote2.title')}</h2>
			<p class="mb-6">{$_('ABOUT.quote2.text')}</p>
			<hr class="border-t border-gray-300 mb-6" />
			<div class="flex flex-wrap justify-center align-center gap-4">
				<div class="flex gap-3">
					{#each links as { platform, link }}
						<ChipIcon name={platform} href={link} newtab>
							<Icon icon={getPlatfromIcon(platform)} color={'var(--accent-text)'} size={'28px'} />
						</ChipIcon>
					{/each}
				</div>
				<div class="flex gap-3">
					{#each RESUME?.links as item}
						<Card href={item?.to}>{$_(item?.label)}</Card>
					{/each}
				</div>
			</div>
		</main>
	</div>
</CommonPage>
