<script>
	import ChipIcon from '$lib/components/Chip/ChipIcon.svelte';
	import CommonPage from '$lib/components/CommonPage.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import { getPlatfromIcon } from '$lib/params';
	import { _ } from 'svelte-i18n';

	import { HOME } from '$lib/params';

	let { description, lastName, links, name, title, skills } = HOME;
</script>

<svelte:head>
	<title>{$_('NAVBAR.about')}</title>
</svelte:head>

<CommonPage title={$_('ABOUT.title')}>
	<div class="container">
		<main>
			<h2 class="text-lg md:text-xl font-semibold mb-4">{$_('ABOUT.sub-title')}</h2>
			<ul class="mb-6">
				<li class="mb-2">{$_('ABOUT.description1')}</li>
				<li class="mb-2">{$_('ABOUT.description2')}</li>
				<li class="mb-2">{$_('ABOUT.description3')}</li>
				<li class="mb-2">{$_('ABOUT.description4')}</li>
			</ul>
			<h2 class="text-lg md:text-xl font-semibold mb-2">{$_('ABOUT.quote1.title')}</h2>
			<p class="mb-6">{$_('ABOUT.quote1.text')}</p>
			<h2 class="text-lg md:text-xl font-semibold mb-2">{$_('ABOUT.quote2.title')}</h2>
			<p class="mb-6">{$_('ABOUT.quote2.text')}</p>
			<hr class="border-t border-accent-text mb-6" />
			<div class="flex flex-wrap gap-3">
				{#each links as { platform, link }}
					<ChipIcon name={platform} href={link} newtab>
						<Icon icon={getPlatfromIcon(platform)} color={'var(--accent-text)'} size={'28px'} />
					</ChipIcon>
				{/each}
			</div>
		</main>
	</div>
</CommonPage>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 20px;
	}

	main {
		text-align: left;
	}

	h2 {
		margin-top: 30px;
		margin-bottom: 15px;
	}

	ul {
		padding: 0;
		list-style: none;
	}

	li {
		position: relative;
		padding-left: 20px; /* Adjusted padding */
	}

	li:before {
		content: '';
		position: absolute;
		left: 0;
		top: 5px;
		width: 8px; /* Adjusted size */
		height: 8px; /* Adjusted size */
		background-color: var(--accent-text);
		border-radius: 50%; /* Make bullet round */
	}

	@media screen and (max-width: 768px) {
		h2 {
			font-size: 18px;
		}
	}
</style>
