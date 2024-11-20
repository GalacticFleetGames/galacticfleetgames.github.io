/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			phone: '350px', //just a smaller sized phone
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1400px',
			'3xl': '1700px',
			'4xl': '1920px'
		},
		extend: {
			fontFamily: {
				aldrich: ['Aldrich', 'sans-serif'],
				anonymous: ['Anonymous Pro', 'sans-serif']
			},
			colors: {
				yellow: '#DFA736',

				blue: '#3F94C7',
				babyBlue: '#BCE1EF',
				lightBlue: '#0075BE',
				navy: '#004A8D',
				darkNavy: '#06467B',
				evenDarkerNavy: '#0D2853',

				pistachio: '#8BD36F',
				sky: '#7AC7D7',
				peach: '#FBA793',
				pink: '#C046C9',
				siena: '#E86B42'
			},
			spacing: {
				headerHeightSm: '4rem',
				headerHeightMd: '5rem',
				headerHeightXl: '7rem',
				headerHeightDouble: '14rem'
				//wrapper: '4rem'
			},
			borderRadius: {
				'4xl': '2.5rem'
			},
			fontSize: {
				'2xs': '10px'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
