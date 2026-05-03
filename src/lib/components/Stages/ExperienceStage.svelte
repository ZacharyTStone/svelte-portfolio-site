<script lang="ts">
	import { browser } from '$app/environment';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import { getAssetURL } from '$lib/data/assets';
	import { EXPERIENCES } from '$lib/params';
	import type { Experience } from '$lib/types';
	import { onIdle, setupHorizontalPin } from '$lib/utils/motion';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	const items = EXPERIENCES.items;
	const stageScrollHeight = `clamp(280vh, calc(120vh + ${items.length} * 60vh), 720vh)`;

	let sectionEl: HTMLElement | undefined = $state();
	let trackEl: HTMLElement | undefined = $state();
	let progressEl: HTMLElement | undefined = $state();
	const panelEls: HTMLElement[] = [];

	let activeIndex = $state(0);

	function safeT(key: string): string {
		if (!browser) return key.split('.').pop() || key;
		try {
			return $_(key);
		} catch {
			return key.split('.').pop() || key;
		}
	}

	function yearOf(d?: Date | null): string | null {
		if (!d) return null;
		try {
			return d.getFullYear().toString();
		} catch {
			return null;
		}
	}

	function rangeLabel(exp: Experience): string {
		const f = yearOf(exp.period?.from);
		const t = exp.period?.to ? yearOf(exp.period.to) : safeT('COMMON.now');
		if (!f) return t || '';
		if (!t || f === t) return f;
		return `${f} — ${t}`;
	}

	function parseDescription(raw: string): { lead: string; bullets: string[] } {
		if (!raw) return { lead: '', bullets: [] };
		const chunks = raw.split('\n\n').map((c) => c.trim()).filter(Boolean);
		const lead: string[] = [];
		const bullets: string[] = [];
		for (const c of chunks) {
			if (c.startsWith('- ')) bullets.push(c.replace(/^-\s*/, '').trim());
			else lead.push(c);
		}
		return { lead: lead.join(' '), bullets };
	}

	function contractLabel(c: string): string {
		return safeT(c);
	}

	onMount(() => {
		let cleanup: (() => void) | null = null;

		const cancel = onIdle(() => {
			if (sectionEl && trackEl) {
				setupHorizontalPin(
					{
						section: sectionEl,
						track: trackEl,
						cards: panelEls.filter(Boolean),
						progress: progressEl,
						onActiveIndexChange: (i) => {
							activeIndex = i;
						}
					},
					{
						scaleMin: 1,
						opacityMin: 1,
						blurMax: 0,
						focusWindow: 0.55,
						snapToCards: true,
						minWidth: 901
					}
				).then((c) => {
					cleanup = c;
				});
			}
		});

		return () => {
			cancel();
			cleanup?.();
		};
	});
</script>

<section
	bind:this={sectionEl}
	id="experience"
	class="experience-stage"
	style:--experience-stage-height={stageScrollHeight}
	aria-labelledby="experience-heading"
