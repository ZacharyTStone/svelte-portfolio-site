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
	export let project: Project;
	import { Icons } from '$lib/utils/index';
</script>

<div class="card-container">
	<Card
		color={project.color}
		href={`${base}/projects/${project.slug}`}
		classes={['card']}
		style="position: relative; overflow: visible; height: 100%; max-width: 90vw; max-height: 90vh;"
	>
		<div class="project-image" style=" width: 100%; height: 100%">
			<!-- Adjusting object-fit to cover the entire card -->
			<img
				src={getAssetURL(project.logo)}
				alt={project.name}
				style="width: 100%; height: 100%; object-fit: cover;"
			/>
		</div>
		<div
			class="bg-[var(--main)] text-[var(--main-text)] rounded-15px p-10px
			 border-1px border-solid border-[var(--border)] shadow-1 z-10 absolute bottom-0 right-0"
			style="position: absolute; bottom: 0; right: 0;  padding: 10px;  transform: translateY(50%) translateX(10%);  background-color: var(--main);  border-color: var(--border-color);  color: var(--main-text);   z-index: 1;  box-shadow: 0 0 10px 0 var(--drop-color);"
		>
			<div class="title" style="font-size: 1.2em; color: var(--main-text)">{$_(project.name)}</div>
		</div>
	</Card>
</div>
