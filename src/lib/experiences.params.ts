import Assets from './data/assets';
import { getSkills } from './skills.params';
import { ContractType, type Experience } from './types';

const MY_EXPERIENCES: Array<Experience> = [
	{
		slug: 'interac',
		company: 'Interac',
		description:
			'As an ALT (Assistant Language Teacher) at Interac, I taught English to Japanese students in public schools. I worked with students from kindergarten to high school. I also worked with special needs students. I was responsible for planning lessons, creating materials, and teaching classes. I also worked with Japanese teachers to create and implement new lesson plans.',
		contract: ContractType.FullTime,
		type: 'Teaching',
		location: 'Fukushima, Japan',
		period: { from: new Date(2018, 8), to: new Date(2021, 8) },
		skills: getSkills('japanese'),
		name: 'Assistant Language Teacher',
		color: '#ffffff',
		links: [
			{
				to: 'https://interacnetwork.com',
				label: 'Interac',
				newTab: true
			}
		],
		logo: Assets.Interac,
		shortDescription: 'test'
	},
	{
		slug: 'rapptr',
		company: 'Rapptr Labs',

		description:
			'As a Software Engineer at Rapptr Labs, I primarily implement new features, fix bugs, and oversee OPSIQ’s weekly front-end deployment. I have a proven track record of effectively communicating with clients about new features and implementing comprehensive site-wide improvements, such as creating a new reusable library of components. While my primary responsibility is the front-end, I also work on the back-end.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'New York, NY',
		period: { from: new Date(2022, 7) },
		skills: getSkills('fe', 'be', 'dev-tools', 'web-security'),
		name: 'Front End Engineer',
		color: '#ffffff',
		links: [
			{
				to: 'https://rapptrlabs.com/',
				label: 'Rapptr Labs',
				newTab: true
			},
			{
				to: 'https://opsiq.ai/',
				label: 'OPSIQ ',
				newTab: true
			}
		],
		logo: Assets.Rapptr,
		shortDescription: 'test'
	}
];

export default MY_EXPERIENCES;
