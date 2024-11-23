<script lang="ts">
	import { run } from 'svelte/legacy';

	import { page } from '$app/stores';
	import { HOME, NavBar } from '$lib/params';
	import { theme, toggleTheme } from '$lib/stores/theme';

	import { base } from '$app/paths';
	import { _, locale } from 'svelte-i18n';
	import Chip from '../Chip/Chip.svelte';
	import UIcon from '../Icon/UIcon.svelte';

	let currentRoute = $state('/');
	let navigationError = $state(false);

	run(() => {
		if ($page) {
			currentRoute = $page.url.pathname;
			console.log('Current route:', currentRoute);
		}
	});

	const items = [
		{ title: NavBar.about, to: '/about', icon: 'i-carbon-user' },
		{ title: NavBar.skills, to: '/skills', icon: 'i-carbon-software-resource-cluster' },
		{ title: NavBar.personal, to: '/projects', icon: 'i-carbon-cube' },
		{ title: NavBar.career, to: '/experience', icon: 'i-carbon-development' }
	];

	function toggleLanguage() {
		if ($locale?.includes('en')) {
			locale.set('ja');
		} else {
			locale.set('en');
		}
	}
</script>

<div class="nav-menu">
	<nav class="container !justify-between flex flex-row items-center text-sm">
		<Chip
			classes="inline-flex items-center !text-[var(--secondary-text)] rainbow-hover gap-2"
			href={`${base}/`}
			newTab={false}
			active={currentRoute === '/'}
			borderRadius="0px"
			hideBorder={true}
		>
			<UIcon icon="i-carbon-code" classes="text-1.3em md:text-1.5em" alt="home" />
			<span class="nav-menu-item-label hidden md:inline">{$_(HOME.name)} {$_(HOME.lastName)}</span>
		</Chip>

		<div class="flex flex-row flex-1 self-center justify-center gap-0 md:gap-2">
			{#each items as item}
				<Chip
					classes="inline-flex items-center !text-[var(--secondary-text)] rainbow-hover"
					href={`${base}${item.to}`}
					newTab={false}
					active={currentRoute === item.to}
					borderRadius="0px"
					hideBorder={true}
				>
					<UIcon icon={item.icon} classes="text-1.3em md:text-1.5em" alt={$_(item.title)} />
					<span class="nav-menu-item-label hidden md:inline">{$_(item.title)}</span>
				</Chip>
			{/each}
		</div>
		<div class="flex flex-row items-stretch gap-1 text-1.15em">
			<a href={`${base}/search`} class="text-inherit col-center self-stretch px-2 rainbow-hover">
				<UIcon icon="i-carbon-search" alt="search" tooltip={$_(NavBar.search)} />
			</a>
			<button
				class="bg-transparent text-1em border-none cursor-pointer text-[var(--secondary-text)] px-2 rainbow-hover"
				onclick={() => toggleTheme($theme === 'dark' ? 'light' : 'dark')}
				aria-label={$_($theme === 'light' ? NavBar.lightMode : NavBar.darkMode)}
			>
				{#if $theme === 'light'}
					<UIcon icon="i-carbon-moon" alt="light Theme" tooltip={$_(NavBar.lightMode)} />
				{:else}
					<UIcon icon="i-carbon-sun" alt="Dark Theme" tooltip={$_(NavBar.darkMode)} />
				{/if}
			</button>
			<button
				class="bg-transparent text-1em border-none cursor-pointer text-[var(--secondary-text)] px-2 rainbow-hover"
				onclick={toggleLanguage}
				aria-label={$_($locale?.includes('en') ? NavBar.japanese : NavBar.english)}
			>
				{#if $locale?.includes('en')}
					<UIcon
						icon="i-flag-jp-4x3"
						classes="text-1.3em mt-0.5"
						alt="JA"
						tooltip={$_(NavBar.japanese)}
					/>
				{:else}
					<UIcon
						icon={'i-flag-us-4x3'}
						classes="text-1.3em mt-0.5"
						alt="English"
						tooltip={$_(NavBar.english)}
					/>
				{/if}
			</button>
		</div>
	</nav>
</div>

{#if navigationError}
	<p>An error occurred during navigation. Please try again.</p>
{/if}

<style lang="scss">
	.nav-menu {
		display: flex;
		justify-content: center;
		position: sticky;
		top: 0px;
		z-index: 10;
		padding: 4px 5px;
		border-bottom: 1px solid var(--secondary);
		background-color: var(--main);
		height: max-content;

		// small mobile

		&-item {
			text-decoration: none;
			padding: 10px 15px;
			color: inherit;
			display: flex;
			align-items: center;

			@media (max-width: 425px) {
				padding: 2px 5px;
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
