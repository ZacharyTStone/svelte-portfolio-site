<script lang="ts">
	import { browser } from '$app/environment';
	import GitHubContributions from '$lib/components/GitHubContributions/GitHubContributions.svelte';
	import { onIdle, setupReveals } from '$lib/utils/motion';
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

	onMount(() => {
		mounted = true;
		let cleanupReveals: (() => void) | null = null;

		const cancel = onIdle(() => {
			const els = revealEls.filter(Boolean);
			if (els.length > 0) {
				setupReveals(els, { stagger: 90, distance: 32, duration: 760 }).then((cleanup) => {
					cleanupReveals = cleanup;
				});
			}
		});

		return () => {
			cancel();
			cleanupReveals?.();
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

			<dl bind:this={revealEls[2]} class="about-facts">
				{#each factKeys as fact}
					<div class="fact">
						<dt class="fact-k">{safeT(fact.k)}</dt>
						<dd class="fact-v">{safeT(fact.v)}</dd>
					</div>
				{/each}
			</dl>

			{#if mounted}
				<div bind:this={revealEls[3]} class="about-graph">
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
		padding-inline: clamp(1.5rem, 6vw, 6rem);
		align-items: start;
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
		font-size: clamp(1.75rem, 3.6vw, 3.5rem);
		font-weight: var(--fw-medium);
		line-height: 1.15;
		letter-spacing: -0.015em;
		color: var(--main-text);
		margin: 0;
		max-width: 22ch;
	}

	.accent {
		color: var(--accent-electric);
		font-style: italic;
	}

	.about-paragraph {
		font-family: var(--text-f);
		font-size: clamp(1.05rem, 1.35vw, 1.2rem);
		line-height: 1.75;
		color: var(--secondary-text);
		max-width: 60ch;
		font-weight: var(--fw-regular);
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
		overflow: hidden;
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
		.about-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.about-mark {
			position: static;
		}
		.about-mark-num {
			font-size: clamp(4rem, 16vw, 6rem);
		}
	}
</style>
