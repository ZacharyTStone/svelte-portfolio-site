// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

declare module '*.md' {
	const content: string;
	export default content;
}

// Window global type extensions
declare global {
	interface Window {
		enableSubmit?: () => void;
		emailjs?: {
			init: (publicKey: string) => void;
			send: (
				serviceId: string,
				templateId: string,
				templateParams: Record<string, string>
			) => Promise<{ status: number }>;
		};
		grecaptcha?: {
			getResponse: () => string;
			reset: () => void;
		};
	}
}

export {};
