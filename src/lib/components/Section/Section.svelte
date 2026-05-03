<script lang="ts">
	interface Props {
		id: string;
		eyebrow?: string;
		heading?: string;
		children?: import('svelte').Snippet;
		actions?: import('svelte').Snippet;
		fullBleed?: boolean;
	}

	let { id, eyebrow, heading, children, actions, fullBleed = false }: Props = $props();
</script>

<section
	{id}
	class="spa-section"
	class:full-bleed={fullBleed}
	aria-labelledby={heading ? `${id}-heading` : undefined}
>
	<div class="section-inner" class:contained={!fullBleed}>
		{#if eyebrow || heading}
			<header class="section-header">
				{#if eyebrow}
					<div class="mono-eyebrow section-eyebrow">{eyebrow}</div>
				{/if}
				{#if heading}
					<h2 id="{id}-heading" class="section-heading display-type">{heading}</h2>
				{/if}
				{#if actions}
					<div class="section-actions">{@render actions()}</div>
				{/if}
			</header>
		{/if}
		<div class="section-body">
			{@render children?.()}
		</div>
	</div>
</section>

<style lang="scss">
	.spa-section {
		position: relative;
		padding-block: var(--space-section);
		min-height: 60vh;

		&.full-bleed {
			padding-inline: 0;
		}
	}

	.section-inner {
		width: 100%;

		&.contained {
			max-width: 1200px;
			margin: 0 auto;
			padding-inline: clamp(1rem, 4vw, 2.5rem);
		}
	}

	.section-header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-md);
		margin-bottom: clamp(2rem, 5vh, 4rem);
	}

	.section-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;

		&::before {
			content: '';
			width: 2.5em;
			height: 1px;
			background: var(--accent-electric);
			opacity: 0.6;
		}
	}

	.section-heading {
		font-size: var(--fs-display-sm);
		margin: 0;
		max-width: 18ch;
		color: var(--main-text);
	}

	.section-actions {
		margin-top: var(--space-sm);
	}

	.section-body {
		width: 100%;
	}

	@media (max-width: 768px) {
		.spa-section {
			min-height: auto;
		}
	}
</style>
