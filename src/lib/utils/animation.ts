/**
 * Animation utility functions for handling 3D effects and animations
 * @module animation
 */

/**
 * Handles the 3D tilt effect for elements on hover
 * @param event Mouse event triggering the tilt
 * @param element Target HTML element to apply the tilt effect to
 * @param tiltDegree Maximum degree of tilt (default: 10)
 * @param scale Scale factor for hover effect (default: 1.02)
 */
export const handleTiltEffect = (
	event: MouseEvent,
	element: HTMLElement | null,
	tiltDegree: number = 10,
	scale: number = 1.02
): void => {
	if (!element || !event) return;

	try {
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

		// Bound rotation values to prevent extreme angles
		const boundedTiltDegree = Math.min(Math.max(tiltDegree, 0), 45);

		const rotateY = ((boundedTiltDegree * mouseX) / (width / 2)).toFixed(2);
		const rotateX = ((-1 * (boundedTiltDegree * mouseY)) / (height / 2)).toFixed(2);

		element.style.setProperty('--rot-x', `${rotateX}deg`);
		element.style.setProperty('--rot-y', `${rotateY}deg`);
		element.style.setProperty('--scale', `${scale}`);
	} catch (error) {
		console.warn('Error applying tilt effect:', error);
	}
};

/**
 * Resets the tilt effect on an element
 * @param element Target HTML element to reset
 */
export const resetTiltEffect = (element: HTMLElement | null): void => {
	if (!element) return;

	try {
		element.style.setProperty('--rot-x', '0deg');
		element.style.setProperty('--rot-y', '0deg');
		element.style.setProperty('--scale', '1');
	} catch (error) {
		console.warn('Error resetting tilt effect:', error);
	}
};

/**
 * Changes the opacity of a hex color
 * Re-exported from helpers for convenience
 */
export { changeColorOpacity as adjustColorOpacity } from './helpers';

/**
 * Creates perspective transformation for container elements
 * @param mouseX Horizontal position factor (-1 to 1)
 * @param mouseY Vertical position factor (-1 to 1)
 * @param intensity Intensity of the perspective effect (default: 0.1)
 * @returns CSS transform string for the perspective effect
 */
export const createContainerPerspective = (
	mouseX: number,
	mouseY: number,
	intensity: number = 0.1
): string => {
	// Bound input values to prevent extreme transformations
	const boundedX = Math.min(Math.max(mouseX, -10), 10);
	const boundedY = Math.min(Math.max(mouseY, -10), 10);
	const boundedIntensity = Math.min(Math.max(intensity, 0), 1);

	return `perspective(1000px) rotateX(${boundedY * -boundedIntensity}deg) rotateY(${boundedX * boundedIntensity}deg)`;
};
