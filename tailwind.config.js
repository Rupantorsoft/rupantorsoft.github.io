/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Hind Siliguri"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Hind Siliguri"', 'sans-serif'],
      },
      colors: {
        ink: { 950: '#060b18', 900: '#0a1224', 800: '#111b33', 700: '#1b2847' },
        brand: {
          50: '#ecfcff', 100: '#cff7fe', 200: '#a5effc', 300: '#67e3f9',
          400: '#22cdf0', 500: '#13b4d6', 600: '#0b8fb4', 700: '#0f7292',
        },
      },
    },
  },
  plugins: [],
};
