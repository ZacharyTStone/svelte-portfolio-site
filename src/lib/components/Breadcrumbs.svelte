<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import UIcon from './Icon/UIcon.svelte';

	interface BreadcrumbItem {
		label: string;
		href: string;
	}

	interface PageDataWithItem {
		skill?: { name: string };
		project?: { name: string };
		experience?: { name: string };
	}

	// Define NAVBAR as a top-level constant before any reactive statements
	const NAVBAR = {
		home: 'NAVBAR.home',
		about: 'NAVBAR.about',
		personal: 'NAVBAR.personal',
		skills: 'NAVBAR.skills',
		career: 'NAVBAR.career',
		contact: 'NAVBAR.contact',
		search: 'NAVBAR.search'
	} as const;

	// Safe translation function that handles SSR
	function safeTranslate(key: string): string {
		if (!browser) {
			// During SSR, return a fallback
			return key.split('.').pop() || key;
		}
		try {
			return $_(key);
		} catch {
			return key.split('.').pop() || key;
		}
	}

	let breadcrumbs: BreadcrumbItem[] = $derived.by(() => {
		const pathname = $page.url.pathname;
		const segments = pathname.split('/').filter(Boolean);
		const items: BreadcrumbItem[] = [{ label: safeTranslate(NAVBAR.home), href: `${base}/` }];

		if (segments.length === 0) {
			return items.slice(0, 1); // Just home
		}

		let currentPath = '';
		segments.forEach((segment, index) => {
			currentPath += `/${segment}`;
			const isLast = index === segments.length - 1;

			// Get label from route or segment
			let label = segment;
			if (segment === 'about') label = safeTranslate(NAVBAR.about);
			else if (segment === 'projects') label = safeTranslate(NAVBAR.personal);
			else if (segment === 'skills') label = safeTranslate(NAVBAR.skills);
			else if (segment === 'experience') label = safeTranslate(NAVBAR.career);
			else if (segment === 'contact') label = safeTranslate(NAVBAR.contact);
			else if (segment === 'search') label = safeTranslate(NAVBAR.search);
			else {
				// For dynamic routes, try to get the actual name from page data
				try {
					const pageData = $page.data as PageDataWithItem;
					if (isLast && pageData) {
						// Check for skill, project, or experience data
						if (pageData.skill?.name) {
							label = safeTranslate(pageData.skill.name);
						} else if (pageData.project?.name) {
							label = safeTranslate(pageData.project.name);
						} else if (pageData.experience?.name) {
							label = safeTranslate(pageData.experience.name);
						} else {
							// Fallback: capitalize first letter
							label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
						}
					} else {
						// For non-last segments, capitalize first letter
						label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
					}
				} catch (e) {
					// Fallback if page data access fails
					label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
				}
			}

			if (!isLast) {
				items.push({ label, href: `${base}${currentPath}` });
			} else {
				items.push({ label, href: '' }); // Current page, no link
			}
		});

		return items;
	});

	function handleClick(href: string, event: MouseEvent) {
		if (href) {
			event.preventDefault();
			goto(href);
		}
	}
</script>

{#if breadcrumbs.length > 1}
	<nav class="breadcrumbs" aria-label="Breadcrumb">
		<ol class="breadcrumbs-list">
			{#each breadcrumbs as crumb, index}
				<li class="breadcrumb-item">
					{#if crumb.href && index < breadcrumbs.length - 1}
						<a
							href={crumb.href}
							onclick={(e) => handleClick(crumb.href, e)}
							class="breadcrumb-link"
						>
							{crumb.label}
						</a>
					{:else}
						<span class="breadcrumb-current" aria-current="page">{crumb.label}</span>
					{/if}
					{#if index < breadcrumbs.length - 1}
						<span class="breadcrumb-separator">
							<UIcon icon="i-carbon-chevron-right" />
						</span>
					{/if}
				</li>
			{/each}
		</ol>
	</nav>
{/if}

<style>
	.breadcrumbs {
		margin: var(--space-md) 0;
		padding: 0 var(--space-md);
	}

	.breadcrumbs-list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-xs);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.breadcrumb-item {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
	}

	.breadcrumb-link {
		color: var(--secondary-text);
		text-decoration: none;
		font-size: var(--fs-sm);
		transition: color 0.2s ease;
		padding: 2px 4px;
		border-radius: var(--radius-sm);
	}

	.breadcrumb-link:hover {
		color: var(--accent-text);
		background-color: var(--secondary);
	}

	.breadcrumb-link:focus-visible {
		outline: 2px solid var(--accent-text);
		outline-offset: 2px;
	}

	.breadcrumb-current {
		color: var(--accent-text);
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
	}

	.breadcrumb-separator {
		color: var(--tertiary-text);
		font-size: var(--fs-xs);
		margin: 0 var(--space-xs);
	}

	@media (max-width: 768px) {
		.breadcrumbs {
			padding: 0 var(--space-sm);
		}

		.breadcrumb-link,
		.breadcrumb-current {
			font-size: var(--fs-xs);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.breadcrumb-link {
			transition: none;
		}
	}
</style>
