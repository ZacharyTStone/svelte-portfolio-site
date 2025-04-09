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
	class="text-[inherit] bg-transparent border-[1px] border-solid border-[var(--border)] px-[20px] py-[10px] rounded-[15px] flex-1 text-[1.15em]"
/>

<style lang="scss">
	input {
		&:focus {
			outline: 1px solid var(--border-hover);
			background-color: var(--main-hover);
		}
	}
</style>
