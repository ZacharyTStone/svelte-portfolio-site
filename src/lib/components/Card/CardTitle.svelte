<script lang="ts">
	export let title: string;
	import { _ } from 'svelte-i18n';
</script>

<h3 class="font-[var(--title-f)] text-1.25em">{$_(title)}</h3>
