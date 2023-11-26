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

export const onHover: any = (ev: any, el: HTMLElement, tiltDegree: number = 10) => {
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

	// Dynamic color calculation based on mouse position
	const dynamicColor = calculateColorBasedOnPosition(x, y, width, height);
	const newColor = changeColorOpacity(dynamicColor, 0.5); // Customize opacity as needed

	// Apply the new color
	el.style.setProperty('--border-color', newColor);
	el.style.setProperty('--drop-color', newColor);
	el.style.setProperty('--bg-color', newColor);
};

// Example color calculation function
function calculateColorBasedOnPosition(
	x: number,
	y: number,
	width: number,
	height: number
): string {
	// Example: Convert position to a color (you can customize this logic)
	const r = Math.round((x / width) * 255);
	const g = Math.round((y / height) * 255);
	const b = 150; // Static value for blue component, can be dynamic too

	return `rgb(${r},${g},${b})`;
}

export const changeColorOpacity = (color: string, opacity: number): string => {
	let r: number, g: number, b: number;

	if (color[0] !== '#' || (color.length !== 4 && color.length !== 7 && color.length !== 9)) {
		throw new Error('Invalid hex color format');
	}

	if (color.length === 4) {
		r = parseInt(color[1] + color[1], 16);
		g = parseInt(color[2] + color[2], 16);
		b = parseInt(color[3] + color[3], 16);
	} else if (color.length === 7 || color.length === 9) {
		r = parseInt(color.substring(1, 3), 16);
		g = parseInt(color.substring(3, 5), 16);
		b = parseInt(color.substring(5, 7), 16);
	} else {
		throw new Error('Invalid hex color format');
	}

	// Convert opacity to 0-1 range if it is not already
	if (opacity > 1) opacity = opacity / 100;

	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
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

export const RANDOM_COLORS = [
	'#FFC0CB',
	'#FFB6C1',
	'#FF69B4',
	'#FF1493',
	'#DB7093',
	'#C71585',
	'#FFA07A',
	'#FA8072',
	'#E9967A',
	'#F08080',
	'#CD5C5C',
	'#DC143C',
	'#B22222',
	'#8B0000',
	'#FF0000',
	'#FF4500',
	'#FF8C00',
	'#FFA500',
	'#FFD700',
	'#FFFF00',
	'#ADFF2F',
	'#7FFF00',
	'#7CFC00',
	'#00FF00',
	'#32CD32',
	'#00FA9A',
	'#00FF7F',
	'#90EE90',
	'#98FB98',
	'#00FF00'
];

export const generateRandomHexColor = (): string => {
	const randomIndex = Math.floor(Math.random() * RANDOM_COLORS.length);

	return RANDOM_COLORS[randomIndex];
};
