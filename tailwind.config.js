/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 'class' modu ile dark mode'yi aktif hale getiriyoruz
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
