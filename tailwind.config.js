/** @type {import('tailwindcss').Config} */
const {grayDark, mint} = require("@radix-ui/colors")
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      }
      
    },
  },
  plugins: [],
  darkMode: "class"
}
