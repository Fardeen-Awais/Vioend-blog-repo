/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {
      fontFamily :{
        roboto: ["Roboto", "sans-serif"],
        merri : ["Merriweather","sans-serif"]
      }
    },
  },
  plugins: [],
}
