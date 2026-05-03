<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { HOME, NavBar } from '$lib/params';
	import { activeSection } from '$lib/stores/activeSection';
	import { theme, ThemeType, toggleTheme } from '$lib/stores/theme';
	import { FocusTrap } from '$lib/utils/keyboard';

	import { _, locale } from 'svelte-i18n';
	import UIcon from '../Icon/UIcon.svelte';

	interface NavItem {
		title: string;
		to: string; // anchor (#id) or route (/path)
		icon: string;
		matchId?: string; // section id matched against activeSection (anchor items only)
	}

	const items: NavItem[] = [
		{ title: NavBar.about, to: '#about', icon: 'i-carbon-user', matchId: 'about' },
		{ title: NavBar.career, to: '#experience', icon: 'i-carbon-development', matchId: 'experience' },
		{ title: NavBar.personal, to: '#projects', icon: 'i-carbon-cube', matchId: 'projects' },
		{
			title: NavBar.skills,
			to: '#skills',
			icon: 'i-carbon-software-resource-cluster',
			matchId: 'skills'
		},
		{ title: NavBar.resume, to: '/resume', icon: 'i-carbon-document' },
		{ title: NavBar.contact, to: '#contact', icon: 'i-carbon-email', matchId: 'contact' }
	];

	function toggleLanguage(): void {
		if ($locale?.includes('en')) {
			locale.set('ja');
		} else {
			locale.set('en');
		}
	}

	let isOpen = $state(false);
	let mobileMenuElement: HTMLElement | null = $state(null);
	let focusTrap: FocusTrap | null = null;

	let pathname = $derived(page.url.pathname);
	let onHome = $derived(pathname === '/' || pathname === `${base}/` || pathname === base);

	function isItemActive(item: NavItem): boolean {
		if (item.to.startsWith('#')) {
			return onHome && item.matchId === $activeSection;
		}
		return pathname === item.to || pathname === `${base}${item.to}`;
	}

	function resolveHref(to: string): string {
		if (to.startsWith('#')) {
			if (onHome) return to;
			const frag = to.slice(1);
			return base ? `${base}/#${frag}` : `/#${frag}`;
		}
		return `${base}${to}`;
	}

	function toggleMenu(): void {
		isOpen = !isOpen;
	}

	function closeMenu(): void {
		isOpen = false;
		if (focusTrap) {
			focusTrap.destroy();
			focusTrap = null;
		}
	}

	$effect(() => {
		if (isOpen && mobileMenuElement) {
			focusTrap = new FocusTrap(mobileMenuElement);
		} else if (focusTrap) {
			focusTrap.destroy();
			focusTrap = null;
		}
	});

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMenu();
		}
		if (isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
			event.preventDefault();
			const menuItems = document.querySelectorAll('.mobile-menu .nav-link');
			const currentIndex = Array.from(menuItems).findIndex(
				(item) => item === document.activeElement
			);
			let nextIndex: number;

			if (event.key === 'ArrowDown') {
				nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
			} else {
				nextIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
			}

			(menuItems[nextIndex] as HTMLElement)?.focus();
		}
	}

	function handleThemeToggle(): void {
		const newTheme = $theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK;
		toggleTheme(newTheme);
	}
</script>

