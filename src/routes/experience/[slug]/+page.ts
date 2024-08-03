import MY_EXPERIENCES from '$lib/experiences.params';

export const prerender = true;

export function entries() {
	return MY_EXPERIENCES.map((experience) => ({
		slug: experience.slug
	}));
}

export function load({ params }: { params: Record<string, string> }) {
	if (params.slug) {
		const experience = MY_EXPERIENCES.find((item) => {
			return item.slug === params.slug;
		});

		return { experience };
	}
}
