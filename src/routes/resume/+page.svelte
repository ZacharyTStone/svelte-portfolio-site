<script lang="ts">
	import CommonPage from '$lib/components/Page/CommonPage.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let mounted = false;
	onMount(() => {
		mounted = true;
	});

	const resumeTitle = 'NAVBAR.resume';

	function safeTranslate(key: string): string {
		if (!browser) {
			return key.split('.').pop() || key;
		}
		try {
			return $_(key);
		} catch {
			return key.split('.').pop() || key;
		}
	}

	// English resume (Google Doc)
	const ENGLISH_EMBED_URL =
		'https://docs.google.com/document/d/e/2PACX-1vRVDXfDkTn6AvxeU70wXzjhsJs-7qY6J7EQjOGz0307qjrXFy04sPbnb4r0_MxnDIJo9YnGshQeqMFx/pub?embedded=true';
	const ENGLISH_VIEW_URL =
		'https://docs.google.com/document/d/e/2PACX-1vRVDXfDkTn6AvxeU70wXzjhsJs-7qY6J7EQjOGz0307qjrXFy04sPbnb4r0_MxnDIJo9YnGshQeqMFx/pub';

	// Japanese resume (Google Sheet) - published embed
	const JAPANESE_EMBED_URL =
		'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeQn4d1KAeHMUwJvOjODjy0LvM4X84VHBD94ddJfqxtEnSpz01YPqLd4nNh-c24A/pubhtml?widget=true&headers=false';
	const JAPANESE_VIEW_URL =
		'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeQn4d1KAeHMUwJvOjODjy0LvM4X84VHBD94ddJfqxtEnSpz01YPqLd4nNh-c24A/pubhtml?widget=true&headers=false';
</script>

<svelte:head>
	<title>{safeTranslate(resumeTitle)}</title>
</svelte:head>

<CommonPage title={resumeTitle}>
	<div class="max-w-full mx-auto px-2 py-1 relative">
		<main class="text-left relative flex flex-col gap-10 md:gap-14" style="z-index: 0;">
			{#if mounted}
				<!-- English Resume -->
				<section class="resume-section" in:fade={{ duration: 200 }}>
					<h2 class="resume-section-title">{$_('RESUME.englishTitle')}</h2>
					<div class="resume-actions flex flex-wrap gap-2 mb-3">
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
					</div>
					<div
						class="resume-embed-wrapper mx-auto w-full max-w-[900px] rounded-lg overflow-hidden border border-[var(--secondary)]"
					>
						<iframe
							title="English Resume"
							src={ENGLISH_EMBED_URL}
							class="resume-iframe"
							frameborder="0"
							width="800"
							height="1035"
						></iframe>
					</div>
				</section>

				<!-- Japanese Resume (履歴書) -->
				<section class="resume-section" in:fade={{ delay: 100, duration: 200 }}>
					<h2 class="resume-section-title">{$_('RESUME.japaneseTitle')}</h2>
					<div class="resume-actions flex flex-wrap gap-2 mb-3">
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
					</div>
					<div
						class="resume-embed-wrapper resume-embed-sheet mx-auto w-full max-w-[900px] rounded-lg overflow-hidden border border-[var(--secondary)]"
					>
						<iframe
							title="Japanese Resume (履歴書)"
							src={JAPANESE_EMBED_URL}
							class="resume-iframe"
							frameborder="0"
							width="800"
							height="450"
						></iframe>
					</div>
				</section>
			{/if}
		</main>
	</div>
</CommonPage>

<style>
	.resume-section {
		display: flex;
		flex-direction: column;
	}

	.resume-section-title {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
		color: var(--main-text);
	}

	.resume-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.resume-link {
		text-decoration: none;
		color: inherit;
	}

	.resume-link:hover {
		opacity: 0.9;
	}

	.resume-btn-inner {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
	}

	.resume-embed-wrapper {
		aspect-ratio: 8.5 / 11;
		min-height: 70vh;
	}

	.resume-embed-sheet {
		aspect-ratio: 16 / 9;
		min-height: 60vh;
	}

	.resume-iframe {
		width: 100%;
		height: 100%;
		min-height: 70vh;
		border: 1px solid var(--secondary);
		box-sizing: border-box;
	}

	.resume-embed-sheet .resume-iframe {
		min-height: 60vh;
	}
</style>
