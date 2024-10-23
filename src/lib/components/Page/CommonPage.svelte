<script lang="ts">
	import MainTitle from '../MainTitle/MainTitle.svelte';
	import TabTitle from './TabTitle.svelte';
	import { _ } from 'svelte-i18n';

	let { title = $bindable('Title'), children } = $props<{
		title?: string;
		children: () => any;
	}>();
</script>

<TabTitle {title} />
<div class="flex-1 col gap-5 px-2 sm:px-4 md:px-6 py-4 sm:py-8 md:py-12">
	<MainTitle>{$_(title)}</MainTitle>
	<div class="col gap-5 flex-1">
			{@render children()}
	</div>
</div>
