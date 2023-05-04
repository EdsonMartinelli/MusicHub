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
      },

      keyframes: {

        playerShow:{
          from: {transform: "translateY(100%)" },
          to: {transform: "translateX(0%)"},
        },
      },
      animation: {
        playerShow: 'playerShow 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      
    },
  },
  plugins: [],
  darkMode: "class"
}
