<script lang="ts">
	import { browser } from '$app/environment';
	import AboutStage from '$lib/components/Stages/AboutStage.svelte';
	import ContactStage from '$lib/components/Stages/ContactStage.svelte';
	import ExperienceStage from '$lib/components/Stages/ExperienceStage.svelte';
	import HeroStage from '$lib/components/Stages/HeroStage.svelte';
	import ProjectsStage from '$lib/components/Stages/ProjectsStage.svelte';
	import SkillsStage from '$lib/components/Stages/SkillsStage.svelte';
	import { HOME, TITLE_SUFFIX } from '$lib/params';
	import { setupActiveSectionObserver } from '$lib/stores/activeSection';
	import { useTitle } from '$lib/utils/helpers';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	const { title, description } = HOME;

	function safeT(key: string): string {
		if (!browser) return key.split('.').pop() || key;
		try {
			return $_(key);
		} catch {
			return key.split('.').pop() || key;
		}
	}

	onMount(() => {
		const cleanup = setupActiveSectionObserver();
		return cleanup;
	});
</script>

<svelte:head>
	<title>{useTitle(title, TITLE_SUFFIX)}</title>
	<meta name="description" content={safeT(description)} />
</svelte:head>

<div class="spa-root">
	<HeroStage />
	<AboutStage />
	<ExperienceStage />
	<ProjectsStage />
	<SkillsStage />
	<ContactStage />
</div>

<style lang="scss">
	/* Break out of the parent .container 1200px max-width so SPA stages can be
	   full-bleed. The ancestor body uses overflow-x: clip to suppress horizontal
	   scrollbars; this is safe and well-supported. */
	.spa-root {
		position: relative;
		width: 100vw;
		margin-inline: calc(50% - 50vw);
		display: flex;
		flex-direction: column;
		isolation: isolate;
		background: var(--main);
		color: var(--main-text);
	}
</style>
