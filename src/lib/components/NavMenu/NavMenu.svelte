<script lang="ts">
	import { page } from '$app/stores';
	import { HOME, NavBar } from '$lib/params';
	import { theme, toggleTheme } from '$lib/stores/theme';

	import { base } from '$app/paths';
	import UIcon from '../Icon/UIcon.svelte';
	import { _ } from 'svelte-i18n';
	import { locale } from 'svelte-i18n';

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
		{ title: NavBar.resume, to: '/resume', icon: 'i-carbon-result' }
	];
</script>

<div class="nav-menu">
	<nav class="container !justify-between flex flex-row items-center text-sm">
		<a
			href={`${base}/`}
			class="nav-menu-left decoration-none flex flex-row items-center cursor-pointer s:px-2 md:px-4 text-[var(--secondary-text)] hover:bg-[color:var(--main-hover)]  "
		>
			<UIcon icon="i-carbon-code" classes="text-2em" alt="home" />
			<span class="ml-2 text-md font-bold hidden md:inline"
				>{$_(HOME.name)} {$_(HOME.lastName)}</span
			>
		</a>

		<div class="flex flex-row flex-1 self-center justify-center md:gap-2">
			{#each items as item}
				<a
					href={`${base}${item.to}`}
					class="nav-menu-item !text-[var(--secondary-text)]"
					style="position: relative;"
				>
					<UIcon icon={item.icon} classes="text-1.3em" alt={$_(item.title)} />
					<span class="nav-menu-item-label">{$_(item.title)}</span>
					<div class="shimmer-overlay" />
				</a>
			{/each}
		</div>
		<div class="flex flex-row items-stretch gap-1 text-1.15em">
			<a href={`${base}/search`} class="text-inherit col-center self-stretch px-2">
				<UIcon icon="i-carbon-search" alt="search" />
			</a>
			<button
				class="bg-transparent text-1em border-none cursor-pointer text-[var(--secondary-text)] px-2"
				on:click={() => toggleTheme($theme === 'dark' ? 'light' : 'dark')}
			>
				{#if $theme === 'light'}
					<UIcon icon="i-carbon-moon" alt="light Theme" />
				{:else}
					<UIcon icon="i-carbon-sun" alt="Dark Theme" />
				{/if}
			</button>
			<button
				class="bg-transparent text-1em border-none cursor-pointer text-[var(--secondary-text)] px-2"
				on:click={() => toggleLanguage()}
				aria-label="Change language"
			>
				{#if $locale?.includes('en')}
					<span class="text-xs" aria-label="Japanese">JA</span>
				{:else}
					<span class="text-xs" aria-label="English">EN</span>
				{/if}
			</button>
		</div>
	</nav>
</div>

<style lang="scss">
	@media (max-width: 600px) {
		.shimmer-overlay {
			display: none;
		}
	}
	.shimmer-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			to right,
			#ff0000,
			#ff8000,
			#ffff00,
			#80ff00,
			#00ff00,
			#00ff80,
			#00ffff,
			#0080ff,
			#0000ff,
			#8000ff,
			#ff00ff,
			#ff0080
		);
		border-radius: 10px;
		background-size: 300% 100%;
		animation: shimmer 4s infinite;
		opacity: 0; /* Initially hidden */
		pointer-events: none; /* Allow hover events to pass through */
		transition: opacity 0.6s ease-in-out; /* Smooth transition */
	}

	/* Shimmer animation */
	@keyframes shimmer {
		0% {
			background-position: 100% 0;
		}
		100% {
			background-position: -100% 0;
		}
	}

	/* Show shimmer overlay on hover */
	.nav-menu-item:hover .shimmer-overlay {
		opacity: 0.5;
	}

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

			&:hover {
				background-color: var(--main-hover);
			}
		}
	}
</style>
