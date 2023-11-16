import Assets from './data/assets';
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
		shortDescription: 'test'
	},
	{
		slug: 'rapptr',
		company: 'Rapptr Labs',
		description: 'EXPERIENCES.rapptr.description',
		contract: ContractType.FullTime,
		type: 'EXPERIENCES.rapptr.type',
		location: 'EXPERIENCES.rapptr.location',
		period: { from: new Date(2022, 7) },
		skills: getSkills('fe', 'be', 'dev-tools', 'web-security'),
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
		logo: Assets.Rapptr,
		shortDescription: 'test'
	}
];

export default MY_EXPERIENCES;
