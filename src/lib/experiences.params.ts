import Assets, { getAssetURL } from './data/assets';
import { getSkills } from './skills.params';
import { ContractType, type Experience } from './types';

const RAW_EXPERIENCES: Array<Experience> = [
	{
		slug: 'interac',
		company: 'Interac',
		contract: ContractType.FullTime,
		type: 'EXPERIENCES.interac.type',
		location: 'EXPERIENCES.interac.location',
		period: { from: new Date(2018, 7), to: new Date(2021, 6) },
		skills: getSkills('japanese'),
		name: 'EXPERIENCES.interac.name',
		color: '#ffffff',
		links: [
			{
				to: 'https://interacnetwork.com',
				label: 'Interac',
				newTab: true
			}
		],
		logo: Assets.Interac,
		shortDescription: 'test',
		screenshots: [{ src: getAssetURL(Assets.Alt1), label: '' }]
	},
	{
		slug: 'rapptr',
		company: 'Rapptr Labs',
		contract: ContractType.FullTime,
		type: 'EXPERIENCES.rapptr.type',
		location: 'EXPERIENCES.rapptr.location',
		period: { from: new Date(2022, 7), to: new Date(2024, 6) },
		skills: getSkills('fe', 'be', 'dev-tools'),
		name: 'EXPERIENCES.rapptr.name',
		color: '#ffffff',
		links: [
			{
				to: 'https://rapptrlabs.com/',
				label: 'Rapptr Labs',
				newTab: true
			}
		],
		quote: {
			text: 'EXPERIENCES.rapptr.quote',
			link: {
				to: 'https://rapptrlabs.com/',
				label: 'Rapptr Labs',
				newTab: true
			}
		},
		logo: Assets.Rapptr,
		shortDescription: 'test',

		screenshots: [
			{ src: getAssetURL(Assets.Rapptr1), label: '' },
			{ src: getAssetURL(Assets.Rapptr2), label: '' },
			{ src: getAssetURL(Assets.Rapptr3), label: '' }
		]
	},
	{
		slug: 'sellfire',
		company: 'Sellfire',
		contract: ContractType.PartTime,
		type: 'EXPERIENCES.sellfire.type',
		location: 'EXPERIENCES.sellfire.location',
		period: { from: new Date(2024, 6), to: new Date(2024, 11) },
		skills: getSkills('fe', 'be', 'dev-tools'),
		name: 'EXPERIENCES.sellfire.name',
		color: '#ffffff',
		links: [{ to: 'https://sellfire.com/', label: 'Sellfire', newTab: true }],
		quote: {
			text: 'EXPERIENCES.sellfire.quote',
			link: { to: 'https://sellfire.com/', label: 'Sellfire', newTab: true }
		},
		logo: Assets.Sellfire,
		shortDescription: 'test'
	},
	{
		slug: 'sellfire2',
		company: 'Sellfire',
		contract: ContractType.FullTime,
		type: 'EXPERIENCES.sellfire2.type',
		location: 'EXPERIENCES.sellfire2.location',
		period: { from: new Date(2024, 11) },
		skills: getSkills('fe', 'be', 'dev-tools'),
		name: 'EXPERIENCES.sellfire2.name',
		color: '#ffffff',
		links: [{ to: 'https://sellfire.com/', label: 'Sellfire', newTab: true }],
		quote: {
			text: 'EXPERIENCES.sellfire2.quote',
			link: { to: 'https://sellfire.com/', label: 'Sellfire', newTab: true }
		},
		logo: Assets.Sellfire,
		shortDescription: 'test'
	}
];

// most recent first and then older
const SORTED_EXPERIENCES = RAW_EXPERIENCES.sort((a, b) => {
	return b.period.from.getTime() - a.period.from.getTime();
});

export default SORTED_EXPERIENCES;
