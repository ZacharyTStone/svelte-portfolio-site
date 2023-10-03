import Assets from './data/assets';
import { getSkills } from './skills.params';
import type { Project } from './types';

const MY_PROJECTS: Array<Project> = [
	{
		slug: 'my-anime-collection',
		color: '#7f39a5',
		description: 'Find and keep track of your favorite anime.',
		shortDescription: 'Find and keep track of your favorite anime.',
		links: [
			{ to: 'https://www.my-anime-collection.com/landing', label: 'Live Demo' },
			{ to: 'https://github.com/zachinjapan/my-anime-collection', label: 'GitHub' }
		],
		logo: Assets.Unknown,
		name: 'My Anime Collection',
		period: {
			from: new Date()
		},
		skills: getSkills('fe', 'be', 'dev-tools'),
		project_skills: ['React', 'CSS', 'Node', 'API', 'Authentication', 'MongoDB', 'Heroku'],
		type: 'Web Application',
		video: 'https://www.youtube.com/embed/D_lXDfCJf6k',
		english: true,
		japanese: true,
		featured: true
	},
	{
		slug: 'zach-in-japan',
		color: '#3d3d3d',
		description:
			'Read about coding concepts, Japan, and all things related to being a web developer.',
		shortDescription:
			'Read about coding concepts, Japan, and all things related to being a web developer.',
		links: [
			{ to: 'https://zachinjapan.com', label: 'Live Demo' },
			{ to: 'https://github.com/zachinjapan/my-gatsby-blog', label: 'GitHub' }
		],
		logo: Assets.Unknown,
		name: 'Zach In Japan',
		period: {
			from: new Date()
		},
		skills: getSkills('fe', 'dev-tools'),
		project_skills: ['Gatsby', 'React', 'CSS', 'Markdown', 'GraphQL', 'Gatsby Cloud'],
		type: 'Blog',
		video: 'https://www.youtube.com/embed/lt48zTXl6j0',
		english: true,
		japanese: false,
		featured: true
	},
	{
		slug: 'haku',
		color: '#2ecc71',
		description: 'Track and compare jobs during the interview process.',
		shortDescription: 'Track and compare jobs during the interview process.',
		links: [
			{ to: 'https://www.hakujobs.com', label: 'Live Demo' },
			{ to: 'https://github.com/zachinjapan/haku', label: 'GitHub' }
		],
		logo: Assets.Unknown,
		name: 'HAKU',
		period: {
			from: new Date()
		},
		skills: getSkills('fe', 'be', 'dev-tools'),
		project_skills: ['React', 'CSS', 'Node', 'API', 'Authentication', 'MongoDB', 'Heroku'],
		type: 'Web Application',
		video: 'https://www.youtube.com/embed/q1rVbqMw0ug',
		english: true,
		japanese: false
	},
	{
		slug: 'riffs',
		color: '#ff9800',
		description: 'A place to share your new songs, covers, and musical ideas with the world.',
		shortDescription: 'A place to share your new songs, covers, and musical ideas with the world.',
		links: [
			{ to: 'https://riffs.netlify.app/', label: 'Live Demo' },
			{ to: 'https://github.com/zachinjapan/vue-music-app', label: 'GitHub' },
			{ to: 'https://www.youtube.com/embed/gBIhz-0Jkg8', label: 'YouTube' }
		],
		logo: Assets.Unknown,
		name: 'Riffs!',
		period: {
			from: new Date()
		},
		skills: getSkills('fe', 'dev-tools'),
		project_skills: ['Vue', 'CSS', 'Firebase', 'Authentication', 'Netlify'],
		type: 'Web Application',
		video: 'https://www.youtube.com/embed/gBIhz-0Jkg8',
		english: true,
		japanese: true
	}
	// Add
	// {
	// 	slug: 'slick-portfolio-angular',
	// 	color: '#5e95e3',
	// 	description:
	// 		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore non dolores voluptatibus vitae praesentium aperiam, iure laboriosam repellendus sunt explicabo pariatur totam enim, nihil animi quisquam. Sit vero quod laborum!',
	// 	shortDescription:
	// 		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore non dolores voluptatibus vitae praesentium aperiam, iure laboriosam repellendus sunt explicabo pariatur totam enim, nihil animi quisquam. Sit vero quod laborum!',
	// 	links: [{ to: 'https://github.com/RiadhAdrani/slick-portfolio-svelte', label: 'GitHub' }],
	// 	logo: Assets.Unknown,
	// 	name: 'Slick Portfolio',
	// 	period: {
	// 		from: new Date()
	// 	},
	// 	skills: getSkills('angular', 'ts', 'tailwind'),
	// 	type: 'Website Template'
	// },
	// {
	// 	slug: 'slick-portfolio-svelte',
	// 	color: '#ff3e00',
	// 	description:
	// 		'A Vercel-like developer portfolio website template made with Typescript and SvelteKit.',
	// 	shortDescription:
	// 		'A Vercel-like developer portfolio website template made with Typescript and SvelteKit.',
	// 	links: [{ to: 'https://github.com/RiadhAdrani/slick-portfolio-svelte', label: 'GitHub' }],
	// 	logo: Assets.Svelte,
	// 	name: 'Slick Portfolio',
	// 	period: {
	// 		from: new Date()
	// 	},
	// 	skills: getSkills('svelte', 'ts', 'tailwind', 'sass'),
	// 	type: 'Website Template',
	// 	screenshots: [
	// 		{
	// 			label: 'screen 1',
	// 			src: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
	// 		},
	// 		{
	// 			label: '2',
	// 			src: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
	// 		},
	// 		{
	// 			label: '3',
	// 			src: 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2dyYW1taW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
	// 		},
	// 		{
	// 			label: '4',
	// 			src: 'https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2dyYW1taW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
	// 		},
	// 		{
	// 			label: '5',
	// 			src: 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2dyYW1taW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
	// 		},
	// 		{
	// 			label: '6',
	// 			src: 'https://images.unsplash.com/photo-1585079542156-2755d9c8a094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2dyYW1taW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
	// 		}
	// 	]
	// }
];

export default MY_PROJECTS;
