<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	interface Props {
		to: string;
	}

	let { to }: Props = $props();

	function safeT(key: string): string {
		if (!browser) return key.split('.').pop() || key;
		try {
			return $_(key);
		} catch {
			return key.split('.').pop() || key;
		}
	}

	onMount(() => {
		goto(to, { replaceState: true });
	});
</script>

<svelte:head>
	<meta http-equiv="refresh" content="0;url={to}" />
</svelte:head>

<noscript>
	<div class="redirect-fallback">
		<p>{safeT('COMMON.redirecting_to')} <a href={to}>{to}</a>&hellip;</p>
	</div>
</noscript>

<style>
	.redirect-fallback {
		padding: 2rem;
		text-align: center;
		color: var(--secondary-text);
	}
</style>
