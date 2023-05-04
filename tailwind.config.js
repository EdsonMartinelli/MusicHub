/** @type {import('tailwindcss').Config} */
const {grayDark, mint} = require("@radix-ui/colors")
const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      },

      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(176px, 1fr));',
      }
      
    },
  },
  plugins: [],
  darkMode: "class"
}
