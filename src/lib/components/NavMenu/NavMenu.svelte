<script lang="ts">
	import { page } from '$app/stores';
	import { HOME, NavBar } from '$lib/params';
	import { theme, toggleTheme, ThemeType } from '$lib/stores/theme';
	import { handleNavigation } from '$lib/utils/helpers';
	import { base } from '$app/paths';

	import { _, locale } from 'svelte-i18n';
	import Chip from '../Chip/Chip.svelte';
	import UIcon from '../Icon/UIcon.svelte';
	import Icon from '../Icon/Icon.svelte';

	interface NavItem {
		title: string;
		to: string;
		icon: string;
	}

	const items: NavItem[] = [
		{ title: NavBar.about, to: '/about', icon: 'i-carbon-user' },
		{ title: NavBar.skills, to: '/skills', icon: 'i-carbon-software-resource-cluster' },
		{ title: NavBar.personal, to: '/projects', icon: 'i-carbon-cube' },
		{ title: NavBar.career, to: '/experience', icon: 'i-carbon-development' },
		{ title: NavBar.contact, to: '/contact', icon: 'i-carbon-email' }
	];

	function toggleLanguage(): void {
		if ($locale?.includes('en')) {
			locale.set('ja');
		} else {
			locale.set('en');
		}
	}

	let isOpen = $state(false);
	let activeSection = $state('');

	$effect(() => {
		activeSection = $page.url.pathname;
	});

	function toggleMenu(): void {
		isOpen = !isOpen;
	}

	function closeMenu(): void {
		isOpen = false;
	}

	// Close menu on Escape key press
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
			closeMenu();
		}
	}

	function handleItemClick(event: Event, item: NavItem): void {
		isOpen = false;
		handleNavigation(event, item.to);
	}

	function handleThemeToggle(): void {
		toggleTheme($theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK);
	}

	const mobileItems: NavItem[] = [{ title: HOME.name, to: '/', icon: 'i-carbon-home' }, ...items];
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
			<button
				class="mobile-menu-button"
				onclick={toggleMenu}
				aria-expanded={isOpen}
				aria-controls="mobile-menu"
				aria-label="Toggle menu"
			>
				<UIcon icon="i-carbon-menu" classes="text-[var(--accent-text)] text-1.5em" alt="Menu" />
			</button>
		</div>

		<div class="hidden md:flex flex-row flex-1 self-center justify-center gap-2">
			{#each items as item}
				<Chip
					classes="inline-flex items-center !text-[var(--secondary-text)] rainbow-hover nav-item"
					onClick={(e) => handleNavigation(e, item.to)}
					newTab={false}
					borderRadius="0px"
					hideBorder={true}
				>
					<UIcon icon={item.icon} classes="text-1.3em md:text-1.5em" alt={$_(item.title)} />
					<span class="nav-menu-item-label hidden md:inline nav-text">{$_(item.title)}</span>
				</Chip>
			{/each}
		</div>

		<div class="flex flex-row items-stretch gap-1 text-1.15em">
			<a href={`${base}/search`} class="text-inherit col-center self-stretch px-2 rainbow-hover">
				<UIcon icon="i-carbon-search" alt="search" tooltip={$_(NavBar.search)} />
			</a>
			<button
				class="bg-transparent text-1em border-none cursor: pointer; text-[var(--secondary-text)] px-2 rainbow-hover"
				onclick={handleThemeToggle}
				aria-label={$_($theme === ThemeType.LIGHT ? NavBar.lightMode : NavBar.darkMode)}
			>
				{#if $theme === ThemeType.LIGHT}
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
		<div
			id="mobile-menu"
			class="mobile-menu {isOpen ? 'open' : ''}"
			role="menu"
			aria-hidden={!isOpen}
			onkeydown={handleKeyDown}
		>
			<ul class="nav-links" role="menubar">
				<li class="nav-item" role="none">
					<a
						href="/"
						class="nav-link {activeSection === '/' ? 'active' : ''}"
						role="menuitem"
						aria-current={activeSection === '/' ? 'page' : undefined}
						onclick={closeMenu}
					>
						<UIcon icon="i-carbon-home" alt="Home icon" />
						<span>{$_('NAVBAR.home')}</span>
					</a>
				</li>
				<li class="nav-item" role="none">
					<a
						href="/projects"
						class="nav-link {activeSection === '/projects' ? 'active' : ''}"
						role="menuitem"
						aria-current={activeSection === '/projects' ? 'page' : undefined}
						onclick={closeMenu}
					>
						<UIcon icon="i-carbon-code" alt="Projects icon" />
						<span>{$_('NAVBAR.personal')}</span>
					</a>
				</li>
				<li class="nav-item" role="none">
					<a
						href="/about"
						class="nav-link {activeSection === '/about' ? 'active' : ''}"
						role="menuitem"
						aria-current={activeSection === '/about' ? 'page' : undefined}
						onclick={closeMenu}
					>
						<UIcon icon="i-carbon-user" alt="About icon" />
						<span>{$_('NAVBAR.about')}</span>
					</a>
				</li>
				<li class="nav-item" role="none">
					<a
						href="/experience"
						class="nav-link {activeSection === '/experience' ? 'active' : ''}"
						role="menuitem"
						aria-current={activeSection === '/experience' ? 'page' : undefined}
						onclick={closeMenu}
					>
						<UIcon icon="i-carbon-development" alt="Experience icon" />
						<span>{$_('NAVBAR.career')}</span>
					</a>
				</li>
				<li class="nav-item" role="none">
					<a
						href="/contact"
						class="nav-link {activeSection === '/contact' ? 'active' : ''}"
						role="menuitem"
						aria-current={activeSection === '/contact' ? 'page' : undefined}
						onclick={closeMenu}
					>
						<UIcon icon="i-carbon-email" alt="Contact icon" />
						<span>{$_('NAVBAR.contact')}</span>
					</a>
				</li>
			</ul>
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

		&-item-label {
			margin-left: 10px;

			@media (max-width: 950px) {
				& {
					display: none;
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
	}

	.mobile-menu-button {
		background-color: transparent;
		border: none;
		color: var(--secondary-text);
		cursor: pointer;
		padding: 5px;
	}

	.nav-links {
		display: flex;
		gap: 1rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.nav-item {
		position: relative;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
		color: var(--secondary-text);
		text-decoration: none;
		border-radius: 0.5rem;
		transition: all 0.2s ease;
	}

	.nav-link:hover {
		background-color: var(--hover);
		transform: translateY(-2px);
	}

	.nav-link.active {
		background-color: var(--active);
		color: var(--accent-text);
		font-weight: var(--fw-medium);
	}

	.nav-link span {
		font-size: 1rem;
	}

	@media (max-width: 768px) {
		.mobile-menu-button {
			display: block;
		}

		.mobile-menu {
			position: absolute;
			top: 100%;
			right: 0;
			width: 200px;
			background-color: var(--main);
			border: 1px solid var(--secondary);
			border-radius: 8px;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
			opacity: 0;
			transform: translateY(-10px);
			pointer-events: none;
			transition: all 0.25s ease-out;
			z-index: 1000;
			margin-top: 4px;
			margin-right: 8px;
			overflow: hidden;
		}

		.mobile-menu.open {
			opacity: 1;
			transform: translateY(0);
			pointer-events: all;
		}

		.nav-links {
			flex-direction: column;
			width: 100%;
			padding: 8px;
			gap: 0;
		}

		.nav-item {
			width: 100%;
		}

		.nav-link {
			padding: 10px;
			font-size: 1rem;
			width: 100%;
			display: flex;
			justify-content: flex-start;
			border-radius: 6px;
			margin: 2px 0;
		}

		.nav-link span {
			font-size: 0.9rem;
		}
	}
</style>
