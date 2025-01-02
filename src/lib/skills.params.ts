import Assets, { getAssetURL } from './data/assets';
import type { Asset, Skill } from './types';
import { COLOR_ASSETS } from './data/assets';

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
	{ label: 'Gatsby', link: 'https://www.gatsbyjs.org/', icon: COLOR_ASSETS.Gatsby },
	{ label: 'Vue', link: 'https://vuejs.org/', icon: COLOR_ASSETS.VueJs },
	{ label: 'Next', link: 'https://nextjs.org/', icon: COLOR_ASSETS.Next },
	{ label: 'Svelte', link: 'https://svelte.dev/', icon: COLOR_ASSETS.Svelte }
];

const FE_TOOLS: SkillInfoObject[] = [
	{ label: 'HTML', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
	{ label: 'CSS', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
	{ label: 'JavaScript', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
	{ label: 'Typescript', link: 'https://www.typescriptlang.org/' },
	{ label: 'Styled Components', link: 'https://styled-components.com/' },
	{ label: 'Bootstrap', link: 'https://getbootstrap.com/' },
	{ label: 'Tailwind', link: 'https://tailwindcss.com/' },
	{ label: 'Material UI', link: 'https://material-ui.com/' },
	{ label: 'Context API', link: 'https://reactjs.org/docs/context.html' },
	{ label: 'Redux', link: 'https://redux.js.org/' }
];

const Backend: SkillInfoObject[] = [
	{ label: 'Node', link: 'https://nodejs.org/en/' },
	{ label: 'REST', link: 'https://restfulapi.net/' },
	{ label: 'GraphQL', link: 'https://graphql.org/' },
	{ label: 'MongoDB', link: 'https://www.mongodb.com/' },
	{ label: 'SQL', link: 'https://www.w3schools.com/sql/' },
	{ label: 'Ably Web Sockets', link: 'https://www.ably.io/' }
];

const Server: SkillInfoObject[] = [
	{ label: 'Heroku', link: 'https://www.heroku.com/' },
	{ label: 'Netlify', link: 'https://www.netlify.com/' },
	{ label: 'Vercel', link: 'https://vercel.com/' }
];

const Other: SkillInfoObject[] = [
	{ label: 'Jira', link: 'https://www.atlassian.com/software/jira' },
	{ label: 'Github', link: 'https://github.com/' },
	{ label: 'Twilio', link: 'https://www.twilio.com/' },
	{ label: 'Cursor', link: 'https://www.cursor.com/' }
];

const Mobile: SkillInfoObject[] = [
	{ label: 'React Native', link: 'https://reactnative.dev/' },
	{ label: 'Expo', link: 'https://expo.io/' },
	{ label: 'React Navigation', link: 'https://reactnavigation.org/' }
];

const FE_EXTRA_INFO: SkillExtraInfo[] = [
	{
		title: 'EXTRA_INFO_LABELS.frameworks',
		content: FRAMEWORKS
	},
	{
		title: 'EXTRA_INFO_LABELS.tools',
		content: FE_TOOLS
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

const MOBILE_EXTRA_INFO: SkillExtraInfo[] = [
	{
		title: 'EXTRA_INFO_LABELS.tools',
		content: Mobile
	}
];

const MY_SKILLS = [
	s({
		slug: 'fe',
		color: 'yellow',
		description: 'SKILLS.fe.description',
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
		description: 'SKILLS.be.description',
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
	// s({
	// 	slug: 'cyber-security',
	// 	color: 'green',
	// 	description: 'SKILLS.cyber-security.description',
	// 	logo: Assets.Security,
	// 	name: 'SKILLS.cyber-security.name',
	// 	courses: [
	// 		{
	// 			label: 'Web Application Security Testing with OWASP ZAP',
	// 			link: 'https://coursera.org/share/764fa0ecbc96a7cd52d2a829ee73e03b'
	// 		},
	// 		{
	// 			label: 'Hacking Web Applications & Penetration Testing: Web Hacking',
	// 			link: 'https://www.udemy.com/certificate/UC-518b49d7-8a75-43bd-ae87-1dd891aa2ff4/'
	// 		}
	// 	]
	// }),
	// s({
	// 	slug: 'mobile',
	// 	color: 'purple',
	// 	description: 'SKILLS.mobile.description',
	// 	logo: Assets.Mobile,
	// 	name: 'SKILLS.mobile.name',
	// 	extraInfo: MOBILE_EXTRA_INFO
	// }),
	s({
		slug: 'dev-tools',
		color: 'red',
		description: 'SKILLS.dev-tools.description',
		logo: Assets.DevTools,
		name: 'SKILLS.dev-tools.name',
		extraInfo: OTHER_EXTRA_INFO
	}),
	s({
		slug: 'japanese',
		color: 'orange',
		description: 'SKILLS.japanese.description',
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
