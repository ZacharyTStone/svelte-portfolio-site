/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		extend: {
			colors: {
				// Dark shades
				'dark-0': '#000',
				'dark-1': '#1e1e1e',
				'dark-2': '#2e2e2e',
				'dark-3': '#3e3e3e',
				'dark-4': '#4e4e4e',
				'dark-5': '#5e5e5e',
				'dark-6': '#6e6e6e',
				'dark-7': '#7e7e7e',
				'dark-8': '#8e8e8e',

				// Light shades
				'light-0': '#fff',
				'light-1': '#e1e1e1',
				'light-2': '#d1d1d1',
				'light-3': '#c1c1c1',
				'light-4': '#b1b1b1',
				'light-5': '#a1a1a1',
				'light-6': '#919191',
				'light-7': '#818181',
				'light-8': '#717171',

				// Code colors
				'code-keyword': '#bd2864',
				'code-string': '#297a3a',
				'code-function': '#0068d6',
				'code-constant': '#f08d49',
				'code-operator': '#016464',

				// Link colors
				link: '#3b82f6'
			},
			fontFamily: {
				text: ['Outfit', 'sans-serif'],
				title: ['Playfair Display', 'serif']
			},
			fontSize: {
				xs: '0.75rem',
				sm: '0.875rem',
				base: '1rem',
				lg: '1.125rem',
				xl: '1.25rem',
				'2xl': '1.5rem',
				'3xl': '1.875rem',
				'4xl': '2.25rem',
				'5xl': '3rem',
				'6xl': '3.75rem',
				'7xl': '4.5rem',
				'8xl': '6rem'
			},
			fontWeight: {
				light: '300',
				regular: '400',
				middle: '500',
				semibold: '600',
				bold: '700',
				extrabold: '800'
			},
			lineHeight: {
				none: '1',
				tight: '1.25',
				snug: '1.375',
				normal: '1.5',
				relaxed: '1.625',
				loose: '2'
			},
			letterSpacing: {
				tighter: '-0.05em',
				tight: '-0.025em',
				normal: '0em',
				wide: '0.025em',
				wider: '0.05em',
				widest: '0.1em'
			},
			animation: {
				'fade-in': 'fadeIn 0.9s ease-in',
				'fade-in-slow': 'fadeIn 6s ease-in',
				'fade-in-fast': 'fadeIn 0.2s ease-in-out',
				'fade-in-left': 'fadeInLeft 0.9s ease-in-out',
				rainbow: 'rainbow 6s linear infinite',
				shimmer: 'shimmer 2s linear infinite'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				fadeInLeft: {
					'0%': {
						opacity: '0',
						transform: 'translateX(-40px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				rainbow: {
					'0%': { color: '#ff0000' },
					'16.66%': { color: '#ffff00' },
					'33.33%': { color: '#00ff00' },
					'50%': { color: '#00ffff' },
					'66.66%': { color: '#0000ff' },
					'83.33%': { color: '#ff00ff' },
					'100%': { color: '#ff0000' }
				},
				shimmer: {
					'0%': { backgroundPosition: '100% 0' },
					'100%': { backgroundPosition: '-100% 0' }
				}
			}
		}
	},
	plugins: []
};
