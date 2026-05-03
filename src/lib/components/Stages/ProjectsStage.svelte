<script lang="ts">
	import { browser } from '$app/environment';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import { getAssetURL } from '$lib/data/assets';
	import { PROJECTS } from '$lib/params';
	import type { Project } from '$lib/types';
	import { _ } from 'svelte-i18n';

	const visibleProjects = PROJECTS.items.filter((p) => !p.dont_show);
	const projectCount = visibleProjects.length;

	function safeT(key: string): string {
		if (!browser) return key.split('.').pop() || key;
		try {
			return $_(key);
		} catch {
			return key.split('.').pop() || key;
		}
	}

	function pickImage(project: Project): string {
		if (project.screenshots && project.screenshots.length > 0) {
			return project.screenshots[0].src;
		}
		return getAssetURL(project.logo);
	}
</script>

<section id="projects" class="projects-stage" aria-labelledby="projects-heading">
	<div class="projects-inner">
		<header class="projects-header">
			<div class="projects-header-row">
				<div>
					<div class="mono-eyebrow">{safeT('PROJECTS.eyebrow')}</div>
					<h2 id="projects-heading" class="projects-title">
						{safeT('PROJECTS.heading_prefix')}
						<span class="accent">{safeT('PROJECTS.heading_accent')}</span>
					</h2>
				</div>
				<div class="projects-counter mono-eyebrow">
					<span class="projects-counter-label">{safeT('PROJECTS.counter_label')}</span>
					<span class="projects-counter-num">{projectCount.toString().padStart(2, '0')}</span>
				</div>
			</div>
		</header>

		<ul class="projects-grid">
			{#each visibleProjects as project, i (project.slug)}
				<li class="projects-grid-item" style="--card-i: {i}">
					<a href="/projects/{project.slug}" class="showcase">
						<div class="showcase-frame">
							<img
								class="showcase-image"
								src={pickImage(project)}
								alt={safeT(project.name)}
								loading={i < 3 ? 'eager' : 'lazy'}
								decoding="async"
							/>
							<div class="showcase-frame-overlay" aria-hidden="true"></div>
							<span class="showcase-index mono-eyebrow" aria-hidden="true">
								{(i + 1).toString().padStart(2, '0')} / {projectCount.toString().padStart(2, '0')}
							</span>
						</div>

						<div class="showcase-meta">
							<div class="showcase-eyebrow mono-eyebrow">
								{safeT(project.type ?? '')}
							</div>
							<h3 class="showcase-title">{safeT(project.name)}</h3>
							<p class="showcase-desc">{safeT(project.shortDescription)}</p>
							{#if project.project_skills?.length}
								<div class="showcase-tags">
									{#each project.project_skills.slice(0, 4) as tag}
										<span class="showcase-tag">{tag.label}</span>
									{/each}
									{#if (project.project_skills.length ?? 0) > 4}
										<span class="showcase-tag-more">
											+{project.project_skills.length - 4}
										</span>
									{/if}
								</div>
							{/if}
							<span class="showcase-cta">
								<span>{safeT('PROJECTS.open_case')}</span>
								<UIcon icon="i-carbon-arrow-up-right" classes="text-1.05em" alt="" />
							</span>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style lang="scss">
	.projects-stage {
		position: relative;
		padding-block: clamp(4rem, 10vh, 7rem);
		scroll-margin-top: var(--scroll-anchor-offset);
	}

	.projects-inner {
		max-width: 1400px;
		margin: 0 auto;
		padding-inline: clamp(1.5rem, 6vw, 6rem);
	}

	.projects-header {
		margin-bottom: clamp(2.5rem, 6vh, 4rem);
	}

	.projects-header-row {
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.projects-title {
		font-family: var(--title-f);
		font-size: clamp(1.75rem, 3.6vw, 3.5rem);
		font-weight: var(--fw-medium);
		line-height: 1.12;
		letter-spacing: -0.015em;
		color: var(--main-text);
		margin: 0.4rem 0 0 0;
		max-width: 24ch;
	}

	.accent {
		color: var(--accent-electric);
		font-style: italic;
	}

	.projects-counter {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		color: var(--secondary-text);
	}

	.projects-counter-num {
		font-size: clamp(1.5rem, 2.6vw, 2.25rem);
		color: var(--accent-electric);
		font-weight: var(--fw-light);
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	/* Grid ─────────────────────────────────── */
	.projects-grid {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(1rem, 1.8vw, 1.75rem);
		align-items: stretch;
	}

	.projects-grid-item {
		min-width: 0;
		isolation: isolate;
		opacity: 0;
		animation: project-rise 720ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
		animation-delay: calc(150ms + var(--card-i, 0) * 70ms);
	}

	@keyframes project-rise {
		from {
			opacity: 0;
			transform: translate3d(0, 18px, 0);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	@media (max-width: 1100px) {
		.projects-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 640px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.projects-grid-item {
			animation: none;
			opacity: 1;
			transform: none;
		}
	}

	/* Showcase card ────────────────────────── */
	.showcase {
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100%;
		text-decoration: none;
		color: inherit;
		background: rgba(255, 255, 255, 0.018);
		border: 1px solid var(--border);
		border-radius: clamp(0.85rem, 1.4vw, 1.4rem);
		overflow: hidden;
		transition: border-color 280ms ease, box-shadow 280ms ease, transform 280ms ease;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	:global(:root[data-theme='light']) .showcase {
		background: rgba(255, 255, 255, 0.55);
	}

	.showcase:hover {
		border-color: var(--accent-electric);
		box-shadow: 0 24px 48px -22px rgba(106, 166, 255, 0.4);
		transform: translateY(-3px);
	}

	.showcase-frame {
		position: relative;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		background: var(--main-elevated);
	}

	.showcase-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.showcase:hover .showcase-image {
		transform: scale(1.04);
	}

	.showcase-frame-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			transparent 0%,
			transparent 55%,
			rgba(var(--main-rgb), 0.7) 100%
		);
		pointer-events: none;
	}

	.showcase-index {
		position: absolute;
		top: 0.85rem;
		left: 0.85rem;
		padding: 0.35rem 0.65rem;
		background: rgba(0, 0, 0, 0.52);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		border-radius: 999px;
		color: rgba(255, 255, 255, 0.9);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-widest);
	}

	.showcase-badge {
		position: absolute;
		top: 0.85rem;
		right: 0.85rem;
		padding: 0.35rem 0.65rem;
		background: var(--accent-electric);
		color: #0a0a0c;
		border-radius: 999px;
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-widest);
	}

	.showcase-meta {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		padding: clamp(1rem, 1.6vw, 1.5rem);
	}

	.showcase-eyebrow {
		color: var(--accent-electric);
	}

	.showcase-title {
		font-family: var(--title-f);
		font-size: clamp(1.2rem, 1.8vw, 1.55rem);
		font-weight: var(--fw-semibold);
		line-height: 1.2;
		letter-spacing: -0.015em;
		color: var(--main-text);
		margin: 0;
	}

	.showcase-desc {
		font-size: var(--fs-sm);
		line-height: 1.55;
		color: var(--secondary-text);
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.showcase-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-top: 0.25rem;
	}

	.showcase-tag {
		display: inline-flex;
		align-items: center;
		padding: 0.25em 0.55em;
		background: var(--main);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-wide);
		color: var(--secondary-text);
	}

	.showcase-tag-more {
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		color: var(--accent-electric);
		align-self: center;
	}

	.showcase-cta {
		margin-top: 0.5rem;
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-widest);
		text-transform: uppercase;
		color: var(--accent-electric);
		align-self: flex-start;
	}
</style>
