/**
 * Toast notification system
 * @module toast
 */

import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
	id: string;
	message: string;
	type: ToastType;
	duration?: number;
}

function createToastStore() {
	const { subscribe, update } = writable<Toast[]>([]);

	return {
		subscribe,
		add: (toast: Omit<Toast, 'id'>) => {
			const id = crypto.randomUUID();
			const duration = toast.duration ?? 3000;
			const newToast: Toast = {
				...toast,
				id,
				duration
			};

			update((toasts) => [...toasts, newToast]);

			// Auto remove after duration
			if (duration > 0) {
				setTimeout(() => {
					remove(id);
				}, duration);
			}

			return id;
		},
		remove: (id: string) => {
			update((toasts) => toasts.filter((t) => t.id !== id));
		},
		clear: () => {
			update(() => []);
		},
		success: (message: string, duration?: number) => {
			return add({ message, type: 'success', duration });
		},
		error: (message: string, duration?: number) => {
			return add({ message, type: 'error', duration });
		},
		info: (message: string, duration?: number) => {
			return add({ message, type: 'info', duration });
		},
		warning: (message: string, duration?: number) => {
			return add({ message, type: 'warning', duration });
		}
	};

	function add(toast: Omit<Toast, 'id'>) {
		const id = crypto.randomUUID();
		const duration = toast.duration ?? 3000;
		const newToast: Toast = {
			...toast,
			id,
			duration
		};

		update((toasts) => [...toasts, newToast]);

		if (duration > 0) {
			setTimeout(() => {
				remove(id);
			}, duration);
		}

		return id;
	}

	function remove(id: string) {
		update((toasts) => toasts.filter((t) => t.id !== id));
	}
}

export const toastStore = createToastStore();
