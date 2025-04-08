<script lang="ts">
	import { getAssetURL } from '$lib/data/assets';
	import type { Project } from '$lib/types';
	import { handleNavigation } from '$lib/utils/helpers';
	import { _ } from 'svelte-i18n';
	import Card from '../Card/Card.svelte';
	import Image from '../Image/Image.svelte';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();

	const imageSrc = getAssetURL(project.logo);
</script>

<div
	class="project-container flex flex-col items-center transition duration-300 ease-in-out hover:scale-102"
>
	<Card onClick={(e) => handleNavigation(e, `/projects/${project.slug}`)}>
		<h2
			class="project-title text-main-text m-0 rounded-lg opacity-100 transition duration-300 text-2xl max-w-full min-h-[50px] text-center w-full"
		>
			{$_(project.name)}
		</h2>
		<Image
			src={imageSrc}
			alt={$_(project.name)}
			classes="w-full object-cover rounded-xl h-[200px]"
			loadingHeight="200px"
			loadingWidth="320px"
		/>
	</Card>
</div>
