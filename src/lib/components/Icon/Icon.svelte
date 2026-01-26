<script lang="ts">
	import { Icons } from '$lib/utils';
	import { viewBox } from './Icons';

	interface Props {
		size?: string;
		color?: string;
		icon: string;
	}

	let { size = '30px', color = 'var(--main-text)', icon }: Props = $props();
</script>

<svg class="inline-block" viewBox={viewBox(icon as Icons)} fill={color} height={size} width={size}>
	<path d={icon} />
</svg>
