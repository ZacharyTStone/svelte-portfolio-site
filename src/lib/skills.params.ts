import Assets, { getAssetURL } from './data/assets';
import type { Asset, Skill } from './types';
import svelte from './md/svelte.md?raw';
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
	{ label: 'Hasura', link: 'https://hasura.io/' },
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
	{ label: 'Chat GPT', link: 'https://chat.openai.com/chat' }
];

const Mobile: SkillInfoObject[] = [
	{ label: 'React Native', link: 'https://reactnative.dev/' },
	{ label: 'Expo', link: 'https://expo.io/' },
	{ label: 'React Navigation', link: 'https://reactnavigation.org/' }
];

const SECURITY_TOOLS: SkillInfoObject[] = [
	{ label: 'OWASP ZAP', link: 'https://owasp.org/www-project-zap/' },
	{
		label: 'Kali Linux',
		link: 'https://www.kali.org/'
	},
	{
		label: 'Burp Suite',
		link: 'https://portswigger.net/burp'
	}
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

const SECURITY_EXTRA_INFO: SkillExtraInfo[] = [
	{
		title: 'EXTRA_INFO_LABELS.tools',
		content: SECURITY_TOOLS
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
		extraInfo: FE_EXTRA_INFO
	}),
	s({
		slug: 'be',
		color: 'blue',
		description: 'SKILLS.be.description',
		logo: Assets.NodeJs,
		name: 'SKILLS.be.name',
		extraInfo: BE_EXTRA_INFO
	}),
	s({
		slug: 'cyber-security',
		color: 'green',
		description: 'SKILLS.cyber-security.description',
		logo: Assets.Security,
		name: 'SKILLS.cyber-security.name',
		extraInfo: SECURITY_EXTRA_INFO,
		courses: [
			{
				label: 'Web Application Security Testing with OWASP ZAP',
				link: 'https://coursera.org/share/6534ebedc75f9b25ca28b30aaf093435'
			},
			{
				label: 'Hacking Web Applications & Penetration Testing: Web Hacking',
				link: 'https://www.udemy.com/certificate/UC-518b49d7-8a75-43bd-ae87-1dd891aa2ff4/'
			}
		]
	}),
	s({
		slug: 'mobile',
		color: 'purple',
		description: 'SKILLS.mobile.description',
		logo: Assets.Mobile,
		name: 'SKILLS.mobile.name',
		extraInfo: MOBILE_EXTRA_INFO
	}),
	s({
		slug: 'dev-tools',
		color: 'red',
		description: 'SKILLS.dev-tools.description',
		logo: Assets.Slack,
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
				label: 'Japanese Language Proficiency Test level N2'
			},
			{
				label: 'Kanji Kentei Level 10 (Perfect Score)'
			}
		],
		screenshots: [{ src: getAssetURL(Assets.Japanese1), label: '' }]
	})
];

export default MY_SKILLS;

export const getSkills = (...slugs: Array<string>): Array<Skill> =>
	MY_SKILLS.filter((it) => slugs.includes(it.slug));