>
	<div class="experience-pin">
		<header class="experience-header">
			<div class="experience-header-row">
				<div>
					<div class="mono-eyebrow">{safeT('EXPERIENCES.eyebrow')}</div>
					<h2 id="experience-heading" class="experience-title">
						{safeT('EXPERIENCES.heading_prefix')}
						<span class="accent">{safeT('EXPERIENCES.heading_ownership')}</span>,
						<span class="accent">{safeT('EXPERIENCES.heading_outcomes')}</span>,
						{safeT('EXPERIENCES.heading_and')}
						<span class="accent">{safeT('EXPERIENCES.heading_impact')}</span>{safeT('EXPERIENCES.heading_period')}
					</h2>
				</div>
				<div class="experience-counter mono-eyebrow" aria-live="polite">
					<span class="experience-counter-current">
						{(activeIndex + 1).toString().padStart(2, '0')}
					</span>
					<span class="experience-counter-divider" aria-hidden="true">/</span>
					<span class="experience-counter-total">
						{items.length.toString().padStart(2, '0')}
					</span>
				</div>
			</div>
		</header>

		<div class="experience-track-wrap">
			<div bind:this={trackEl} class="experience-track">
				{#each items as exp, i (exp.slug)}
					{@const desc = parseDescription(safeT(`EXPERIENCES.${exp.slug}.description`))}
					{@const range = rangeLabel(exp)}
					{@const isCurrent = !exp.period?.to}
					<article
						bind:this={panelEls[i]}
						class="job-feature"
						class:is-current={isCurrent}
						class:is-active={activeIndex === i}
						style="--panel-i: {i}"
					>
						<aside class="job-meta">
							<div class="job-range" aria-hidden="true">{range}</div>
							<div class="job-status">
								{#if isCurrent}
									<span class="job-status-dot"></span>
									<span>{safeT('EXPERIENCES.currently_shipping')}</span>
								{:else}
									<span class="job-status-dot dim"></span>
									<span>{safeT('EXPERIENCES.completed')}</span>
								{/if}
							</div>
							<div class="job-logo-wrap">
								<img
									class="job-logo"
									src={getAssetURL(exp.logo)}
									alt="{exp.company} logo"
									loading="lazy"
									decoding="async"
								/>
							</div>
							<dl class="job-spec">
								<div class="spec-row">
									<dt class="spec-k">{safeT('EXPERIENCES.spec_role')}</dt>
									<dd class="spec-v">{contractLabel(exp.contract)}</dd>
								</div>
								<div class="spec-row">
									<dt class="spec-k">{safeT('EXPERIENCES.spec_where')}</dt>
									<dd class="spec-v">{safeT(`EXPERIENCES.${exp.slug}.location`)}</dd>
								</div>
								<div class="spec-row">
									<dt class="spec-k">{safeT('EXPERIENCES.spec_type')}</dt>
									<dd class="spec-v">{safeT(`EXPERIENCES.${exp.slug}.type`)}</dd>
								</div>
							</dl>
						</aside>

						<div class="job-body">
							<div class="job-eyebrow">
								<span class="job-company">{exp.company}</span>
							</div>
							<h3 class="job-title">{safeT(`EXPERIENCES.${exp.slug}.name`)}</h3>

							{#if desc.lead}
								<p class="job-lead">{desc.lead}</p>
							{/if}

							{#if desc.bullets.length > 0}
								<ul class="job-wins">
									{#each desc.bullets as bullet, bi}
										<li class="job-win">
											<span class="job-win-num mono-eyebrow">
												{(bi + 1).toString().padStart(2, '0')}
											</span>
											<span class="job-win-text">{bullet}</span>
										</li>
									{/each}
								</ul>
							{/if}

							{#if exp.skills?.length}
								<div class="job-stack">
									{#each exp.skills as skill}
										<span class="job-stack-chip">{safeT(skill.name)}</span>
									{/each}
								</div>
							{/if}
						</div>
					</article>
				{/each}
				<div class="experience-track-spacer" aria-hidden="true"></div>
			</div>
		</div>

		<footer class="experience-footer">
			<div class="experience-progress-track">
				<div bind:this={progressEl} class="experience-progress-fill"></div>
			</div>
			<div class="experience-hint mono-eyebrow">
				<UIcon icon="i-carbon-arrow-down" classes="text-1em" alt="" />
				<span>{safeT('EXPERIENCES.scroll_hint')}</span>
			</div>
		</footer>
	</div>
</section>

<style lang="scss">
	.experience-stage {
		position: relative;
		height: var(--experience-stage-height, clamp(280vh, 380vh, 560vh));
		scroll-margin-top: var(--scroll-anchor-offset);
	}

	.experience-pin {
		position: sticky;
		top: var(--nav-h);
		height: calc(100dvh - var(--nav-h));
		display: grid;
		grid-template-rows: auto minmax(0, 1fr) auto;
		gap: clamp(0.85rem, 2vh, 1.5rem);
		padding-block: clamp(1rem, 3vh, 2rem);
		overflow: hidden;
	}

	.experience-header {
		max-width: 1500px;
		margin: 0 auto;
		padding-inline: clamp(1.5rem, 6vw, 6rem);
		width: 100%;
	}

	.experience-header-row {
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.experience-title {
		font-family: var(--title-f);
		font-size: clamp(1.4rem, 2.6vw, 2.4rem);
		font-weight: var(--fw-medium);
		line-height: 1.15;
		letter-spacing: -0.015em;
		color: var(--main-text);
		margin: 0.35rem 0 0 0;
		max-width: 30ch;
	}

	.accent {
		color: var(--accent-electric);
		font-style: italic;
	}

	.experience-counter {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		color: var(--secondary-text);
		font-size: var(--fs-sm);
	}

	.experience-counter-current {
		font-size: clamp(1.5rem, 2.6vw, 2.25rem);
		color: var(--accent-electric);
		font-weight: var(--fw-light);
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	.experience-counter-divider {
		color: var(--secondary-text);
		opacity: 0.5;
		font-size: clamp(1.15rem, 1.8vw, 1.5rem);
	}

	.experience-counter-total {
		font-size: var(--fs-base);
		opacity: 0.7;
	}

	/* Horizontal track ───────────────────── */
	.experience-track-wrap {
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: stretch;
		min-height: 0;
		height: 100%;
	}

	.experience-track {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		gap: clamp(1.25rem, 2.5vw, 2rem);
		padding-inline: clamp(1.5rem, 6vw, 6rem);
		height: 100%;
		min-height: 0;
		will-change: transform;
		transform: translate3d(0, 0, 0);
		transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.experience-track-spacer {
		flex: 0 0 clamp(2rem, 8vw, 6rem);
	}

	/* Job feature panel — wide, focused. Height comes from the track row,
	   not from a fixed clamp, so panels never overflow into the header. */
	.job-feature {
		position: relative;
		flex: 0 0 clamp(560px, 76vw, 1180px);
		display: grid;
		grid-template-columns: minmax(0, 0.5fr) minmax(0, 1fr);
		gap: clamp(1.5rem, 3.5vw, 3rem);
		padding: clamp(1.5rem, 2.6vw, 2.4rem);
		background: rgba(255, 255, 255, 0.018);
		border: 1px solid var(--border);
		border-radius: clamp(0.85rem, 1.4vw, 1.4rem);
		overflow: hidden;
		transform-origin: center;
		will-change: transform, opacity, filter;
		transition: border-color 320ms ease, box-shadow 320ms ease;
		backdrop-filter: blur(14px) saturate(140%);
		-webkit-backdrop-filter: blur(14px) saturate(140%);
		height: 100%;
		min-height: 0;
	}

	:global(:root[data-theme='light']) .job-feature {
		background: rgba(255, 255, 255, 0.55);
	}

	.job-feature.is-active {
		border-color: var(--border-hover);
	}

	.job-feature.is-active.is-current {
		border-color: rgba(106, 166, 255, 0.45);
		box-shadow: 0 30px 80px -30px rgba(106, 166, 255, 0.3);
	}

	.job-feature.is-active.is-current::before {
		content: '';
		position: absolute;
		inset: -1px;
		border-radius: inherit;
		background: linear-gradient(
			135deg,
			rgba(106, 166, 255, 0.45) 0%,
			transparent 35%,
			transparent 65%,
			rgba(106, 166, 255, 0.25) 100%
		);
		z-index: -1;
		pointer-events: none;
		opacity: 0.7;
	}

	/* Left meta column ─────────────── */
	.job-meta {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		min-width: 0;
		min-height: 0;
	}

	.job-range {
		font-family: var(--mono-f);
		font-size: clamp(1.5rem, 2.8vw, 2.5rem);
		font-weight: var(--fw-light);
		line-height: 1.05;
		letter-spacing: -0.03em;
		color: var(--main-text);
		font-variant-numeric: tabular-nums;
		word-spacing: -0.05em;
		overflow-wrap: anywhere;
	}

	.job-feature.is-current .job-range {
		background: linear-gradient(135deg, var(--main-text) 0%, var(--accent-electric) 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.job-status {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-widest);
		text-transform: uppercase;
		color: var(--secondary-text);
	}

	.job-feature.is-current .job-status {
		color: var(--accent-electric);
	}

	.job-status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--accent-electric);
		box-shadow: 0 0 8px var(--accent-electric-glow);

		&.dim {
			background: var(--secondary-text);
			box-shadow: none;
			opacity: 0.4;
		}
	}

	.job-logo-wrap {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 72px;
		height: 72px;
		padding: 14px;
		background: var(--main);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		flex-shrink: 0;
	}

	.job-logo {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}

	.job-spec {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		margin: auto 0 0 0;
		padding-top: 1.25rem;
		border-top: 1px solid var(--border);
	}

	.spec-row {
		display: grid;
		grid-template-columns: 56px 1fr;
		gap: 0.5rem;
		align-items: baseline;
		margin: 0;
	}

	.spec-k {
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-widest);
		text-transform: uppercase;
		color: var(--secondary-text);
		margin: 0;
	}

	.spec-v {
		font-size: var(--fs-sm);
		color: var(--main-text);
		font-weight: var(--fw-medium);
		margin: 0;
	}

	/* Right body column ─────────────── */
	.job-body {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		min-width: 0;
		min-height: 0;
		overflow-y: auto;
		padding-right: 0.5rem;

		scrollbar-width: thin;
		scrollbar-color: var(--border) transparent;

		&::-webkit-scrollbar {
			width: 4px;
		}
		&::-webkit-scrollbar-thumb {
			background: var(--border);
			border-radius: 999px;
		}
	}

	.job-eyebrow {
		display: flex;
		align-items: center;
		gap: 0.65rem;
	}

	.job-company {
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-widest);
		text-transform: uppercase;
		color: var(--accent-electric);
		padding: 0.3em 0.7em;
		border: 1px solid currentColor;
		border-radius: 999px;
	}

	.job-title {
		font-family: var(--title-f);
		font-size: clamp(1.4rem, 2.2vw, 2rem);
		font-weight: var(--fw-semibold);
		line-height: 1.15;
		letter-spacing: -0.015em;
		color: var(--main-text);
		margin: 0;
	}

	.job-lead {
		font-size: clamp(0.95rem, 1.1vw, 1.05rem);
		line-height: 1.6;
		color: var(--secondary-text);
		margin: 0;
		max-width: 62ch;
		font-weight: var(--fw-light);
	}

	.job-wins {
		list-style: none;
		padding: 0;
		margin: 0.25rem 0 0 0;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.job-win {
		display: grid;
		grid-template-columns: 26px 1fr;
		gap: 0.85rem;
		align-items: baseline;
	}

	.job-win-num {
		color: var(--accent-electric);
		opacity: 0.6;
	}

	.job-win-text {
		font-size: clamp(0.9rem, 1vw, 1rem);
		line-height: 1.55;
		color: var(--main-text);
		font-weight: var(--fw-light);
	}

	.job-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: 0.75rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--border);
	}

	.job-stack-chip {
		display: inline-flex;
		align-items: center;
		padding: 0.35em 0.75em;
		border: 1px solid var(--border);
		border-radius: 999px;
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-wide);
		color: var(--secondary-text);
		text-transform: uppercase;
	}

	/* Footer ────────────────────────── */
	.experience-footer {
		max-width: 1500px;
		margin: 0 auto;
		padding-inline: clamp(1.5rem, 6vw, 6rem);
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.experience-progress-track {
		height: 2px;
		background: var(--border);
		border-radius: 999px;
		overflow: hidden;
	}

	.experience-progress-fill {
		height: 100%;
		width: 100%;
		background: var(--accent-electric);
		transform-origin: left center;
		transform: scaleX(0);
		will-change: transform;
		box-shadow: 0 0 12px var(--accent-electric-glow);
		transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.experience-hint {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--secondary-text);
	}

	/* Mobile fallback: scroll-snap carousel, no pin ───── */
	@media (max-width: 900px) {
		.experience-stage {
			height: auto;
		}
		.experience-pin {
			position: static;
			height: auto;
			padding-block: clamp(3rem, 8vh, 5rem);
			overflow: visible;
		}
		.experience-track-wrap {
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			-webkit-overflow-scrolling: touch;
		}
		.experience-track {
			transform: none !important;
			padding-inline: clamp(1rem, 4vw, 2rem);
		}
		.job-feature {
			scroll-snap-align: center;
			flex: 0 0 88vw;
			grid-template-columns: 1fr;
			min-height: auto;
			transform: none !important;
			opacity: 1 !important;
			filter: none !important;
		}
		.job-body {
			max-height: none;
			overflow-y: visible;
		}
		.job-range {
			font-size: clamp(2rem, 8vw, 3rem);
		}
		.experience-footer {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.experience-stage {
			height: auto;
		}
		.experience-pin {
			position: static;
			height: auto;
			overflow: visible;
		}
		.experience-track-wrap {
			overflow: visible;
		}
		.experience-track {
			flex-direction: column;
			gap: 1.5rem;
			transform: none !important;
		}
		.job-feature {
			flex: 0 0 auto;
			width: 100%;
			max-width: 100%;
			min-height: auto;
			grid-template-columns: 1fr;
			transform: none !important;
			opacity: 1 !important;
			filter: none !important;
		}
		.job-body {
			max-height: none;
			overflow-y: visible;
		}
		.experience-footer {
			display: none;
		}
	}
</style>
