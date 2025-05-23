<script lang="ts">
	/**
	 * Component props interface
	 */
	interface Props {
		/** Input value */
		value?: string;
		/** Placeholder text */
		placeholder?: string;
		/** ARIA label for accessibility */
		'aria-label'?: string;
		/** ARIA labelledby reference */
		'aria-labelledby'?: string;
		/** ARIA described by reference */
		'aria-describedby'?: string;
		/** Whether input is required */
		required?: boolean;
		/** Name attribute for the input */
		name?: string;
		/** Type of input */
		type?: string;
		/** Whether to spellcheck */
		spellcheck?: boolean;
	}

	let {
		value = $bindable(''),
		placeholder = '',
		'aria-label': ariaLabel = undefined,
		'aria-labelledby': ariaLabelledby = undefined,
		'aria-describedby': ariaDescribedby = undefined,
		required = false,
		name = undefined,
		type = 'text',
		spellcheck = false
	}: Props = $props();
</script>

<input
	bind:value
	{placeholder}
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	aria-describedby={ariaDescribedby}
	{required}
	{name}
	{type}
	autocomplete="off"
	{spellcheck}
	class="text-inherit bg-transparent border border-solid border-[var(--border)] px-5 py-2.5 rounded-xl flex-1 text-lg focus:outline-1 focus:outline-[var(--border-hover)] focus:bg-[var(--main-hover)]"
/>

<style lang="scss">
	input {
		&:focus {
			outline: 1px solid var(--border-hover);
			background-color: var(--main-hover);
		}
	}
</style>
