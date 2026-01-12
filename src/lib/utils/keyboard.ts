/**
 * Keyboard navigation utilities for enhanced accessibility and UX
 */

export interface KeyboardShortcut {
	key: string;
	ctrl?: boolean;
	meta?: boolean;
	shift?: boolean;
	alt?: boolean;
	handler: (e: KeyboardEvent) => void;
	description?: string;
}

/**
 * Checks if a keyboard event matches a shortcut pattern
 */
export function matchesShortcut(e: KeyboardEvent, shortcut: KeyboardShortcut): boolean {
	if (e.key.toLowerCase() !== shortcut.key.toLowerCase()) return false;
	if (shortcut.ctrl && !e.ctrlKey) return false;
	if (shortcut.meta && !e.metaKey) return false;
	if (shortcut.shift && !e.shiftKey) return false;
	if (shortcut.alt && !e.altKey) return false;
	// Ensure modifier keys that shouldn't be pressed aren't pressed
	if (!shortcut.ctrl && e.ctrlKey) return false;
	if (!shortcut.meta && e.metaKey) return false;
	if (!shortcut.shift && e.shiftKey) return false;
	if (!shortcut.alt && e.altKey) return false;

	return true;
}

/**
 * Creates a keyboard shortcut handler
 */
export function createKeyboardHandler(shortcuts: KeyboardShortcut[]) {
	return (e: KeyboardEvent) => {
		for (const shortcut of shortcuts) {
			if (matchesShortcut(e, shortcut)) {
				e.preventDefault();
				shortcut.handler(e);
				return;
			}
		}
	};
}

/**
 * Common keyboard shortcuts for the portfolio site
 */
export const commonShortcuts: KeyboardShortcut[] = [
	{
		key: 'k',
		ctrl: true,
		handler: () => {
			// Focus search input or navigate to search page
			const searchLink = document.querySelector('a[href*="/search"]') as HTMLAnchorElement;
			if (searchLink) {
				searchLink.focus();
				searchLink.click();
			}
		},
		description: 'Open search'
	},
	{
		key: 'k',
		meta: true,
		handler: () => {
			const searchLink = document.querySelector('a[href*="/search"]') as HTMLAnchorElement;
			if (searchLink) {
				searchLink.focus();
				searchLink.click();
			}
		},
		description: 'Open search'
	},
	{
		key: 'Home',
		handler: () => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			const mainContent = document.getElementById('main-content');
			if (mainContent) mainContent.focus();
		},
		description: 'Scroll to top'
	},
	{
		key: 'End',
		handler: () => {
			window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
		},
		description: 'Scroll to bottom'
	}
];

/**
 * Focus trap utility for modals and dialogs
 */
export class FocusTrap {
	private container: HTMLElement;
	private firstFocusable: HTMLElement | null = null;
	private lastFocusable: HTMLElement | null = null;
	private previousActiveElement: HTMLElement | null = null;

	constructor(container: HTMLElement) {
		this.container = container;
		this.init();
	}

	private init(): void {
		// Store the previously focused element
		this.previousActiveElement = document.activeElement as HTMLElement;

		// Get all focusable elements
		const focusableSelectors = [
			'a[href]',
			'button:not([disabled])',
			'textarea:not([disabled])',
			'input:not([disabled])',
			'select:not([disabled])',
			'[tabindex]:not([tabindex="-1"])'
		].join(', ');

		const focusableElements = Array.from(
			this.container.querySelectorAll<HTMLElement>(focusableSelectors)
		).filter((el) => {
			// Filter out hidden elements
			const style = window.getComputedStyle(el);
			return style.display !== 'none' && style.visibility !== 'hidden';
		});

		if (focusableElements.length === 0) return;

		this.firstFocusable = focusableElements[0];
		this.lastFocusable = focusableElements[focusableElements.length - 1];

		// Focus the first element
		this.firstFocusable.focus();

		// Add keyboard event listener for tab trapping
		this.container.addEventListener('keydown', this.handleKeyDown);
	}

	private handleKeyDown = (e: KeyboardEvent): void => {
		if (e.key !== 'Tab') return;

		if (e.shiftKey) {
			// Shift + Tab
			if (document.activeElement === this.firstFocusable) {
				e.preventDefault();
				this.lastFocusable?.focus();
			}
		} else {
			// Tab
			if (document.activeElement === this.lastFocusable) {
				e.preventDefault();
				this.firstFocusable?.focus();
			}
		}
	};

	public destroy(): void {
		this.container.removeEventListener('keydown', this.handleKeyDown);
		// Restore focus to the previously focused element
		if (this.previousActiveElement) {
			this.previousActiveElement.focus();
		}
	}
}
