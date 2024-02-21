<script lang="ts">
	import { page } from '$app/stores';
	import { HOME, NavBar } from '$lib/params';
	import { theme, toggleTheme } from '$lib/stores/theme';

	import { base } from '$app/paths';
	import UIcon from '../Icon/UIcon.svelte';
	import { _ } from 'svelte-i18n';
	import { locale } from 'svelte-i18n';
	import ChipIcon from '../Chip/ChipIcon.svelte';

	$: currentLocale = $locale; // Reactive declaration

	function toggleLanguage() {
		if (currentLocale?.includes('en')) {
			locale.set('ja');
		} else {
			locale.set('en');
		}
	}

	let currentRoute = '/';

	$: {
		if ($page) {
			currentRoute = $page.url.pathname;
		}
	}

	const items = [
		{ title: NavBar.about, to: '/about', icon: 'i-carbon-user' },
		{ title: NavBar.skills, to: '/skills', icon: 'i-carbon-software-resource-cluster' },
		{ title: NavBar.personal, to: '/projects', icon: 'i-carbon-cube' },
		{ title: NavBar.career, to: '/experience', icon: 'i-carbon-development' },
		{ title: NavBar.blog, to: '/projects/zach-in-japan', icon: 'i-carbon-blog' }
	];
</script>

<div class="nav-menu">
	<nav class="container !justify-between flex flex-row items-center text-sm">
		<a
			href={`${base}/`}
			class="nav-menu-left decoration-none flex flex-row items-center cursor-pointer s:px-2 md:px-8 text-[var(--secondary-text)]  rainbow-hover  "
		>
			<UIcon icon="i-carbon-code" classes="text-2em" alt="home" tooltip="Home" />
			<span class="ml-2 text-md font-bold hidden md:inline"
				>{$_(HOME.name)} {$_(HOME.lastName)}</span
			>
		</a>

		<div class="flex flex-row flex-1 self-center justify-center md:gap-2">
			{#each items as item}
				<a
					href={`${base}${item.to}`}
					class="nav-menu-item !text-[var(--secondary-text)] rainbow-hover"
					style="position: relative;"
				>
					<UIcon icon={item.icon} classes="text-1.3em" alt={$_(item.title)} />
					<span class="nav-menu-item-label">{$_(item.title)}</span>
					<div class="shimmer-overlay" />
				</a>
			{/each}
		</div>
		<div class="flex flex-row items-stretch gap-1 text-1.15em">
			<a href={`${base}/search`} class="text-inherit col-center self-stretch px-2 rainbow-hover">
				<UIcon icon="i-carbon-search" alt="search" tooltip="Search" />
			</a>
			<button
				class="bg-transparent text-1em border-none cursor-pointer text-[var(--secondary-text)] px-2 rainbow-hover"
				on:click={() => toggleTheme($theme === 'dark' ? 'light' : 'dark')}
			>
				{#if $theme === 'light'}
					<UIcon icon="i-carbon-moon" alt="light Theme" tooltip="Light Mode" />
				{:else}
					<UIcon icon="i-carbon-sun" alt="Dark Theme" tooltip="Dark Mode" />
				{/if}
			</button>
			<button
				class="bg-transparent text-1em border-none cursor-pointer text-[var(--secondary-text)] px-2 rainbow-hover"
				on:click={toggleLanguage}
			>
				{#if $locale?.includes('en')}
					<UIcon icon="i-flag-jp-4x3" classes="text-1.3em" alt="JA" tooltip="Japanese" />
				{:else}
					<UIcon icon={'i-flag-us-4x3'} classes="text-1.3em" alt="English" tooltip="English" />
				{/if}
			</button>
		</div>
	</nav>
</div>

<style lang="scss">
	/* Show shimmer overlay on hover */
	.nav-menu-item {
		border-radius: 10px;
	}

	.nav-menu {
		display: flex;
		justify-content: center;
		position: sticky;
		top: 0px;
		z-index: 10;
		padding: 0px 10px;
		border-bottom: 1px solid var(--secondary);
		background-color: var(--main);
		height: 50px;

		// small mobile

		@media (max-width: 425px) {
			padding: 0px 0px;
		}

		&-item {
			text-decoration: none;
			padding: 10px 20px;
			color: inherit;
			display: flex;
			align-items: center;

			@media (max-width: 425px) {
				padding: 5px 10px;
			}

			&-label {
				margin-left: 10px;

				@media (max-width: 950px) {
					& {
						display: none;
					}
				}
			}
		}
	}
</style>
