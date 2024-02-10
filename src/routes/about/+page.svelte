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
			<h2>{$_('ABOUT.sub-title')}</h2>
			<ul>
				<li>{$_('ABOUT.description1')}</li>
				<li>{$_('ABOUT.description2')}</li>
				<li>{$_('ABOUT.description3')}</li>
				<li>{$_('ABOUT.description4')}</li>
			</ul>
			<h2>{$_('ABOUT.quote1.title')}</h2>
			<p>
				{$_('ABOUT.quote1.text')}
			</p>
			<h2>{$_('ABOUT.quote2.title')}</h2>
			<p>
				{$_('ABOUT.quote2.text')}
			</p>
			<hr />
			<div class="row justify-center md:justify-start p-y-15px p-x-0px gap-3">
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
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px; /* Add padding to container for better mobile layout */
		display: flex;
		justify-content: center; /* Center content horizontally */
	}

	hr {
		margin: 40px 0px 20px 0px;
		border: 0;
		border-top: 1px solid var(--accent-text);
	}

	main {
		text-align: left;
		box-sizing: border-box;
	}

	h2 {
		margin-top: 30px;
		font-size: 20px;

		margin-bottom: 15px;
	}

	ul {
		padding: 0;
		list-style: none;
		padding-left: 20px; /* Adjusted padding */
	}

	p {
		margin-bottom: 15px;
		font-style: italic;
	}

	ul li {
		margin-bottom: 10px;
		position: relative;
		padding-left: 20px; /* Adjusted padding */
	}

	ul li:before {
		content: '';
		position: absolute;
		left: 0;
		top: 5px;
		width: 8px; /* Adjusted size */
		height: 8px; /* Adjusted size */
		background-color: var(--accent-text);
		border-radius: 50%; /* Make bullet round */
	}

	/* Media query for mobile devices */
	@media screen and (max-width: 768px) {
		h2 {
			font-size: 18px;
		}

		ul li {
			padding-left: 15px; /* Further adjust padding for smaller screens */
		}
	}
</style>
