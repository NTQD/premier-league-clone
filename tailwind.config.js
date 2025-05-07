/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pl-purple': '#37003c',
        'pl-pink': '#ff2882',
        'pl-turquoise': '#00ff85',
        'pl-navy': '#241c44',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  important: '#root',
  plugins: [],
} 