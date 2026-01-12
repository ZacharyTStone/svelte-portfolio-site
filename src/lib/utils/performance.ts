/**
 * Performance monitoring utilities
 */

/**
 * Performance mark names
 */
export const PerformanceMarks = {
	PAGE_LOAD: 'page-load',
	COMPONENT_MOUNT: 'component-mount',
	NAVIGATION_START: 'navigation-start',
	NAVIGATION_END: 'navigation-end'
} as const;

/**
 * Create a performance mark
 */
export function mark(name: string): void {
	if (typeof performance !== 'undefined' && performance.mark) {
		performance.mark(name);
	}
}

/**
 * Measure performance between two marks
 */
export function measure(name: string, startMark: string, endMark: string): PerformanceEntry | null {
	if (typeof performance !== 'undefined' && performance.measure) {
		try {
			performance.measure(name, startMark, endMark);
			return performance.getEntriesByName(name)[0] || null;
		} catch (error) {
			console.warn(`Performance measure failed: ${name}`, error);
			return null;
		}
	}
	return null;
}

/**
 * Get all performance entries for a specific name
 */
export function getPerformanceEntries(name: string): PerformanceEntry[] {
	if (typeof performance !== 'undefined' && performance.getEntriesByName) {
		return performance.getEntriesByName(name);
	}
	return [];
}

/**
 * Measure page load time
 */
export function measurePageLoad(): void {
	if (typeof window === 'undefined') return;

	window.addEventListener('load', () => {
		mark(PerformanceMarks.PAGE_LOAD);
		
		// Measure navigation timing if available
		if (performance.getEntriesByType) {
			const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
			if (navTiming) {
				const loadTime = navTiming.loadEventEnd - navTiming.fetchStart;
				console.debug(`Page load time: ${loadTime.toFixed(2)}ms`);
			}
		}
	});
}

/**
 * Measure component render time
 */
export function measureComponentRender(componentName: string): () => void {
	const startMark = `${componentName}-start`;
	const endMark = `${componentName}-end`;
	
	mark(startMark);
	
	return () => {
		mark(endMark);
		const measurement = measure(`${componentName}-render`, startMark, endMark);
		if (measurement && import.meta.env.DEV) {
			console.debug(`${componentName} render time: ${measurement.duration.toFixed(2)}ms`);
		}
	};
}
