<script lang="ts">
	export let classes = '';
</script>

<h1
	class={`font-bold text-center sm:text-5xl text-3xl overflow-visible ${classes}`}
	style="background: linear-gradient(var(--main-text), var(--accent-text-hover)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; word-wrap: break-word; white-space: normal;"
>
	<slot />
</h1>
