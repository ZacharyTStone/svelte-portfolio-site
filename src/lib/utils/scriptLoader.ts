/**
 * Utility for loading external scripts dynamically
 */

interface ScriptLoadOptions {
	src: string;
	async?: boolean;
	defer?: boolean;
	onload?: () => void;
	onerror?: (error: Event) => void;
}

/**
 * Loads an external script dynamically
 * @param options Script loading options
 * @returns Promise that resolves when script is loaded
 */
export function loadScript(options: ScriptLoadOptions): Promise<void> {
	return new Promise((resolve, reject) => {
		// Check if script is already loaded
		const existingScript = document.querySelector(`script[src="${options.src}"]`);
		if (existingScript) {
			resolve();
			return;
		}

		const script = document.createElement('script');
		script.src = options.src;
		script.async = options.async ?? true;
		if (options.defer) {
			script.defer = true;
		}

		script.onload = () => {
			options.onload?.();
			resolve();
		};

		script.onerror = (error) => {
			options.onerror?.(error);
			reject(error);
		};

		document.head.appendChild(script);
	});
}

