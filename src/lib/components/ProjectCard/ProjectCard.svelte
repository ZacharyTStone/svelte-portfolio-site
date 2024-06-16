<script lang="ts">
	import { base } from '$app/paths';
	import { getAssetURL } from '$lib/data/assets';
	import type { Project } from '$lib/types';
	import { _ } from 'svelte-i18n';
	import Card from '../Card/Card.svelte';
	import Image from '../../components/Image.svelte';

	export let project: Project;

	const imageSrc = getAssetURL(project.logo);
</script>

<Card color={project.color} href={`${base}/projects/${project.slug}`}>
	<div class="project-container">
		<h2 class="project-title-no-padding">
			{$_(project.name)}
		</h2>
		<Image src={imageSrc} alt={$_(project.name)} classes="project-image" />
	</div>
</Card>

<style>
	.project-container {
		position: relative;
	}

	:global(.project-image) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 14px;
		min-height: 200px;
		min-width: 100%;
	}

	.project-title-no-padding {
		position: absolute;
		top: -60px;
		left: 0;
		color: var(--light-1);
		margin: 0;
		border-radius: 8px;
		opacity: 0;
		transition: opacity 0.3s;
		font-size: 2rem;
		font-weight: bold;
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
		padding: 0;
	}

	@media (hover: hover) {
		.project-container:hover .project-title-no-padding {
			opacity: 1;
		}
	}

	@media (max-width: 768px) {
		.project-title-no-padding {
			opacity: 1;
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
