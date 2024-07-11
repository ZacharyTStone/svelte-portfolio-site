<script lang="ts">
	import { base } from '$app/paths';
	import { getAssetURL } from '$lib/data/assets';
	import type { Project } from '$lib/types';
	import { _ } from 'svelte-i18n';
	import Card from '../Card/Card.svelte';
	import Image from '../Image/Image.svelte';

	export let project: Project;

	const imageSrc = getAssetURL(project.logo);
</script>

<div class="project-container">
	<Card color={project.color} href="{base}/projects/{project.slug}">
		<h2 class="project-title">
			{$_(project.name)}
		</h2>
		<Image
			src={imageSrc}
			alt={$_(project.name)}
			classes="project-image"
			loadingHeight="200px"
			loadingWidth="320px"
		/>
	</Card>
</div>

<style>
	.project-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.project-title {
		color: var(--light-6);
		margin: 0;
		border-radius: 8px;
		opacity: 1;
		transition: opacity 0.3s;
		font-size: 1.5rem;
		font-weight: bold;
		max-width: 100%;
		min-height: 50px;
		text-align: center;
		width: 100%;
	}

	.project-container:hover .project-title {
		background: linear-gradient(
			90deg,
			#ff0000,
			#d96d02,
			#c9c900,
			#01c901,
			#0000ff,
			#4b0082,
			#8b00ff
		);
		background-size: 400%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: rainbow 5s linear infinite;
	}

	:global(.project-image) {
		width: 100%;
		height: 200px;
		object-fit: cover;
		border-radius: 14px;
	}

	@media (max-width: 767px) {
		:global(.project-image) {
			height: auto;
			min-height: 200px;
		}
	}

	@keyframes rainbow {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
