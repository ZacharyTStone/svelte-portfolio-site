<script lang="ts">
	export let icon = '';
	export let alt = '';
	export let classes = '';
</script>

<i class={`${icon} ${classes}`} aria-label={alt} />
