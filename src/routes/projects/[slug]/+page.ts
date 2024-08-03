import MY_PROJECTS from '$lib/projects.params';

export const prerender = true;

export function entries() {
	return MY_PROJECTS.map((project) => ({
		slug: project.slug
	}));
}

export function load({ params }: { params: Record<string, string> }) {
	if (params.slug) {
		const project = MY_PROJECTS.find((item) => {
			return item.slug === params.slug;
		});

		return { project };
	}
}
