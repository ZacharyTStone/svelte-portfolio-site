<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import { handleNavigation } from '$lib/utils/helpers';
	import { _ } from 'svelte-i18n';
	import type { MousePosition } from '$lib/utils/mouseMovement';

	export let mousePosition: MousePosition;
	export let name: string;
	export let lastName: string;
	export let description: string;
</script>

<div
	class="hero-container relative items-center overflow-hidden bg-transparent"
	style="--mouse-x: {mousePosition.x}deg; --mouse-y: {mousePosition.y}deg;"
	role="main"
	aria-labelledby="hero-title"
>
	<div class="asymmetric-grid">
		<div class="hero-content-left">
			<h1 id="hero-title" class="hero-title">
				{$_(name)} <span class="last-name">{$_(lastName)}</span>
			</h1>
			<div class="floating-element shape-1" aria-hidden="true"></div>
		</div>

		<div class="hero-content-right">
			<h3 class="hero-description font-text text-accent-text">
				{$_(description)}
			</h3>
			<div class="cta-button">
				<Card
					nofade={true}
					enhanced3d={true}
					onClick={(e) => handleNavigation(e, '/about')}
					ariaLabel={$_('ABOUT.cta')}
				>
					{$_('ABOUT.cta')}
				</Card>
			</div>
			<div class="floating-element shape-2" aria-hidden="true"></div>
		</div>
	</div>
</div>

<style>
	/* ... existing styles ... */
</style>
