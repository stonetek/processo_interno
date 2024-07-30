/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "/index.html",
    "./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      rotate: {
        '97': '97deg',
        '103': '103deg',
        '125' : '125deg',
        '145' : '145deg',
      },
      spacing: {
        '17' : '5.98rem',   
      },
      width: {
        '3/7' : '15rem',
        '3/8' : '85%',
        '3/9' : '100%'
      }
    },
  },
  plugins: [],
}

