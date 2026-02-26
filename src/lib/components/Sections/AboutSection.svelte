<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import GitHubContributions from '$lib/components/GitHubContributions/GitHubContributions.svelte';
	import SectionTitle from './SectionTitle.svelte';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<section id="about" class="spa-section">
	<SectionTitle>{$_('NAVBAR.about')}</SectionTitle>
	<div class="about-content">
		{#if mounted}
			<div class="about-grid" in:fade={{ duration: 300 }}>
				<div class="about-bio">
					<Card classes={'w-full'}>
						<h3 class="text-xl font-semibold mb-2 md:text-2xl pb-2">
							{$_('ABOUT.title')}
						</h3>
						<p class="text-base md:text-lg leading-relaxed">
							{$_('ABOUT.full_about')}
						</p>
					</Card>
				</div>
				<div class="about-github">
					<GitHubContributions
						username="ZacharyTStone"
						weeks={53}
						title="My GitHub Activity"
					/>
				</div>
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	.about-content {
		max-width: 900px;
		margin: 0 auto;
		width: 100%;
	}

	.about-grid {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.about-bio,
	.about-github {
		width: 100%;
	}
</style>
