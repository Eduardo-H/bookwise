/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/app/**/*.tsx',
  ],
  theme: {
    fontFamily: {
      default: 'Nunito, sans-serif',
    },

    lineHeight: {
      shorter: '125%',
      short: '140%',
      base: '160%',
      tall: '180%',
    },

    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',

        green: {
          100: '#50B2C0',
          200: '#255D6A',
          300: '#0A313C',
        },

        purple: {
          100: '#8381D9',
          200: '#2A2879',
        },

        gray: {
          100: '#F8F9FC',
          200: '#E6E8F2',
          300: '#D1D6E4',
          400: '#8D95AF',
          500: '#303F73',
          600: '#252D4A',
          700: '#181C2A',
          800: '#0E1116',
        },

        'gradient-vertical': `linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)`,
        'gradient-horizontal': `linear-gradient(90deg, #7FD1CC 0%, #9694F5 100%)`,
      },

      backgroundImage: {
        'hero-background': "url('/images/hero-background.png')",
      },
    },
  },
}
