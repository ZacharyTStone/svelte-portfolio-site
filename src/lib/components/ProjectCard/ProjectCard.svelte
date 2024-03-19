<script lang="ts">
	import { base } from '$app/paths';
	import { getAssetURL } from '$lib/data/assets';
	import type { Project } from '$lib/types';
	import { _ } from 'svelte-i18n';
	import { writable } from 'svelte/store';
	import Card from '../Card/Card.svelte';
	import Image from '../../components/Image.svelte';

	export let project: Project;
	export let noPadding: boolean = false;

	let imageSrc = getAssetURL(project.logo);
</script>

<Card color={project.color} href={`${base}/projects/${project.slug}`}>
	<Image src={imageSrc} alt={$_(project.name)} classes="project-image" />
	<h2 class={noPadding ? 'project-title-no-padding' : 'project-title'}>
		&nbsp;
		{$_(project.name)}
	</h2>
</Card>

<style>
	:global(.project-image) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 14px;

		min-height: 200px;
		min-width: '100%';
	}

	.project-title,
	.project-title-no-padding {
		position: absolute;
		bottom: 0px;
		left: 0;
		right: 0;
		background-color: var(--dark-0-60);
		color: var(--light-1);
		padding: 10px;
		margin: 0;
		border-bottom-left-radius: 14px;
		border-bottom-right-radius: 14px;
		opacity: 0; /* 初期状態では非表示 */
		transition: opacity 0.3s; /* 透明度の変化を滑らかに */
	}

	.project-title-no-padding {
		padding: 0;
	}

	@media (max-width: 1024px) {
		:global(.project-title),
		:global(.project-title-no-padding) {
			opacity: 1 !important; /* モバイルでは常に表示 */
		}
	}

	/* ホバー時にタイトルを表示 */
	@media (hover: hover) {
		:global(.card:hover .project-title),
		:global(.card:hover .project-title-no-padding) {
			opacity: 1;
		}
	}
</style>
