/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'false',
  theme: {
    extend: {
      colors: {
        'blue-500': '#478CCA',
        'slate-600': '#3D576F',
        'amber-400': '#F6BA15',
        'green-500': '#3CAF4A',
        'slate-200': '#DAECE8',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('flowbite/plugin')],
};
