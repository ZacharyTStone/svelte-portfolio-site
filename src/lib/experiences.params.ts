import Assets from './data/assets';
import { getSkills } from './skills.params';
import { ContractType, type Experience } from './types';

const MY_EXPERIENCES: Array<Experience> = [
	{
		slug: 'rapptr',
		company: 'Rapptr Labs',

		description:
			'As a Software Engineer at Rapptr Labs, I primarly implement new features, fix bugs, and oversee OPSIQ’s weekly front-end deployment. I have a proven track record of effectively communicating with clients about new features and implementing comprehensive site-wide improvements, such as creating a new reusable library of components. While my main responsiblity is the front end I also work on the back end.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'New York, NY',
		period: { from: new Date(2022, 7) },
		skills: getSkills('fe', 'be', 'dev-tools'),
		name: 'Front End Engineer',
		color: '#ffffff',
		links: [
			{
				to: 'https://rapptrlabs.com/',
				label: 'Rapptr Labs',
				newTab: true
			}
		],
		logo: Assets.Rapptr,
		shortDescription: 'test'
	}
];

export default MY_EXPERIENCES;
