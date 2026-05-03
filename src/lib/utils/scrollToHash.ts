/**
 * Scroll the main document to a hash anchor after SPA navigation (SvelteKit
 * does not always perform native fragment scrolling). Uses double rAF so the
 * destination DOM has painted.
 */
export function scrollToHash(hash: string, behavior: ScrollBehavior = 'smooth'): void {
	if (typeof document === 'undefined') return;
	if (!hash || hash === '#') return;
	let id = hash.startsWith('#') ? hash.slice(1) : hash;
	try {
		id = decodeURIComponent(id);
	} catch {
		/* keep raw */
	}
	if (!id) return;
	const el = document.getElementById(id);
	if (!el) return;

	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			el.scrollIntoView({ behavior, block: 'start' });
		});
	});
}