<div class="nav-menu">
	<nav class="container nav-bar">
		<a href={onHome ? '#hero' : `${base}/`} class="nav-brand-link" aria-label={$_(NavBar.home)}>
			<UIcon icon="i-carbon-code" classes="text-1.4em" alt="" />
			<span class="nav-brand">{$_(HOME.name)} {$_(HOME.lastName)}</span>
		</a>

		<button
			class="mobile-menu-button md:hidden"
			onclick={toggleMenu}
			aria-expanded={isOpen}
			aria-controls="mobile-menu"
			aria-label={$_(NavBar.toggle_menu)}
		>
			<UIcon
				icon={isOpen ? 'i-carbon-close' : 'i-carbon-menu'}
				classes="text-1.5em"
				alt=""
			/>
		</button>

		<ul class="hidden md:flex nav-list" role="list">
			{#each items as item}
				{@const active = isItemActive(item)}
				<li>
					<a
						href={resolveHref(item.to)}
						class="nav-link"
						class:active
						aria-current={active ? 'true' : undefined}
					>
						<span class="nav-link-text">{$_(item.title)}</span>
					</a>
				</li>
			{/each}
		</ul>

		<div class="nav-actions">
			<a href="{base}/search" class="nav-action" aria-label={$_(NavBar.search)}>
				<UIcon icon="i-carbon-search" alt="" />
			</a>
			<button
				class="nav-action"
				onclick={handleThemeToggle}
				aria-label={$_($theme === ThemeType.LIGHT ? NavBar.darkMode : NavBar.lightMode)}
			>
				{#if $theme === ThemeType.LIGHT}
					<UIcon icon="i-carbon-moon" alt="" />
				{:else}
					<UIcon icon="i-carbon-sun" alt="" />
				{/if}
			</button>
			<button
				class="nav-action"
				onclick={toggleLanguage}
				aria-label={$_($locale?.includes('en') ? NavBar.japanese : NavBar.english)}
			>
				{#if $locale?.includes('en')}
					<UIcon icon="i-flag-jp-4x3" classes="text-1.2em" alt="" />
				{:else}
					<UIcon icon="i-flag-us-4x3" classes="text-1.2em" alt="" />
				{/if}
			</button>
		</div>
	</nav>

	{#if isOpen}
		<div
			class="mobile-menu-backdrop"
			onclick={closeMenu}
			onkeydown={(e) => {
				if (e.key === 'Escape') closeMenu();
			}}
			role="button"
			tabindex="-1"
			aria-label={$_(NavBar.close_menu)}
		></div>
		<div
			id="mobile-menu"
			bind:this={mobileMenuElement}
			class="mobile-menu open"
			role="menu"
			aria-hidden={!isOpen}
			onkeydown={handleKeyDown}
		>
			<ul class="mobile-nav-list" role="menubar">
				{#each items as item}
					{@const active = isItemActive(item)}
					<li role="none">
						<a
							href={resolveHref(item.to)}
							class="nav-link mobile-link"
							class:active
							role="menuitem"
							aria-current={active ? 'true' : undefined}
							onclick={closeMenu}
						>
							<UIcon icon={item.icon} alt="" />
							<span>{$_(item.title)}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style lang="scss">
	.nav-menu {
		position: sticky;
		top: 0;
		z-index: 50;
		background-color: var(--secondary-opaque);
		backdrop-filter: blur(14px) saturate(160%);
		-webkit-backdrop-filter: blur(14px) saturate(160%);
		border-bottom: 1px solid var(--border);
		font-family: var(--text-f);
		height: var(--nav-h);
		display: flex;
		align-items: center;
	}

	.nav-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;
	}

	.nav-brand-link {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		text-decoration: none;
		color: var(--main-text);
		font-family: var(--title-f);
		font-weight: var(--fw-medium);
		font-size: var(--fs-base);
		letter-spacing: var(--ls-normal);
		transition: color 180ms ease;
	}

	.nav-brand-link:hover {
		color: var(--accent-electric);
	}

	.nav-brand {
		display: none;
	}

	@media (min-width: 700px) {
		.nav-brand {
			display: inline;
		}
	}

	.nav-list {
		display: flex;
		gap: 0.25rem;
		list-style: none;
		padding: 0;
		margin: 0;
		flex: 1;
		justify-content: center;
	}

	.nav-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		padding: 0.55em 0.95em;
		color: var(--secondary-text);
		text-decoration: none;
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-wide);
		text-transform: uppercase;
		border-radius: var(--radius-sm);
		transition: color 180ms ease, background-color 180ms ease;
	}

	.nav-link:hover {
		color: var(--main-text);
		background-color: var(--hover);
	}

	.nav-link.active {
		color: var(--accent-electric);
	}

	.nav-link.active::before {
		content: '';
		display: inline-block;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--accent-electric);
		box-shadow: 0 0 6px var(--accent-electric-glow);
	}

	.nav-actions {
		display: none;
		align-items: center;
		gap: 0.25rem;
	}

	@media (min-width: 768px) {
		.nav-actions {
			display: flex;
		}
	}

	.nav-action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		padding: 0;
		border: none;
		background: transparent;
		color: var(--secondary-text);
		cursor: pointer;
		border-radius: var(--radius-sm);
		text-decoration: none;
		transition: color 180ms ease, background-color 180ms ease;
	}

	.nav-action:hover {
		color: var(--accent-electric);
		background-color: var(--hover);
	}

	.mobile-menu-button {
		background: transparent;
		border: none;
		color: var(--main-text);
		cursor: pointer;
		padding: 6px;
		display: none;
	}

	@media (max-width: 767px) {
		.mobile-menu-button {
			display: inline-flex;
		}
	}

	.mobile-menu-backdrop {
		position: fixed;
		inset: var(--nav-h) 0 0 0;
		background: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(4px);
		z-index: 40;
		opacity: 0;
		animation: fadeIn 0.2s ease-out forwards;
	}

	.mobile-menu {
		position: fixed;
		top: var(--nav-h);
		left: 0;
		right: 0;
		background: var(--main);
		border-bottom: 1px solid var(--border);
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
		padding: 0.75rem;
		z-index: 50;
		max-height: calc(100dvh - var(--nav-h));
		overflow-y: auto;
		animation: slideDown 0.22s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.mobile-nav-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.mobile-link {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.85rem 1rem;
		font-size: var(--fs-sm);
		text-transform: none;
		letter-spacing: var(--ls-normal);
		font-family: var(--text-f);
		color: var(--main-text);
		border-radius: var(--radius-md);
	}

	.mobile-link.active {
		background-color: var(--accent-electric-soft);
		color: var(--accent-electric);
	}

	.mobile-link.active::before {
		display: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.mobile-menu,
		.mobile-menu-backdrop {
			animation: none !important;
		}
		.nav-link,
		.nav-action,
		.nav-brand-link {
			transition: none !important;
		}
	}
</style>
