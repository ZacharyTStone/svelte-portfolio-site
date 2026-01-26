<script lang="ts">
	import ExperienceCard from '$lib/components/ExperienceCard/ExperienceCard.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import CommonPage from '$lib/components/Page/CommonPage.svelte';
	import { EXPERIENCES } from '$lib/params';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	const { items, title } = EXPERIENCES;

	let visibleItems = $state(new Set<number>());

	onMount(() => {
		let index = 0;
		const interval = setInterval(() => {
			if (index < items.length) {
				visibleItems = new Set([...visibleItems, index]);
				index++;
			} else {
				clearInterval(interval);
			}
		}, 300);

		// Cleanup interval on unmount
		return () => {
			clearInterval(interval);
		};
	});
</script>

<CommonPage {title}>
	<div class="col items-center relative mt-10 flex-1">
		<div
			class="w-[0.5px] hidden lg:flex top-0 bottom-0 py-50px bg-[var(--border)] absolute rounded"
		></div>
		{#each items as job, index (job.slug)}
			{#if visibleItems.has(index)}
				<div
					class={`flex ${
						index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
					} relative items-center w-full my-[10px]`}
					in:fly={{ x: index % 2 === 0 ? -100 : 100, duration: 800 }}
				>
					<div class="flex-1 hidden lg:flex"></div>
					<div class="hidden lg:inline p-15px bg-[var(--main)] rounded">
						<UIcon icon="i-carbon-condition-point" classes="" />
					</div>
					<div class="flex-1 col items-stretch">
						<ExperienceCard experience={job} />
					</div>
				</div>
			{/if}
		{/each}
	</div>
</CommonPage>
