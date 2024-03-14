<script lang="ts">
	import { countMonths, getMonthName } from '$lib/utils/helpers';
	import Chip from '../Chip/Chip.svelte';
	import Card from '../Card/Card.svelte';
	import CardTitle from '../Card/CardTitle.svelte';
	import CardLink from '../Card/CardLink.svelte';
	import CardDivider from '../Card/CardDivider.svelte';
	import ChipIcon from '../Chip/ChipIcon.svelte';
	import CardLogo from '../Card/CardLogo.svelte';
	import type { Project } from '$lib/types';
	import Assets, { getAssetURL } from '$lib/data/assets';
	import { base } from '$app/paths';
	import { _ } from 'svelte-i18n';
	import { Icons } from '$lib/utils/index';

	export let project: Project;

	console.log(project);

	let isHovered = false;

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
	}
</script>

<Card color={project.color} href={`${base}/projects/${project.slug}`}>
	{#if !project.video || !isHovered}
		<a data-sveltekit-preload-data="tap" href={`${base}/projects/${project.slug}`}>
			<img
				src={getAssetURL(project.logo)}
				alt={$_(project.name)}
				class="project-image"
				on:mouseenter={handleMouseEnter}
				on:mouseleave={handleMouseLeave}
			/>
		</a>
	{/if}

	{#if project.links && project.links.length > 0 && isHovered}
		<video
			src={project.links.find((link) => link.label === 'YouTube')?.to}
			autoplay
			loop
			muted
			class="project-video"
			on:mouseenter={handleMouseEnter}
			on:mouseleave={handleMouseLeave}
		/>
	{/if}

	<h2 class="project-title">{$_(project.name)}</h2>
</Card>

<style>
	.project-image,
	.project-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}

	.project-title {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: var(--dark-0-60);
		color: var(--light-1);
		padding: 10px;
		margin: 0;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
	}

	.project-video {
		display: none; /* initially hide video */
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}

	.project-video[src] {
		display: block; /* display video when src is available */
	}
</style>
