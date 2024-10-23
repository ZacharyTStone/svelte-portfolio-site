<script lang="ts">
	import { _ } from 'svelte-i18n';
	interface Props {
		title: string;
	}

	let { title }: Props = $props();
</script>

<h3 class="font-[var(--title-f)] text-1.25em">{$_(title)}</h3>
