<script lang="ts">
	import { page } from '$app/stores';
	import { HOME, NavBar } from '$lib/params';
	import { theme, toggleTheme } from '$lib/stores/theme';
	import { handleNavigation } from '$lib/utils/helpers';
	import { base } from '$app/paths';

	import { _, locale } from 'svelte-i18n';
	import Chip from '../Chip/Chip.svelte';
	import UIcon from '../Icon/UIcon.svelte';

	const items = [
		{ title: NavBar.about, to: '/about', icon: 'i-carbon-user' },
		{ title: NavBar.skills, to: '/skills', icon: 'i-carbon-software-resource-cluster' },
		{ title: NavBar.personal, to: '/projects', icon: 'i-carbon-cube' },
		{ title: NavBar.career, to: '/experience', icon: 'i-carbon-development' },
		{ title: NavBar.contact, to: '/contact', icon: 'i-carbon-email' }
	];

	function toggleLanguage() {
		if ($locale?.includes('en')) {
			locale.set('ja');
		} else {
			locale.set('en');
		}
	}

	let isOpen = false;

	function toggleMenu() {
		isOpen = !isOpen;
	}

	const mobileItems = [{ title: HOME.name, to: '/', icon: 'i-carbon-home' }, ...items];
</script>

<div class="nav-menu">
	<nav class="container !justify-between flex flex-row items-center text-sm">
		<Chip
			classes="hidden md:flexinline-flex items-center !text-[var(--secondary-text)] rainbow-hover gap-2 md:inline-flex hidden"
			onClick={(e) => handleNavigation(e, '/')}
			newTab={false}
			borderRadius="0px"
			hideBorder={true}
		>
			<UIcon icon="i-carbon-code" classes="text-1.3em md:text-1.5em" alt="home" />
			<span class="nav-menu-item-label nav-brand hidden md:inline"
				>{$_(HOME.name)} {$_(HOME.lastName)}</span
			>
		</Chip>

		<div class="md:hidden flex items-center">
			<button class="mobile-menu-button" onclick={toggleMenu}>
				<UIcon icon="i-carbon-menu" classes="text-1.5em" alt="Menu" />
			</button>
		</div>

		<div class="hidden md:flex flex-row flex-1 self-center justify-center gap-2">
			{#each items as item}
				<Chip
					classes="inline-flex items-center !text-[var(--secondary-text)] rainbow-hover"
					onClick={(e) => handleNavigation(e, item.to)}
					newTab={false}
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
				class="bg-transparent text-1em border-none cursor: pointer; text-[var(--secondary-text)] px-2 rainbow-hover"
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
				class="bg-transparent text-1em border-none cursor: pointer; text-[var(--secondary-text)] px-2 rainbow-hover"
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

	{#if isOpen}
		<div class="mobile-menu md:hidden">
			{#each mobileItems as item}
				<a
					href={item.to}
					class="mobile-menu-item"
					onclick={(event) => {
						isOpen = false;
						handleNavigation(event, item.to);
					}}
				>
					<UIcon icon={item.icon} classes="text-1.3em mr-2" alt={$_(item.title)} />
					<span
						>{item.title === HOME.name
							? $_(item.title) + ' ' + $_(HOME.lastName)
							: $_(item.title)}</span
					>
				</a>
			{/each}
		</div>
	{/if}
</div>

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
		font-family: var(--text-f);
		font-weight: var(--fw-medium);
		letter-spacing: var(--ls-wide);
		font-size: var(--fs-sm);

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

	.nav-brand {
		font-family: var(--title-f);
		font-weight: var(--fw-medium);
		letter-spacing: var(--ls-normal);
		font-size: var(--fs-base);
	}

	.mobile-menu {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background-color: var(--main);
		border-bottom: 1px solid var(--secondary);
		padding: 10px;
		z-index: 10;

		&-item {
			display: flex;
			align-items: center;
			padding: 10px;
			color: var(--secondary-text);
			text-decoration: none;

			&:hover {
				background-color: var(--secondary);
			}
		}
	}

	.mobile-menu-button {
		background-color: transparent;
		border: none;
		color: var(--secondary-text);
		cursor: pointer;
		padding: 5px;
	}
</style>
