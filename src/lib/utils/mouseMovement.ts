import { readable, type Readable } from 'svelte/store';

export interface MousePosition {
	x: number;
	y: number;
}

/**
 * Track mouse movement relative to a container and expose the coordinates as a readable store.
 */
export function useMouseMovement(container: HTMLElement | null): Readable<MousePosition> {
	return readable<MousePosition>({ x: 0, y: 0 }, (set) => {
		function handleMouseMove(event: MouseEvent): void {
			if (!container) return;

			const rect = container.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const x = ((event.clientX - centerX) / (rect.width / 2)) * 5;
			const y = ((event.clientY - centerY) / (rect.height / 2)) * 5;

			set({ x, y });
		}

		document.addEventListener('mousemove', handleMouseMove);
		return () => document.removeEventListener('mousemove', handleMouseMove);
	});
}
