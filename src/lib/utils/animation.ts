/**
 * Animation utility functions for handling 3D effects and animations
 */

/**
 * Handles the 3D tilt effect for elements on hover
 */
export const handleTiltEffect = (
	event: MouseEvent,
	element: HTMLElement | null,
	tiltDegree: number = 10,
	scale: number = 1.02
): void => {
	if (!element) return;

	const rect = element.getBoundingClientRect();

	// Calculate position for the glow effect
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;

	element.style.setProperty('--drop-x', `${x}px`);
	element.style.setProperty('--drop-y', `${y}px`);

	// Calculate rotation based on mouse position relative to center
	const width = element.offsetWidth;
	const height = element.offsetHeight;

	const centerX = rect.x + width / 2;
	const centerY = rect.y + height / 2;

	const mouseX = event.clientX - centerX;
	const mouseY = event.clientY - centerY;

	const rotateY = ((tiltDegree * mouseX) / (width / 2)).toFixed(2);
	const rotateX = ((-1 * (tiltDegree * mouseY)) / (height / 2)).toFixed(2);

	element.style.setProperty('--rot-x', `${rotateX}deg`);
	element.style.setProperty('--rot-y', `${rotateY}deg`);
	element.style.setProperty('--scale', `${scale}`);
};

/**
 * Changes the opacity of a hex color
 */
export { changeColorOpacity as adjustColorOpacity } from './helpers';

/**
 * Creates perspective transformation for container elements
 */
export const createContainerPerspective = (
	mouseX: number,
	mouseY: number,
	intensity: number = 0.1
): string => {
	return `perspective(1000px) rotateX(${mouseY * -intensity}deg) rotateY(${mouseX * intensity}deg)`;
};
