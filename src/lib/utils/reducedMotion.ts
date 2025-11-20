/**
 * Utility functions for handling reduced motion preferences
 * @module reducedMotion
 */

/**
 * Checks if the user prefers reduced motion
 * @returns true if user prefers reduced motion, false otherwise
 */
export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Gets the appropriate animation duration based on user preferences
 * @param normalDuration Duration in milliseconds for normal motion
 * @param reducedDuration Duration in milliseconds for reduced motion (default: 0)
 * @returns The appropriate duration based on user preference
 */
export function getAnimationDuration(
	normalDuration: number,
	reducedDuration: number = 0
): number {
	return prefersReducedMotion() ? reducedDuration : normalDuration;
}

/**
 * Gets the appropriate transition duration based on user preferences
 * @param normalDuration Duration in milliseconds for normal motion
 * @param reducedDuration Duration in milliseconds for reduced motion (default: 0)
 * @returns The appropriate duration based on user preference
 */
export function getTransitionDuration(
	normalDuration: number,
	reducedDuration: number = 0
): number {
	return prefersReducedMotion() ? reducedDuration : normalDuration;
}

/**
 * Checks if animations should be disabled
 * @returns true if animations should be disabled
 */
export function shouldDisableAnimations(): boolean {
	return prefersReducedMotion();
}

