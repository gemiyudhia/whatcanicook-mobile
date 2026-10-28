/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        canvas: '#F2EDE3',
        card: '#FAF8F3',
        oatmeal: '#E7DED0',
        primary: { DEFAULT: '#34483A', dark: '#253429' },
        sage: '#78816A',
        terracotta: '#B87556',
        ink: '#383831',
        pebble: '#77766D',
      },
      fontFamily: {
        heading: ['Newsreader_600SemiBold'],
        'heading-md': ['Newsreader_500Medium'],
        body: ['PlusJakartaSans_400Regular'],
        'body-medium': ['PlusJakartaSans_500Medium'],
        'body-semibold': ['PlusJakartaSans_600SemiBold'],
      },
    },
  },
  plugins: [],
};
