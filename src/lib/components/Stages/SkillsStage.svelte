<script lang="ts">
	import { browser } from '$app/environment';
	import { getAssetURL } from '$lib/data/assets';
	import { SKILLS } from '$lib/params';
	import { onIdle, setupReveals } from '$lib/utils/motion';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	const items = SKILLS.items;
	let revealEls: HTMLElement[] = [];

	function safeT(key: string): string {
		if (!browser) return key.split('.').pop() || key;
		try {
			return $_(key);
		} catch {
			return key.split('.').pop() || key;
		}
	}

	const subtitleBySlug: Record<string, string> = {
		fe: 'React · Next · Svelte · TypeScript · Vite',
		be: 'Node · Express · REST · GraphQL · MongoDB · SQL',
		'cyber-security': 'OWASP · Burp · ZAP · Bug Bounty in progress',
		'dev-tools': 'Git · GitHub Actions · Playwright · Sentry',
		japanese: 'JLPT N1 · Kanji Kentei · Speech contest 1st place'
	};

	onMount(() => {
		let cleanup: (() => void) | null = null;
		const cancel = onIdle(() => {
			const els = revealEls.filter(Boolean);
			if (els.length > 0) {
				setupReveals(els, { stagger: 90, distance: 24, duration: 720 }).then((c) => {
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

<section id="skills" class="skills-stage" aria-labelledby="skills-heading">
	<header bind:this={revealEls[0]} class="skills-header">
		<div class="mono-eyebrow">{safeT('SKILLS.eyebrow')}</div>
		<h2 id="skills-heading" class="skills-title">
			{safeT('SKILLS.heading_prefix')} <span class="accent">{safeT('SKILLS.heading_accent')}</span>
		</h2>
		<p class="skills-sub">
			{safeT('SKILLS.sub')}
		</p>
	</header>

	<ul class="skills-list">
		{#each items as skill, i (skill.slug)}
			<li class="skill-row" style="--tile-i: {i}">
				<a class="skill-row-link" href="/skills/{skill.slug}">
					<div class="skill-row-logo-wrap">
						<img
							class="skill-row-logo"
							src={getAssetURL(skill.logo)}
							alt=""
							loading="lazy"
							decoding="async"
						/>
					</div>
					<div class="skill-row-body">
						<h3 class="skill-row-name">{safeT(skill.name)}</h3>
						<p class="skill-row-sub">{subtitleBySlug[skill.slug] ?? ''}</p>
					</div>
					<span class="skill-row-cta mono-eyebrow">{safeT('SKILLS.explore')}</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	.skills-stage {
		position: relative;
		padding-block: clamp(4rem, 10vh, 7rem);
		scroll-margin-top: var(--scroll-anchor-offset);
		max-width: 1400px;
		margin: 0 auto;
		padding-inline: clamp(1.5rem, 6vw, 6rem);
	}

	.skills-header {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		margin-bottom: clamp(2.5rem, 6vh, 4rem);
		max-width: 60ch;
	}

	.skills-title {
		font-family: var(--title-f);
		font-size: clamp(1.75rem, 3.6vw, 3.5rem);
		font-weight: var(--fw-medium);
		line-height: 1.12;
		letter-spacing: -0.015em;
		color: var(--main-text);
		margin: 0;
	}

	.accent {
		color: var(--accent-electric);
		font-style: italic;
	}

	.skills-sub {
		font-family: var(--text-f);
		font-size: clamp(1rem, 1.3vw, 1.15rem);
		line-height: 1.6;
		color: var(--secondary-text);
		margin: 0;
	}

	.skills-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.skill-row {
		opacity: 0;
		animation: skill-rise 600ms ease forwards;
		animation-delay: calc(100ms + var(--tile-i, 0) * 60ms);
	}

	@keyframes skill-rise {
		from { opacity: 0; transform: translateY(8px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	@media (prefers-reduced-motion: reduce) {
		.skill-row {
			animation: none;
			opacity: 1;
		}
	}

	.skill-row-link {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.25rem;
		background: rgba(255, 255, 255, 0.018);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		text-decoration: none;
		color: inherit;
		transition: border-color 240ms ease;
	}

	:global(:root[data-theme='light']) .skill-row-link {
		background: rgba(255, 255, 255, 0.6);
	}

	.skill-row-link:hover {
		border-color: var(--accent-electric);
	}

	.skill-row-link:hover .skill-row-cta {
		color: var(--accent-electric);
	}

	.skill-row-logo-wrap {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		padding: 10px;
		background: var(--main);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
	}

	.skill-row-logo {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}

	.skill-row-body {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		min-width: 0;
	}

	.skill-row-name {
		font-family: var(--title-f);
		font-size: clamp(1rem, 1.4vw, 1.25rem);
		font-weight: var(--fw-semibold);
		line-height: 1.2;
		color: var(--main-text);
		margin: 0;
	}

	.skill-row-sub {
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		line-height: 1.5;
		letter-spacing: var(--ls-wide);
		color: var(--secondary-text);
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.skill-row-cta {
		flex-shrink: 0;
		color: var(--secondary-text);
		transition: color 240ms ease;
	}
</style>
