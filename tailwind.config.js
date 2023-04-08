/** @type {import('tailwindcss').Config} */
const {grayDark, mint} = require("@radix-ui/colors")
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        appDark: grayDark.gray5,
        bgComponentDark: grayDark.gray2,
        componentDark: grayDark.gray7,
        teste: grayDark.gray1
      }
      
    },
  },
  plugins: [],
  darkMode: "class"
}
