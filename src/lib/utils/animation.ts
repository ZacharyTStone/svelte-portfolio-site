/**
 * Animation utility functions for handling 3D effects and animations
 * @module animation
 */

import { prefersReducedMotion } from './reducedMotion';

interface TiltEffectOptions {
	tiltDegree?: number;
	scale?: number;
}

const DEFAULT_TILT_OPTIONS: TiltEffectOptions = {
	tiltDegree: 5,
	scale: 1.01
};

/**
 * Handles the 3D tilt effect for elements on hover
 * @param event Mouse event triggering the tilt
 * @param element Target HTML element to apply the tilt effect to
 * @param options Configuration options for the tilt effect
 */
export const handleTiltEffect = (
	event: MouseEvent,
	element: HTMLElement | null,
	options: TiltEffectOptions = DEFAULT_TILT_OPTIONS
): void => {
	if (!element || !event || prefersReducedMotion()) return;

	const { tiltDegree = 5, scale = 1.01 } = options;
	const rect = element.getBoundingClientRect();
	const { clientX, clientY } = event;
	const { left, top, width, height } = rect;

	// Calculate position for the glow effect
	element.style.setProperty('--drop-x', `${clientX - left}px`);
	element.style.setProperty('--drop-y', `${clientY - top}px`);

	// Calculate rotation based on mouse position relative to center
	const centerX = rect.x + width / 2;
	const centerY = rect.y + height / 2;

	// Bound rotation values to prevent extreme angles
	const boundedTiltDegree = Math.min(Math.max(tiltDegree, 0), 45);

	const rotateY = ((boundedTiltDegree * (clientX - centerX)) / (width / 2)).toFixed(2);
	const rotateX = ((-1 * boundedTiltDegree * (clientY - centerY)) / (height / 2)).toFixed(2);

	// Apply transformations
	element.style.setProperty('--rot-x', `${rotateX}deg`);
	element.style.setProperty('--rot-y', `${rotateY}deg`);
	element.style.setProperty('--scale', `${scale}`);
};

/**
 * Resets the tilt effect on an element
 * @param element Target HTML element to reset
 */
export const resetTiltEffect = (element: HTMLElement | null): void => {
	if (!element) return;

	const style = element.style;
	style.setProperty('--rot-x', '0deg');
	style.setProperty('--rot-y', '0deg');
	style.setProperty('--scale', '1');
};

/**
 * Changes the opacity of a hex color
 * Re-exported from helpers for convenience
 */
export { changeColorOpacity as adjustColorOpacity } from './helpers';

interface PerspectiveOptions {
	intensity?: number;
	maxRotation?: number;
}

const DEFAULT_PERSPECTIVE_OPTIONS: PerspectiveOptions = {
	intensity: 0.1,
	maxRotation: 10
};

/**
 * Creates perspective transformation for container elements
 * @param mouseX Horizontal position factor (-1 to 1)
 * @param mouseY Vertical position factor (-1 to 1)
 * @param options Configuration options for the perspective effect
 * @returns CSS transform string for the perspective effect
 */
export const createContainerPerspective = (
	mouseX: number,
	mouseY: number,
	options: PerspectiveOptions = DEFAULT_PERSPECTIVE_OPTIONS
): string => {
	const { intensity = 0.1, maxRotation = 10 } = options;

	// Bound input values to prevent extreme transformations
	const boundedX = Math.min(Math.max(mouseX, -maxRotation), maxRotation);
	const boundedY = Math.min(Math.max(mouseY, -maxRotation), maxRotation);
	const boundedIntensity = Math.min(Math.max(intensity, 0), 1);

	return `perspective(1000px) rotateX(${boundedY * -boundedIntensity}deg) rotateY(${boundedX * boundedIntensity}deg)`;
};
