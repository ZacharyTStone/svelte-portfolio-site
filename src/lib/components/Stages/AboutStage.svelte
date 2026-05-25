<script lang="ts">
	import { browser } from '$app/environment';
	import GitHubContributions from '$lib/components/GitHubContributions/GitHubContributions.svelte';
	import { onIdle, prefersReducedMotion, setupReveals } from '$lib/utils/motion';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	let sectionEl: HTMLElement | undefined = $state();
	let revealEls: HTMLElement[] = [];
	let mounted = $state(false);

	function safeT(key: string): string {
		if (!browser) return key.split('.').pop() || key;
		try {
			return $_(key);
		} catch {
			return key.split('.').pop() || key;
		}
	}

	const factKeys = [
		{ k: 'ABOUT.fact_based_in', v: 'ABOUT.fact_based_in_value' },
		{ k: 'ABOUT.fact_language', v: 'ABOUT.fact_language_value' },
		{ k: 'ABOUT.fact_timezones', v: 'ABOUT.fact_timezones_value' }
	];

	const achievementStats: Array<{
		num: number | null;
		suffix?: string;
		value?: string;
		label: string;
		sub: string;
	}> = [
		{ num: 110, suffix: '/100', label: 'MDN Security Score', sub: 'lifted from 25/100 (D−)' },
		{ num: 50, suffix: 'kB', label: 'JS Bundle Saved', sub: 'gzip · barrel import cleanup' },
		{ num: 15, suffix: ' min', label: 'CI/CD Feedback Loop', sub: 'was: manual weekly QA' },
		{ num: null, value: 'Days → Min', label: 'Mean Time to Resolve', sub: 'Sentry + PagerDuty overhaul' }
	];

	function animateCount(el: HTMLElement, target: number, suffix: string, duration = 1200) {
		if (prefersReducedMotion()) {
			el.textContent = target + suffix;
			return;
		}
		const start = performance.now();
		const tick = (now: number) => {
			const p = Math.min((now - start) / duration, 1);
			const eased = 1 - Math.pow(1 - p, 3);
			el.textContent = Math.round(eased * target) + suffix;
			if (p < 1) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	}

	onMount(() => {
		mounted = true;
		let cleanupReveals: (() => void) | null = null;
		let statsObserver: IntersectionObserver | null = null;

		const cancel = onIdle(() => {
			const els = revealEls.filter(Boolean);
			if (els.length > 0) {
				setupReveals(els, { stagger: 90, distance: 32, duration: 760 }).then((cleanup) => {
					cleanupReveals = cleanup;
				});
			}

			// Trigger number counters when the stats block enters view
			if (typeof IntersectionObserver !== 'undefined') {
				statsObserver = new IntersectionObserver(
					(entries) => {
						for (const entry of entries) {
							if (!entry.isIntersecting) continue;
							entry.target.querySelectorAll('[data-count-to]').forEach((el) => {
								const htmlEl = el as HTMLElement;
								const target = parseInt(htmlEl.dataset.countTo ?? '0', 10);
								const suffix = htmlEl.dataset.suffix ?? '';
								animateCount(htmlEl, target, suffix);
							});
							statsObserver?.unobserve(entry.target);
						}
					},
					{ threshold: 0.4 }
				);
				const statsEl = revealEls[2];
				if (statsEl) statsObserver.observe(statsEl);
			}
		});

		return () => {
			cancel();
			cleanupReveals?.();
			statsObserver?.disconnect();
		};
	});
</script>

<section bind:this={sectionEl} id="about" class="about-stage" aria-labelledby="about-heading">
	<div class="about-grid">
		<!-- Sticky stencil mark on left -->
		<aside class="about-mark" aria-hidden="true">
			<div class="about-mark-inner">
				<span class="about-mark-num">01</span>
				<span class="about-mark-label">{safeT('NAVBAR.about')}</span>
				<span class="about-mark-line"></span>
				<span class="about-mark-meta">{@html safeT('ABOUT.mark_meta')}</span>
			</div>
		</aside>

		<!-- Right column: oversized headline + callout cards -->
		<div class="about-content">
			<h2 bind:this={revealEls[0]} id="about-heading" class="about-heading">
				{safeT('ABOUT.heading_prefix')}
				<span class="accent">{safeT('ABOUT.heading_complex_systems')}</span>
				{safeT('ABOUT.heading_and_ship_with')}
				<span class="accent">{safeT('ABOUT.heading_observability')}</span>,
				<span class="accent">{safeT('ABOUT.heading_velocity')}</span>,
				{safeT('ABOUT.heading_and')}
				<span class="accent">{safeT('ABOUT.heading_reliability')}</span>{safeT('ABOUT.heading_period')}
			</h2>

			<div bind:this={revealEls[1]} class="about-paragraph">
				{safeT('ABOUT.full_about')}
			</div>

			<!-- Achievement stats -->
			<div bind:this={revealEls[2]} class="about-stats">
				{#each achievementStats as stat, i}
					<div class="stat-card" style="--stat-i: {i}">
						<div class="stat-value">
							{#if stat.num !== null}
								<span data-count-to="{stat.num}" data-suffix="{stat.suffix ?? ''}">0{stat.suffix}</span>
							{:else}
								<span>{stat.value}</span>
							{/if}
						</div>
						<div class="stat-label">{stat.label}</div>
						<div class="stat-sub">{stat.sub}</div>
					</div>
				{/each}
			</div>

			<dl bind:this={revealEls[3]} class="about-facts">
				{#each factKeys as fact}
					<div class="fact">
						<dt class="fact-k">{safeT(fact.k)}</dt>
						<dd class="fact-v">{safeT(fact.v)}</dd>
					</div>
				{/each}
			</dl>

			{#if mounted}
				<div bind:this={revealEls[4]} class="about-graph">
					<div class="about-graph-header">
						<span class="mono-eyebrow">{safeT('ABOUT.github_label')}</span>
						<span class="about-graph-sub">{safeT('ABOUT.github_subtitle')}</span>
					</div>
					<GitHubContributions username="ZacharyTStone" weeks={26} title="" />
				</div>
			{/if}
		</div>
	</div>
</section>

<style lang="scss">
	.about-stage {
		position: relative;
		padding-block: clamp(3.5rem, 8vh, 6rem) clamp(4rem, 10vh, 7rem);
		scroll-margin-top: var(--scroll-anchor-offset);
	}

	.about-grid {
		display: grid;
		grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.6fr);
		gap: clamp(2rem, 6vw, 5rem);
		max-width: 1400px;
		margin: 0 auto;
		padding-inline: clamp(1rem, 5vw, 6rem);
		align-items: start;
		min-width: 0;
	}

	/* Sticky stencil mark ─────────────────── */
	.about-mark {
		position: sticky;
		top: calc(var(--nav-h) + 4vh);
	}

	.about-mark-inner {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: flex-start;
	}

	.about-mark-num {
		font-family: var(--mono-f);
		font-size: clamp(3rem, 7vw, 6rem);
		font-weight: var(--fw-light);
		line-height: 0.9;
		letter-spacing: -0.04em;
		color: transparent;
		-webkit-text-stroke: 1.5px var(--accent-electric);
		text-stroke: 1.5px var(--accent-electric);
		opacity: 0.85;
	}

	.about-mark-label {
		font-family: var(--mono-f);
		font-size: var(--fs-sm);
		letter-spacing: var(--ls-widest);
		text-transform: uppercase;
		color: var(--accent-electric);
	}

	.about-mark-line {
		display: inline-block;
		width: 40px;
		height: 1px;
		background: var(--accent-electric);
		margin-block: 0.75rem;
	}

	.about-mark-meta {
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		line-height: 1.6;
		letter-spacing: var(--ls-wide);
		color: var(--secondary-text);
	}

	/* Right column ─────────────────────────── */
	.about-content {
		display: flex;
		flex-direction: column;
		gap: clamp(2rem, 5vw, 3.5rem);
	}

	.about-heading {
		font-family: var(--title-f);
		font-size: clamp(1.5rem, 5.2vw, 3.5rem);
		font-weight: var(--fw-medium);
		line-height: 1.2;
		letter-spacing: -0.015em;
		color: var(--main-text);
		margin: 0;
		max-width: 22ch;
		overflow-wrap: anywhere;
		word-break: break-word;
	}

	.accent {
		color: var(--accent-electric);
		font-style: italic;
	}

	.about-paragraph {
		font-family: var(--text-f);
		font-size: clamp(1rem, 1.35vw, 1.2rem);
		line-height: 1.7;
		color: var(--secondary-text);
		max-width: 60ch;
		font-weight: var(--fw-regular);
		overflow-wrap: anywhere;
	}

	/* Achievement stat cards ──────────────── */
	.about-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(148px, 1fr));
		gap: 0.85rem;
	}

	.stat-card {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding: 1.2rem 1.35rem;
		background: rgba(106, 166, 255, 0.04);
		border: 1px solid rgba(106, 166, 255, 0.18);
		border-radius: var(--radius-md);
		transition:
			border-color 220ms ease,
			background 220ms ease,
			box-shadow 220ms ease;

		&:hover {
			border-color: rgba(106, 166, 255, 0.5);
			background: rgba(106, 166, 255, 0.08);
			box-shadow: 0 8px 24px -12px rgba(106, 166, 255, 0.3);
		}
	}

	:global(:root[data-theme='light']) .stat-card {
		background: rgba(106, 166, 255, 0.06);
		border-color: rgba(106, 166, 255, 0.22);
	}

	.stat-value {
		font-family: var(--mono-f);
		font-size: clamp(1.5rem, 2.8vw, 2.1rem);
		font-weight: var(--fw-bold);
		line-height: 1;
		color: var(--accent-electric);
		letter-spacing: -0.02em;
		font-variant-numeric: tabular-nums;
	}

	.stat-label {
		font-family: var(--text-f);
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
		color: var(--main-text);
		line-height: 1.3;
		margin-top: 0.15rem;
	}

	.stat-sub {
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-wide);
		color: var(--secondary-text);
		line-height: 1.4;
	}

	/* Facts row ──────────────────────────── */
	.about-facts {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 1.5rem;
		padding-block: 1rem 1.5rem;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		margin: 0;
	}

	.fact {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		margin: 0;
	}

	.fact-k {
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-widest);
		text-transform: uppercase;
		color: var(--secondary-text);
		margin: 0;
	}

	.fact-v {
		font-family: var(--text-f);
		font-size: var(--fs-xl);
		font-weight: var(--fw-medium);
		color: var(--main-text);
		margin: 0;
	}

	/* GitHub graph block ─────────────────── */
	.about-graph {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.75rem;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: rgba(255, 255, 255, 0.015);
		min-width: 0;
		max-width: 100%;
		/* clip vertically but allow the graph to scroll horizontally */
		overflow: hidden;
		overflow-x: auto;
	}

	@media (max-width: 600px) {
		.about-graph {
			padding: 0.85rem;
			border-radius: var(--radius-md);
		}
	}

	:global(:root[data-theme='light']) .about-graph {
		background: rgba(0, 0, 0, 0.015);
	}

	.about-graph-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.about-graph-sub {
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		color: var(--secondary-text);
		letter-spacing: var(--ls-wide);
	}

	/* Mobile: stack columns ─────────────── */
	@media (max-width: 900px) {
		.about-stage {
			padding-block: clamp(2rem, 6vh, 4rem);
		}
		.about-grid {
			grid-template-columns: minmax(0, 1fr);
			gap: 1.5rem;
		}
		.about-mark {
			position: static;
		}
		.about-mark-num {
			font-size: clamp(2.5rem, 12vw, 4.5rem);
		}
		.about-mark-meta {
			font-size: var(--fs-xs);
		}
		.about-content {
			min-width: 0;
			gap: clamp(1.5rem, 4vw, 2.5rem);
		}
		.about-heading {
			font-size: clamp(1.35rem, 5vw, 2.5rem);
		}
	}

	@media (max-width: 600px) {
		.about-stage {
			padding-block: 1.75rem clamp(2rem, 6vh, 3.5rem);
		}
		.about-mark-inner {
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			gap: 0.5rem 1rem;
		}
		.about-mark-num {
			font-size: clamp(2rem, 10vw, 3.5rem);
		}
		.about-mark-line {
			display: none;
		}
		.about-mark-meta {
			width: 100%;
		}
		.about-content {
			gap: 1.25rem;
		}
		.about-stats {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.65rem;
		}
		.stat-card {
			padding: 0.9rem 1rem;
		}
		.stat-value {
			font-size: clamp(1.25rem, 5.5vw, 1.75rem);
		}
		.about-facts {
			grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
			gap: 1rem;
			padding-block: 0.85rem 1rem;
		}
		.fact-v {
			font-size: var(--fs-lg);
		}
		.about-graph-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.35rem;
		}
	}
</style>
