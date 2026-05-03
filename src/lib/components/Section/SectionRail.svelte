<script lang="ts">
	import { browser } from '$app/environment';
	import { activeSection, SPA_SECTION_IDS } from '$lib/stores/activeSection';
	import { _ } from 'svelte-i18n';

	interface RailItem {
		id: string;
		labelKey: string;
	}

	const items: RailItem[] = [
		{ id: 'hero', labelKey: 'RAIL.intro' },
		{ id: 'about', labelKey: 'RAIL.about' },
		{ id: 'experience', labelKey: 'RAIL.experience' },
		{ id: 'projects', labelKey: 'RAIL.work' },
		{ id: 'skills', labelKey: 'RAIL.skills' },
		{ id: 'contact', labelKey: 'RAIL.contact' }
	];

	function safeT(key: string): string {
		if (!browser) return key.split('.').pop() || key;
		try {
			return $_(key);
		} catch {
			return key.split('.').pop() || key;
		}
	}

	function scrollTo(id: string, e: MouseEvent) {
		e.preventDefault();
		const target = document.getElementById(id);
		if (target) {
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			history.replaceState(null, '', `#${id}`);
		}
	}
</script>

<nav class="section-rail" aria-label={safeT('COMMON.section_navigation')}>
	<ul class="rail-list">
		{#each items as item}
			{@const active = $activeSection === item.id}
			<li>
				<a
					href="#{item.id}"
					class="rail-link"
					class:active
					aria-current={active ? 'true' : undefined}
					onclick={(e) => scrollTo(item.id, e)}
				>
					<span class="rail-dot" aria-hidden="true"></span>
					<span class="rail-label">{safeT(item.labelKey)}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	.section-rail {
		position: fixed;
		top: 50%;
		right: clamp(0.75rem, 2vw, 1.5rem);
		transform: translateY(-50%);
		z-index: 30;
		pointer-events: none;
	}

	.rail-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		pointer-events: auto;
	}

	.rail-link {
		position: relative;
		display: inline-flex;
		align-items: center;
		padding: 0.4rem 0.5rem;
		text-decoration: none;
		color: var(--secondary-text);
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-wide);
		text-transform: uppercase;
		border-radius: var(--radius-sm);
		opacity: 0.55;
		transition: opacity 220ms ease, color 220ms ease, transform 220ms ease;
	}

	.rail-link:hover {
		opacity: 1;
		color: var(--main-text);
	}

	.rail-link.active {
		opacity: 1;
		color: var(--accent-electric);
	}

	.rail-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		border: 1px solid var(--secondary-text);
		background: transparent;
		transition: all 220ms cubic-bezier(0.16, 1, 0.3, 1);
		flex: 0 0 8px;
	}

	.rail-link:hover .rail-dot {
		border-color: var(--main-text);
	}

	.rail-link.active .rail-dot {
		background: var(--accent-electric);
		border-color: var(--accent-electric);
		box-shadow: 0 0 12px var(--accent-electric-glow);
		transform: scale(1.25);
	}

	.rail-label {
		position: absolute;
		right: calc(100% - 0.5rem);
		white-space: nowrap;
		pointer-events: none;
		opacity: 0;
		transform: translateX(8px);
		transition: opacity 220ms ease, transform 220ms ease;
	}

	.rail-link:hover .rail-label,
	.rail-link.active .rail-label {
		opacity: 1;
		transform: translateX(0);
	}

	@media (max-width: 900px) {
		.section-rail {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.rail-link,
		.rail-dot,
		.rail-label {
			transition: none !important;
		}
	}
</style>
