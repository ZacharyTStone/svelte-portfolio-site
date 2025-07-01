import { Icons } from '$lib/utils';

const ICON_VIEWBOX: Partial<Record<Icons, string>> = {
	[Icons.Youtube]: '0 0 461.001 461.001',
	[Icons.Facebook]: '0 0 408.788 408.788',
	[Icons.GitHub]: '0 0 16 16',
	[Icons.Search]: '0 0 16 16',
	[Icons.Code]: '0 0 16 16'
};

export const viewBox = (icon: Icons): string => {
	return ICON_VIEWBOX[icon] ?? '0 0 24 24';
};
