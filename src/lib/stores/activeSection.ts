import { writable } from 'svelte/store';

export const activeSection = writable<string>('hero');

export const SPA_SECTION_IDS = [
	'hero',
	'about',
	'experience',
	'projects',
	'skills',
	'contact'
] as const;

export type SpaSectionId = (typeof SPA_SECTION_IDS)[number];

export function setupActiveSectionObserver(ids: readonly string[] = SPA_SECTION_IDS): () => void {
	if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
		return () => {};
	}

	const visible = new Map<string, number>();

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					visible.set(entry.target.id, entry.intersectionRatio);
				} else {
					visible.delete(entry.target.id);
				}
			}

			let bestId = '';
			let bestRatio = -1;
			for (const [id, ratio] of visible) {
				if (ratio > bestRatio) {
					bestId = id;
					bestRatio = ratio;
				}
			}

			if (bestId) {
				activeSection.set(bestId);
			}
		},
		{
			rootMargin: '-30% 0px -55% 0px',
			threshold: [0, 0.25, 0.5, 0.75, 1]
		}
	);

	const observed: HTMLElement[] = [];
	for (const id of ids) {
		const el = document.getElementById(id);
		if (el) {
			observer.observe(el);
			observed.push(el);
		}
	}

	return () => {
		for (const el of observed) {
			observer.unobserve(el);
		}
		observer.disconnect();
	};
}
