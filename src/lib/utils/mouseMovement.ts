import { readable, type Readable } from 'svelte/store';

export interface MousePosition {
	x: number;
	y: number;
}

/**
 * Create a readable store that tracks the mouse position relative to a container.
 * @param container The element to measure mouse movement against.
 * @param factor Optional multiplier for the returned values.
 */
export function createMouseMovementStore(
	container: HTMLElement | null,
	factor = 5
): Readable<MousePosition> {
	return readable<MousePosition>({ x: 0, y: 0 }, (set) => {
		function handleMouseMove(event: MouseEvent): void {
			if (!container) return;

			const rect = container.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;
			const x = ((event.clientX - centerX) / (rect.width / 2)) * factor;
			const y = ((event.clientY - centerY) / (rect.height / 2)) * factor;

			set({ x, y });
		}

		document.addEventListener('mousemove', handleMouseMove);
		return () => document.removeEventListener('mousemove', handleMouseMove);
	});
}
