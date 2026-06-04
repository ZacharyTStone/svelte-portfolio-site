<script lang="ts">
	import { browser } from '$app/environment';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import { onIdle, setupReveals } from '$lib/utils/motion';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	let revealEls: HTMLElement[] = [];

	function safeT(key: string): string {
		if (!browser) return key.split('.').pop() || key;
		try {
			return $_(key);
		} catch {
			return key.split('.').pop() || key;
		}
	}

	const ENGLISH_URL =
		'https://docs.google.com/document/d/1HYvcN-oshInv0VPZSSp8-VtYEDZT1ON24ocUq-lcmVs/edit?usp=sharing';
	const JAPANESE_URL =
		'https://docs.google.com/document/d/1HYvcN-oshInv0VPZSSp8-VtYEDZT1ON24ocUq-lcmVs/edit?usp=sharing';

	const resumes = [
		{
			titleKey: 'RESUME.englishTitle',
			descKey: 'RESUME.englishDesc',
			url: ENGLISH_URL,
			icon: 'i-carbon-document',
			lang: 'EN'
		},
		{
			titleKey: 'RESUME.japaneseTitle',
			descKey: 'RESUME.japaneseDesc',
			url: JAPANESE_URL,
			icon: 'i-carbon-document',
			lang: '日'
		}
	];

	onMount(() => {
		let cleanup: (() => void) | null = null;
		const cancel = onIdle(() => {
			const els = revealEls.filter(Boolean);
			if (els.length > 0) {
				setupReveals(els, { stagger: 120, distance: 28, duration: 740 }).then((c) => {
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

<section id="resume" class="resume-stage" aria-labelledby="resume-heading">
	<div class="resume-inner">
		<div bind:this={revealEls[0]} class="resume-header">
			<div class="mono-eyebrow">{safeT('RESUME.eyebrow')}</div>
			<h2 id="resume-heading" class="resume-title">
				{safeT('RESUME.heading_prefix')}
				<span class="accent">{safeT('RESUME.heading_accent')}</span>
			</h2>
			<p class="resume-subtitle">{safeT('RESUME.subtitle')}</p>
		</div>

		<div class="resume-cards">
			{#each resumes as resume, i}
				<div bind:this={revealEls[i + 1]} class="resume-card">
					<div class="resume-card-top">
						<div class="resume-lang-badge">{resume.lang}</div>
						<h3 class="resume-card-title">{safeT(resume.titleKey)}</h3>
						<p class="resume-card-desc">{safeT(resume.descKey)}</p>
					</div>
					<a
						href={resume.url}
						target="_blank"
						rel="noopener noreferrer"
						class="resume-card-cta"
						aria-label={safeT(resume.titleKey)}
					>
						<UIcon icon="i-carbon-open-in-new" classes="cta-icon" />
						<span>{safeT('RESUME.openInNewTab')}</span>
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	.resume-stage {
		position: relative;
		padding-block: clamp(4rem, 10vh, 7rem);
		scroll-margin-top: var(--scroll-anchor-offset);
		overflow: hidden;
	}

	.resume-inner {
		max-width: 1400px;
		margin: 0 auto;
		padding-inline: clamp(1rem, 5vw, 6rem);
		display: flex;
		flex-direction: column;
		gap: clamp(2.5rem, 6vh, 4rem);
	}

	.resume-header {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-width: 52ch;
	}

	.resume-title {
		font-family: var(--text-f);
		font-weight: var(--fw-extrabold);
		font-size: clamp(1.85rem, 5vw, 3.75rem);
		line-height: 1.05;
		letter-spacing: -0.03em;
		color: var(--main-text);
		margin: 0;
	}

	.resume-title .accent {
		color: var(--accent-electric);
		font-style: italic;
		font-family: var(--title-f);
		font-weight: var(--fw-medium);
	}

	.resume-subtitle {
		font-family: var(--text-f);
		font-size: clamp(1rem, 1.2vw, 1.15rem);
		color: var(--secondary-text);
		line-height: 1.65;
		margin: 0;
	}

	.resume-cards {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(1rem, 2.5vw, 1.75rem);
	}

	.resume-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2rem;
		padding: clamp(1.5rem, 3vw, 2.25rem);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg, 1rem);
		background: rgba(255, 255, 255, 0.018);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		transition: border-color 260ms ease, transform 260ms cubic-bezier(0.16, 1, 0.3, 1);

		&:hover {
			border-color: var(--accent-electric);
			transform: translateY(-3px);
		}
	}

	:global(:root[data-theme='light']) .resume-card {
		background: rgba(255, 255, 255, 0.65);
	}

	.resume-card-top {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.resume-lang-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: var(--radius-sm, 0.5rem);
		border: 1px solid var(--border);
		background: var(--main);
		font-family: var(--mono-f);
		font-size: var(--fs-sm);
		font-weight: var(--fw-bold);
		color: var(--accent-electric);
		letter-spacing: 0.04em;
	}

	.resume-card-title {
		font-family: var(--text-f);
		font-weight: var(--fw-bold);
		font-size: clamp(1.1rem, 1.6vw, 1.4rem);
		color: var(--main-text);
		margin: 0;
		line-height: 1.25;
	}

	.resume-card-desc {
		font-family: var(--text-f);
		font-size: clamp(0.9rem, 1vw, 1rem);
		color: var(--secondary-text);
		line-height: 1.6;
		margin: 0;
	}

	.resume-card-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.7rem 1.25rem;
		border: 1px solid var(--border);
		border-radius: var(--radius-md, 0.6rem);
		background: transparent;
		color: var(--main-text);
		font-family: var(--mono-f);
		font-size: var(--fs-sm);
		letter-spacing: var(--ls-wide);
		text-decoration: none;
		transition: background 220ms ease, border-color 220ms ease, color 220ms ease;
		align-self: flex-start;

		&:hover {
			background: var(--accent-electric);
			border-color: var(--accent-electric);
			color: #fff;
		}
	}

	:global(.cta-icon) {
		font-size: 1em;
		opacity: 0.8;
	}

	@media (max-width: 700px) {
		.resume-cards {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
