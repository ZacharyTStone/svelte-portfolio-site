<script lang="ts">
	import { TITLE_SUFFIX } from '$lib/params';
	import { useTitle } from '$lib/utils/helpers';

	export let title: string;
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{useTitle($_(title), TITLE_SUFFIX)}</title>
</svelte:head>
