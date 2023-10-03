<script>
	import Chip from '$lib/components/Chip/Chip.svelte';
	import CommonPage from '$lib/components/CommonPage.svelte';
	import { RESUME } from '$lib/params';
	import Card from '$lib/components/Card/Card.svelte';
	const { links, title } = RESUME;
</script>

<CommonPage {title}>
	<div class="resume">
		{#if links?.length}
			{#each links as item}
				<a href={item.to} target={item.newTab ? '_blank' : '_self'}>
					<Card>{item?.label}</Card>
				</a>
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

		& > a {
			color: inherit;
		}
	}
</style>
