import MY_PROJECTS from '$lib/projects.params';
import MY_EXPERIENCES from '$lib/experiences.params';
import MY_SKILLS from '$lib/skills.params';

const BASE_URL = 'https://zstone.dev';

export const prerender = true;

export function GET() {
	const staticRoutes = ['/', '/search'];

	const projectRoutes = MY_PROJECTS.map((p) => `/projects/${p.slug}`);
	const experienceRoutes = MY_EXPERIENCES.map((e) => `/experience/${e.slug}`);
	const skillRoutes = MY_SKILLS.map((s) => `/skills/${s.slug}`);

	const allRoutes = [...staticRoutes, ...projectRoutes, ...experienceRoutes, ...skillRoutes];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
	.map(
		(route) => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>monthly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
