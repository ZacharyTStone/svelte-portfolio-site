<script lang="ts">
	import { TITLE_SUFFIX } from '$lib/params';
	import { useTitle } from '$lib/utils/helpers';
	import { _ } from 'svelte-i18n';

	let { title } = $props<{ title: string }>();
</script>

<svelte:head>
	<title>{$_(title)}</title>
</svelte:head>
