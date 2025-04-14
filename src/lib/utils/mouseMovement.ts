import { onMount } from 'svelte';

export interface MousePosition {
	x: number;
	y: number;
}

export function useMouseMovement(container: HTMLElement | null): MousePosition {
	let mouseX = 0;
	let mouseY = 0;

	function handleMouseMove(event: MouseEvent): void {
		if (!container) return;

		const rect = container.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		mouseX = ((event.clientX - centerX) / (rect.width / 2)) * 5;
		mouseY = ((event.clientY - centerY) / (rect.height / 2)) * 5;
	}

	onMount(() => {
		document.addEventListener('mousemove', handleMouseMove);
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
		};
	});

	return { x: mouseX, y: mouseY };
}
