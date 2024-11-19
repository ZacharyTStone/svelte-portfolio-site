<script lang="ts">
	import Chip from '$lib/components/Chip/Chip.svelte';
	import CommonPage from '$lib/components/Page/CommonPage.svelte';
	import { RESUME } from '$lib/params';
	import Card from '$lib/components/Card/Card.svelte';
	const { links, title } = RESUME;
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';

	async function handleNavigation(event: Event, to: string) {
		event.preventDefault();
		try {
			await goto(to);
		} catch (error) {
			console.error('Navigation error:', error);
		}
	}
</script>

<CommonPage {title}>
	<div class="resume">
		{#if links?.length}
			{#each links as item}
				<Card onClick={(e) => handleNavigation(e, item.to)}>{$_(item?.label)}</Card>
			{/each}
		{:else}
			<Chip>Ooops! no CV at the moment.</Chip>
		{/if}
	</div>
</CommonPage>

<style lang="scss">
	.resume {
		display: flex;
		justify-content: center;
		margin-top: 20px;
		align-items: center;
		gap: 20px;
		flex-direction: column;
	}
</style>
