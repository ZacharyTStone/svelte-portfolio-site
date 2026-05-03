<script lang="ts">
	import { browser } from '$app/environment';
	import ContactForm from '$lib/components/Contact/ContactForm.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import { getPlatfromIcon, HOME } from '$lib/params';
	import { onIdle, setupContactScale, setupReveals } from '$lib/utils/motion';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	const { links } = HOME;

	let sectionEl: HTMLElement | undefined = $state();
	let headingEl: HTMLElement | undefined = $state();
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

	onMount(() => {
		mounted = true;
		let scaleCleanup: (() => void) | null = null;
		let revealCleanup: (() => void) | null = null;

		const cancel = onIdle(() => {
			if (sectionEl && headingEl) {
				setupContactScale(sectionEl, headingEl).then((c) => {
					scaleCleanup = c;
				});
			}
			const els = revealEls.filter(Boolean);
			if (els.length > 0) {
				setupReveals(els, { stagger: 100, distance: 30, duration: 760 }).then((c) => {
					revealCleanup = c;
				});
			}
		});

		return () => {
			cancel();
			scaleCleanup?.();
			revealCleanup?.();
		};
	});
</script>

<section
	bind:this={sectionEl}
	id="contact"
	class="contact-stage"
	aria-labelledby="contact-heading"
>
	<div class="contact-bg" aria-hidden="true">
		<div class="contact-mesh"></div>
	</div>

	<div class="contact-inner">
		<div class="contact-eyebrow mono-eyebrow">{safeT('CONTACT.eyebrow')}</div>

		<h2 bind:this={headingEl} id="contact-heading" class="contact-headline">
			{safeT('CONTACT.headline_prefix')} <span class="accent">{safeT('CONTACT.headline_accent')}</span><br />
			<span class="contact-headline-2">{safeT('CONTACT.headline_suffix')}<span class="period">.</span></span>
		</h2>

		<div class="contact-grid">
			<div bind:this={revealEls[0]} class="contact-copy">
				<p class="contact-paragraph">
					{safeT('CONTACT.connect_description')}
				</p>

				<ul class="contact-channels">
					{#each links as { platform, link }}
						<li>
							<a class="channel" href={link} target="_blank" rel="noopener noreferrer">
								<span class="channel-icon">
									<Icon
										icon={getPlatfromIcon(platform)}
										color={'currentColor'}
										size={'18px'}
									/>
								</span>
								<span class="channel-meta">
									<span class="channel-platform">{platform}</span>
									<span class="channel-handle">{link.replace(/^mailto:\s*/, '')}</span>
								</span>
								<UIcon icon="i-carbon-arrow-up-right" classes="channel-arrow text-1em" alt="" />
							</a>
						</li>
					{/each}
				</ul>
			</div>

			{#if mounted}
				<div bind:this={revealEls[1]} class="contact-form-wrap">
					<ContactForm />
				</div>
			{/if}
		</div>

		<footer bind:this={revealEls[2]} class="contact-footer mono-eyebrow">
			<span>©{new Date().getFullYear()} Zach Stone</span>
			<span class="contact-footer-divider" aria-hidden="true">·</span>
			<span>{safeT('CONTACT.footer_built_with')}</span>
		</footer>
	</div>
</section>

<style lang="scss">
	.contact-stage {
		position: relative;
		min-height: 100dvh;
		padding-block: clamp(4rem, 10vh, 7rem) clamp(3rem, 6vh, 4rem);
		scroll-margin-top: var(--scroll-anchor-offset);
		overflow: hidden;
		isolation: isolate;
	}

	.contact-bg {
		position: absolute;
		inset: 0;
		z-index: -1;
		overflow: hidden;
	}

	.contact-mesh {
		position: absolute;
		bottom: -30%;
		left: 50%;
		transform: translateX(-50%);
		width: 110vw;
		height: 90vw;
		max-width: 1400px;
		max-height: 1100px;
		background: radial-gradient(
			circle at 50% 100%,
			rgba(106, 166, 255, 0.28) 0%,
			rgba(106, 166, 255, 0.08) 35%,
			transparent 65%
		);
		filter: blur(50px);
		opacity: 0.85;
	}

	:global(:root[data-theme='light']) .contact-mesh {
		opacity: 0.45;
	}

	.contact-inner {
		max-width: 1400px;
		margin: 0 auto;
		padding-inline: clamp(1.5rem, 6vw, 6rem);
		display: flex;
		flex-direction: column;
		gap: clamp(2rem, 5vh, 3.5rem);
	}

	.contact-eyebrow {
		color: var(--accent-electric);
	}

	.contact-headline {
		font-family: var(--text-f);
		font-weight: var(--fw-extrabold);
		font-size: clamp(2rem, 5.5vw, 5.5rem);
		line-height: 0.92;
		letter-spacing: -0.045em;
		color: var(--main-text);
		margin: 0;
		max-width: 16ch;
		transform-origin: left center;
		will-change: transform;
	}

	.contact-headline .accent {
		color: var(--accent-electric);
		font-style: italic;
		font-family: var(--title-f);
		font-weight: var(--fw-medium);
	}

	.contact-headline-2 {
		font-family: var(--title-f);
		font-style: italic;
		font-weight: var(--fw-medium);
		color: var(--secondary-text);
	}

	.period {
		color: var(--accent-electric);
		font-style: normal;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
		gap: clamp(2rem, 5vw, 4rem);
		align-items: start;
		margin-top: clamp(1rem, 3vh, 2rem);
	}

	.contact-copy {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.contact-paragraph {
		font-family: var(--text-f);
		font-size: clamp(1.05rem, 1.35vw, 1.25rem);
		line-height: 1.65;
		color: var(--secondary-text);
		margin: 0;
		max-width: 50ch;
	}

	/* Channel list ─────────────────────────── */
	.contact-channels {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.channel {
		display: grid;
		grid-template-columns: 36px 1fr 16px;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.2rem;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: rgba(255, 255, 255, 0.018);
		text-decoration: none;
		color: var(--main-text);
		transition: all 240ms cubic-bezier(0.16, 1, 0.3, 1);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	:global(:root[data-theme='light']) .channel {
		background: rgba(255, 255, 255, 0.6);
	}

	.channel:hover {
		border-color: var(--accent-electric);
		transform: translateX(4px);
		background: rgba(106, 166, 255, 0.04);
	}

	.channel-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: var(--radius-sm);
		background: var(--main);
		color: var(--accent-electric);
		border: 1px solid var(--border);
	}

	.channel-meta {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		min-width: 0;
	}

	.channel-platform {
		font-family: var(--mono-f);
		font-size: var(--fs-xs);
		letter-spacing: var(--ls-widest);
		text-transform: uppercase;
		color: var(--accent-electric);
	}

	.channel-handle {
		font-size: var(--fs-sm);
		color: var(--secondary-text);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:global(.channel-arrow) {
		opacity: 0.5;
		transition: opacity 200ms ease, transform 200ms ease;
	}

	.channel:hover :global(.channel-arrow) {
		opacity: 1;
		transform: translate(2px, -2px);
	}

	/* Form wrap — let ContactForm handle internals; we just compose around it */
	.contact-form-wrap {
		min-width: 0;
	}

	.contact-footer {
		display: flex;
		gap: 0.65rem;
		flex-wrap: wrap;
		padding-top: 2rem;
		border-top: 1px solid var(--border);
		color: var(--secondary-text);
	}

	.contact-footer-divider {
		opacity: 0.5;
	}

	@media (max-width: 900px) {
		.contact-grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.contact-headline {
			transform: none !important;
		}
	}
</style>
