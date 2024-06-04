import Assets, { getAssetURL } from './data/assets';
import { getSkills } from './skills.params';
import { ContractType, type Experience } from './types';

const MY_EXPERIENCES: Array<Experience> = [
	{
		slug: 'interac',
		company: 'Interac',
		description: 'EXPERIENCES.interac.description',
		contract: ContractType.FullTime,
		type: 'EXPERIENCES.interac.type',
		location: 'EXPERIENCES.interac.location',
		period: { from: new Date(2018, 8), to: new Date(2021, 8) },
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
		description: 'EXPERIENCES.rapptr.description',
		contract: ContractType.FullTime,
		type: 'EXPERIENCES.rapptr.type',
		location: 'EXPERIENCES.rapptr.location',
		period: { from: new Date(2022, 7), to: new Date(2024, 5) },
		skills: getSkills('fe', 'be', 'dev-tools'),
		name: 'EXPERIENCES.rapptr.name',
		color: '#ffffff',
		links: [
			{
				to: 'https://rapptrlabs.com/',
				label: 'Rapptr Labs',
				newTab: true
			},
			{
				to: 'https://opsiq.ai/',
				label: 'OPSIQ',
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
		slug: 'opsiq',
		company: 'OPSIQ',
		description: 'EXPERIENCES.opsiq.description',
		contract: ContractType.PartTime,
		type: 'EXPERIENCES.opsiq.type',
		location: 'EXPERIENCES.opsiq.location',
		period: { from: new Date(2024, 6) },
		skills: getSkills('fe', 'be', 'dev-tools'),
		name: 'EXPERIENCES.opsiq.name',
		color: '#ffffff',
		links: [{ to: 'https://opsiq.ai/', label: 'OPSIQ', newTab: true }],
		logo: Assets.Opsiq,
		shortDescription: 'test'
		// screenshots: [{ src: getAssetURL(Assets.Opsiq1), label: '' }]
	}
];

export default MY_EXPERIENCES;
