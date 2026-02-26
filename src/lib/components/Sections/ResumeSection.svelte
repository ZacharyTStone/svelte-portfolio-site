<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import SectionTitle from './SectionTitle.svelte';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	const ENGLISH_EMBED_URL =
		'https://docs.google.com/document/d/e/2PACX-1vRVDXfDkTn6AvxeU70wXzjhsJs-7qY6J7EQjOGz0307qjrXFy04sPbnb4r0_MxnDIJo9YnGshQeqMFx/pub?embedded=true';
	const ENGLISH_VIEW_URL =
		'https://docs.google.com/document/d/e/2PACX-1vRVDXfDkTn6AvxeU70wXzjhsJs-7qY6J7EQjOGz0307qjrXFy04sPbnb4r0_MxnDIJo9YnGshQeqMFx/pub';

	const JAPANESE_EMBED_URL =
		'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeQn4d1KAeHMUwJvOjODjy0LvM4X84VHBD94ddJfqxtEnSpz01YPqLd4nNh-c24A/pubhtml?widget=true&headers=false';
	const JAPANESE_VIEW_URL =
		'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeQn4d1KAeHMUwJvOjODjy0LvM4X84VHBD94ddJfqxtEnSpz01YPqLd4nNh-c24A/pubhtml?widget=true&headers=false';
</script>

<section id="resume" class="spa-section">
	<SectionTitle>{$_('NAVBAR.resume')}</SectionTitle>
	{#if mounted}
		<div class="resume-content">
			<div class="resume-grid">
				<div class="resume-item" in:fade={{ duration: 200 }}>
					<h3 class="resume-label">{$_('RESUME.englishTitle')}</h3>
					<a
						href={ENGLISH_VIEW_URL}
						target="_blank"
						rel="noopener noreferrer"
						class="resume-link"
						aria-label={$_('RESUME.openEnglishInNewTab')}
					>
						<Card classes="inline-flex cursor-pointer">
							<span class="resume-btn-inner">
								<UIcon icon="i-carbon-open-in-new" />
								<span>{$_('RESUME.openInNewTab')}</span>
							</span>
						</Card>
					</a>
					<div class="resume-embed">
						<iframe
							title="English Resume"
							src={ENGLISH_EMBED_URL}
							class="resume-iframe"
							frameborder="0"
							width="800"
							height="1035"
						></iframe>
					</div>
				</div>

				<div class="resume-item" in:fade={{ delay: 100, duration: 200 }}>
					<h3 class="resume-label">{$_('RESUME.japaneseTitle')}</h3>
					<a
						href={JAPANESE_VIEW_URL}
						target="_blank"
						rel="noopener noreferrer"
						class="resume-link"
						aria-label={$_('RESUME.openJapaneseInNewTab')}
					>
						<Card classes="inline-flex cursor-pointer">
							<span class="resume-btn-inner">
								<UIcon icon="i-carbon-open-in-new" />
								<span>{$_('RESUME.openInNewTab')}</span>
							</span>
						</Card>
					</a>
					<div class="resume-embed resume-embed-sheet">
						<iframe
							title="Japanese Resume (履歴書)"
							src={JAPANESE_EMBED_URL}
							class="resume-iframe"
							frameborder="0"
							width="800"
							height="450"
						></iframe>
					</div>
				</div>
			</div>
		</div>
	{/if}
</section>

<style lang="scss">
	.resume-content {
		max-width: 900px;
		margin: 0 auto;
		width: 100%;
	}

	.resume-grid {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		margin-top: 1.5rem;
	}

	.resume-item {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.resume-label {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--main-text);
	}

	.resume-link {
		text-decoration: none;
		color: inherit;
		align-self: flex-start;

		&:hover {
			opacity: 0.9;
		}
	}

	.resume-btn-inner {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.resume-embed {
		aspect-ratio: 8.5 / 11;
		min-height: 60vh;
		border-radius: var(--radius-lg);
		overflow: hidden;
		border: 1px solid var(--border);
	}

	.resume-embed-sheet {
		aspect-ratio: 16 / 9;
		min-height: 50vh;
	}

	.resume-iframe {
		width: 100%;
		height: 100%;
		min-height: 60vh;
		border: none;
		box-sizing: border-box;
	}

	.resume-embed-sheet .resume-iframe {
		min-height: 50vh;
	}

	@media (max-width: 768px) {
		.resume-embed {
			min-height: 50vh;
		}
		.resume-embed-sheet {
			min-height: 40vh;
		}
		.resume-iframe {
			min-height: 50vh;
		}
		.resume-embed-sheet .resume-iframe {
			min-height: 40vh;
		}
	}
</style>
