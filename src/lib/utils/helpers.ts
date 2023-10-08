export const countMonths = (from: Date, to: Date = new Date()): number => {
	let firstYear = 0;
	let wholeYears = 0;
	let newYear = 0;

	if (to.getFullYear() !== from.getFullYear()) {
		newYear = to.getMonth();
		wholeYears = (to.getFullYear() - from.getFullYear() - 1) * 12;
		firstYear = 12 - from.getMonth();
	} else {
		firstYear = to.getMonth() - from.getMonth();
	}

	return firstYear + wholeYears + newYear + 1;
};

export const getMonthName = (index: number): string => {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	return monthNames[index];
};

export const useImage = (url: string, base: string): string => `${base}${url}`;

export const useTitle = (title: string, suffix: string) => `${title} | ${suffix}`;

export const isEmail = (email: string): boolean => {
	const reg =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return reg.test(email ?? '');
};

export // svelte typing is broken...
const onHover: any = (ev: any, el: HTMLElement, tiltDegree: number = 10) => {
	const target = ev.currentTarget;

	if (!target) {
		return;
	}

	const rect = target.getBoundingClientRect();

	const x = ev.clientX - rect.left;
	const y = ev.clientY - rect.top;

	el.style.setProperty('--drop-x', `${x}px`);
	el.style.setProperty('--drop-y', `${y}px`);

	const width = el.offsetWidth;
	const height = el.offsetHeight;

	const cX = rect.x + width / 2;
	const cY = rect.y + height / 2;

	const mX = ev.clientX - cX;
	const mY = ev.clientY - cY;

	const rY = ((tiltDegree * mX) / (width / 2)).toFixed(2);
	const rX = ((-1 * (tiltDegree * mY)) / (height / 2)).toFixed(2);

	el.style.setProperty('--rot-x', `${rX}deg`);
	el.style.setProperty('--rot-y', `${rY}deg`);
};
