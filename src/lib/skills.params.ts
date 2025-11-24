import Assets, { COLOR_ASSETS, getAssetURL } from './data/assets';
import type { Asset, Skill } from './types';

const s = (skill: Skill) => skill;

interface SkillExtraInfo {
	title: string;
	content: any[];
}

interface SkillInfoObject {
	label: string;
	link: string;
	icon?: Asset;
}

export type ArrayElementType<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const FRAMEWORKS: SkillInfoObject[] = [
	{ label: 'React', link: 'https://reactjs.org/', icon: COLOR_ASSETS.React },
	{ label: 'Next', link: 'https://nextjs.org/', icon: COLOR_ASSETS.Next },
	{ label: 'Svelte', link: 'https://svelte.dev/', icon: COLOR_ASSETS.Svelte },
	{ label: 'SvelteKit', link: 'https://kit.svelte.dev/', icon: COLOR_ASSETS.Svelte },
	{ label: 'Svelte 5', link: 'https://svelte.dev/', icon: COLOR_ASSETS.Svelte }
];

const FE_TOOLS: SkillInfoObject[] = [
	{ label: 'HTML', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
	{ label: 'CSS', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
	{ label: 'JavaScript', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
	{ label: 'Typescript', link: 'https://www.typescriptlang.org/', icon: COLOR_ASSETS.TypeScript },
	{ label: 'Styled Components', link: 'https://styled-components.com/' },
	{ label: 'Tailwind', link: 'https://tailwindcss.com/' },
	{ label: 'Context API', link: 'https://reactjs.org/docs/context.html' },
	{ label: 'Redux', link: 'https://redux.js.org/' },
	{ label: 'Playwright', link: 'https://playwright.dev/' },
	{ label: 'Jest', link: 'https://jestjs.io/' },
	{ label: 'Vite', link: 'https://vitejs.dev/' },
	{ label: 'Webpack', link: 'https://webpack.js.org/' },
	{ label: 'UnoCSS', link: 'https://unocss.dev/' },
	{ label: 'SCSS/Sass', link: 'https://sass-lang.com/' },
	{ label: 'npm', link: 'https://www.npmjs.com/' }
];

const Backend: SkillInfoObject[] = [
	{ label: 'Node', link: 'https://nodejs.org/en/' },
	{ label: 'Express.js', link: 'https://expressjs.com/' },
	{ label: 'REST', link: 'https://restfulapi.net/' },
	{ label: 'GraphQL', link: 'https://graphql.org/' },
	{ label: 'MongoDB', link: 'https://www.mongodb.com/' },
	{ label: 'SQL', link: 'https://www.w3schools.com/sql/' },
	{ label: 'Ably Web Sockets', link: 'https://www.ably.io/' },
	{ label: 'Server-Side Rendering', link: 'https://kit.svelte.dev/docs/ssr' },
	{ label: 'Static Site Generation', link: 'https://kit.svelte.dev/docs/adapter-static' },
	{ label: 'Python', link: 'https://www.python.org/' },
	{ label: 'OpenAI API', link: 'https://openai.com/api/' },
	{ label: 'Auth0', link: 'https://auth0.com/' }
];

const Server: SkillInfoObject[] = [
	{ label: 'Heroku', link: 'https://www.heroku.com/' },
	{ label: 'Netlify', link: 'https://www.netlify.com/' },
	{ label: 'Vercel', link: 'https://vercel.com/' },
	{ label: 'GitHub Actions', link: 'https://github.com/features/actions' }
];

const Other: SkillInfoObject[] = [
	{ label: 'Jira', link: 'https://www.atlassian.com/software/jira' },
	{ label: 'Github', link: 'https://github.com/' },
	{ label: 'Twilio', link: 'https://www.twilio.com/' },
	{ label: 'Cursor', link: 'https://www.cursor.com/' },
	{ label: 'EmailJS', link: 'https://www.emailjs.com/' },
	{ label: 'Google reCAPTCHA', link: 'https://www.google.com/recaptcha/' },
	{ label: 'svelte-i18n', link: 'https://github.com/kaisermann/svelte-i18n' },
	{ label: 'Vercel Analytics', link: 'https://vercel.com/analytics' },
	{ label: 'Performance Optimization', link: 'https://web.dev/performance/' }
];

const Cyber: SkillInfoObject[] = [
	{ label: 'OWASP ZAP', link: 'https://www.zaproxy.org/' },
	{ label: 'Burp Suite', link: 'https://portswigger.net/burp' },
	{ label: 'Kali Linux', link: 'https://www.kali.org/' }
];

const FE_EXTRA_INFO: SkillExtraInfo[] = [
	{
		title: 'EXTRA_INFO_LABELS.frameworks',
		content: FRAMEWORKS
	},
	{
		title: 'EXTRA_INFO_LABELS.tools',
		content: FE_TOOLS
	},
	{
		title: 'EXTRA_INFO_LABELS.build_tools',
		content: [
			{ label: 'Vite', link: 'https://vitejs.dev/' },
			{ label: 'Webpack', link: 'https://webpack.js.org/' },
			{ label: 'esbuild', link: 'https://esbuild.github.io/' },
			{ label: 'Yarn', link: 'https://yarnpkg.com/' },
			{ label: 'npm', link: 'https://www.npmjs.com/' }
		]
	},
	{
		title: 'EXTRA_INFO_LABELS.performance',
		content: [
			{ label: 'Code Splitting', link: 'https://vitejs.dev/guide/build.html#chunking-strategy' },
			{ label: 'Image Optimization', link: 'https://kit.svelte.dev/docs/images' },
			{ label: 'Bundle Compression', link: 'https://github.com/vbenjs/vite-plugin-compression' },
			{ label: 'Tree Shaking', link: 'https://vitejs.dev/guide/build.html#chunking-strategy' }
		]
	}
];

const BE_EXTRA_INFO: SkillExtraInfo[] = [
	{
		title: 'EXTRA_INFO_LABELS.backend',
		content: Backend
	},
	{
		title: 'EXTRA_INFO_LABELS.server',
		content: Server
	}
];

const OTHER_EXTRA_INFO: SkillExtraInfo[] = [
	{
		title: 'EXTRA_INFO_LABELS.tools',
		content: Other
	}
];

const CYBER_EXTRA_INFO: SkillExtraInfo[] = [
	{
		title: 'EXTRA_INFO_LABELS.tools',
		content: Cyber
	}
];
const MY_SKILLS: Array<Skill> = [
	s({
		slug: 'fe',
		color: 'yellow',
		logo: Assets.TypeScript,
		name: 'SKILLS.fe.name',
		extraInfo: FE_EXTRA_INFO,
		courses: [
			{
				label: 'Response Web Design',
				date: '07/08/2021',
				provider: 'Free Code Camp',
				link: 'https://www.freecodecamp.org/certification/zachinjapan/responsive-web-design'
			},
			{
				label: 'Learn Javascript',
				date: '01/13/2022',
				provider: 'Codecademy',
				link: 'https://www.codecademy.com/profiles/zasto3049868533/certificates/705dcb15de0da4dd9d9fc4f3274b430e'
			}
		]
	}),
	s({
		slug: 'be',
		color: 'blue',
		logo: Assets.NodeJs,
		name: 'SKILLS.be.name',
		extraInfo: BE_EXTRA_INFO,
		courses: [
			{
				label: 'Learn SQL Course',
				date: '01/13/2022',
				provider: 'Codecademy',
				link: 'https://www.codecademy.com/profiles/zasto3049868533/certificates/042a4e5884e3eb6ea1f2a12be6abb851'
			},
			{
				label: 'Javascript Algorithms and Data Structures',
				date: '12/05/2021',
				provider: 'Free Code Camp',
				link: 'https://www.freecodecamp.org/certification/zachinjapan/javascript-algorithms-and-data-structures'
			}
		]
	}),
	s({
		slug: 'cyber-security',
		color: 'green',

		logo: Assets.Security,
		name: 'SKILLS.cyber-security.name',
		courses: [
			{
				label: 'Web Application Security Testing with OWASP ZAP',
				link: 'https://coursera.org/share/764fa0ecbc96a7cd52d2a829ee73e03b'
			},
			{
				label: 'Hacking Web Applications & Penetration Testing: Web Hacking',
				link: 'https://www.udemy.com/certificate/UC-518b49d7-8a75-43bd-ae87-1dd891aa2ff4/'
			},
			{
				label: 'Hack The Box Bug Bounty Hunter (In Progress)',
				link: 'https://www.hackthebox.com/profile/442531'
			}
		],
		extraInfo: CYBER_EXTRA_INFO
	}),

	s({
		slug: 'dev-tools',
		color: 'red',
		logo: Assets.DevTools,
		name: 'SKILLS.dev-tools.name',
		extraInfo: OTHER_EXTRA_INFO
	}),
	s({
		slug: 'japanese',
		color: 'orange',
		logo: Assets.Japan,
		name: 'SKILLS.japanese.name',
		certifications: [
			{
				label: 'Japanese Language Proficiency Test level N2 （日本語能力試験レベルN2）',
				date: '07/21/2021',
				provider: 'Japan Foundation'
			},
			{
				label: 'Kanji Kentei Level 10 (漢字検定レベル10)',
				date: '07/21/2021',
				provider: 'Japan Foundation'
			},
			{
				label: 'Kanji Kentei Level 9 (漢字検定レベル9)',
				date: '11/24/2024',
				provider: 'Japan Foundation'
			},
			{
				label:
					'1st Place in RYUKA Speech Contest at Kobe University (神戸大学のRYUKAスピーチコンテスト 最優秀賞)',
				date: '2024',
				provider: 'Kobe University',
				link: 'https://www.youtube.com/watch?v=jkPv_Z7iO_4&ab_channel=ZachStone'
			}
		],
		screenshots: [{ src: getAssetURL(Assets.Japanese1), label: '' }]
	})
];

export default MY_SKILLS;

export const getSkills = (...slugs: Array<string>): Array<Skill> =>
	MY_SKILLS.filter((it) => slugs.includes(it.slug));
