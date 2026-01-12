/**
 * Web Share API utilities for sharing pages and content
 */

export interface ShareData {
	title?: string;
	text?: string;
	url?: string;
}

/**
 * Check if Web Share API is supported
 */
export function isShareSupported(): boolean {
	return typeof navigator !== 'undefined' && 'share' in navigator;
}

/**
 * Share content using Web Share API with fallback
 */
export async function shareContent(data: ShareData): Promise<void> {
	if (!isShareSupported()) {
		// Fallback: copy to clipboard
		const shareText = `${data.title || ''}\n${data.text || ''}\n${data.url || ''}`.trim();
		await navigator.clipboard.writeText(shareText);
		// You could show a toast notification here
		return;
	}

	try {
		await navigator.share({
			title: data.title,
			text: data.text,
			url: data.url || window.location.href
		});
	} catch (error) {
		// User cancelled or error occurred
		if (error instanceof Error && error.name !== 'AbortError') {
			console.error('Error sharing:', error);
		}
	}
}

/**
 * Share the current page
 */
export async function sharePage(title?: string, text?: string): Promise<void> {
	const pageTitle = title || document.title;
	const pageText = text || document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
	const pageUrl = window.location.href;

	await shareContent({
		title: pageTitle,
		text: pageText,
		url: pageUrl
	});
}
