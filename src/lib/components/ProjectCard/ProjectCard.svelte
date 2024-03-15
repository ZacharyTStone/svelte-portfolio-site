<script lang="ts">
	import { base } from '$app/paths';
	import { getAssetURL } from '$lib/data/assets';
	import type { Project } from '$lib/types';
	import { _ } from 'svelte-i18n';
	import { writable } from 'svelte/store';
	import Card from '../Card/Card.svelte';

	export let project: Project;
	let isImageLoaded = writable(false);

	// Subscribe to changes in the store for debugging purposes
	isImageLoaded.subscribe((value) => console.log('Image loaded:', value));

	// Load the image only once
	let loadImage = () => {
		isImageLoaded.set(true);
	};

	let imageSrc = getAssetURL(project.logo);
	$: imageSrc, loadImage();
</script>

{#if $isImageLoaded}
	<Card color={project.color} href={`${base}/projects/${project.slug}`}>
		<img src={imageSrc} alt={$_(project.name)} class="project-image" />
		<h2 class="project-title">{$_(project.name)}</h2>
	</Card>
{:else}
	<Card color={project.color} href={`${base}/projects/${project.slug}`}>
		<div class="loading-placeholder" />
		<h2 class="project-title">{$_(project.name)}</h2>
	</Card>
{/if}

<style>
	.project-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-bottom-left-radius: 14px;
		border-bottom-right-radius: 14px;
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
		border-bottom-left-radius: 14px;
		border-bottom-right-radius: 14px;
	}

	@keyframes loading {
		0% {
			background-color: #f0f0f0;
		}
		50% {
			background-color: #e0e0e0;
		}
		100% {
			background-color: #f0f0f0;
		}
	}

	.loading-placeholder {
		animation: loading 1.5s infinite;
		width: 100%;
		height: 200px;
		border-radius: 14px;
	}
</style>
