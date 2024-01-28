/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Roboto': 'Roboto',
      },
      backgroundColor:{
        lightGray:'#1A1B1D',
        superGray: '#444445',
        lightWhite:'#D7C9FF',
      }
    },
  },
  plugins: [],
}

