/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.{js,ts,tsx}', './app/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#FF6347', // Tomato
        secondary: '#adb5bd', // SlateBlue
        accent: '#b5838d', // Gold
        grayish: {
          100: '#F5F5F5',
          200: '#E0E0E0',
          300: '#CCCCCC',
          400: '#B3B3B3',
          500: '#999999',
          600: '#808080',
          700: '#666666',
          800: '#4D4D4D',
          900: '#333333',
        },
        success: '#00FF00', // Lime
        warning: '#FFA500', // Orange
        danger: '#FF0000', // Red
      },
    },
  },
  plugins: [],
};
