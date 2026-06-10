<script lang="ts">
	import { browser } from '$app/environment';
	import AboutStage from '$lib/components/Stages/AboutStage.svelte';
	import ContactStage from '$lib/components/Stages/ContactStage.svelte';
	import ExperienceStage from '$lib/components/Stages/ExperienceStage.svelte';
	import HeroStage from '$lib/components/Stages/HeroStage.svelte';
	import ProjectsStage from '$lib/components/Stages/ProjectsStage.svelte';
	import ResumeStage from '$lib/components/Stages/ResumeStage.svelte';
	import SceneCanvas from '$lib/components/Scene/SceneCanvas.svelte';
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
	<SceneCanvas />
	<HeroStage />
	<AboutStage />
	<ExperienceStage />
	<ProjectsStage />
	<SkillsStage />
	<ResumeStage />
	<ContactStage />
</div>

<style lang="scss">
	/* On the home page the parent <main> has no .container max-width, so there
	   is nothing to break out of.  Using width:100% (instead of 100vw) avoids
	   the margin-inline: calc(50% – 50vw) trick which shifts content to the
	   right whenever any upstream element causes even 1–2 px of horizontal
	   overflow — the root cause of cards being clipped on mobile. */
	.spa-root {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		isolation: isolate;
		background: var(--main);
		color: var(--main-text);
		/* Prevent any stray child from widening the page */
		overflow-x: clip;
	}
</style>
