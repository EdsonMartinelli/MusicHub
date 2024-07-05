/** @type {import('tailwindcss').Config} */
const radixColor = require("@radix-ui/colors")
const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-background": "rgb(7, 6, 19)",
        "secondary-background": " rgb(18, 16, 45)",

        "primary": `${colors.indigo[600]}`,
        "secondary": `${colors.rose[600]}`,

        "primary-hover": `${colors.indigo[700]}`,
        "secondary-hover": `${colors.rose[700]}`,

        "text-primary": `${colors.white}`,
        "text-secondary": `${colors.zinc[400]}`,

        "popover": `${colors.indigo[900]}`,

        "border-color": `${colors.indigo[900]}`,

        "active-hover": `${colors.rose[600]}`,

        "skeleton-color":`rgb(21, 19, 52)`

      },

      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(176px, 1fr));',
      },

      keyframes: {

        playerShow:{
          from: {transform: "translateY(100%)" },
          to: {transform: "translateX(0%)"},
        },
        fadeIn:{
          from: {opacity: "0" },
          to: {opacity: "1"},
        },
        fadeOut:{
          from: {opacity: "1" },
          to: {opacity: "0"},
        },
        rotate:{
          from: {transform: "rotate(0deg)" },
          to: {transform: "rotate(360deg)" },
        },
        rotateCentered:{
          from: {transform: "translate(-50%, -50%) rotate(0deg) " },
          to: {transform: "translate(-50%, -50%) rotate(360deg) " },
        }
      },
      animation: {
        playerShow: 'playerShow 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        fadeIn: 'fadeIn 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
        fadeOut: 'fadeOut 1000ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        rotatePlayButton: 'rotate 1500ms linear infinite',
        rotateMainPageButton: 'rotateCentered 5s cubic-bezier(.33,.2,.91,.73) infinite'
      },
      
      backgroundImage: {
        'teste-pattern': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='575' height='575' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%2327272A' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%233F3F46'%3E%3Ccircle cx='769' cy='229' r='3'/%3E%3Ccircle cx='539' cy='269' r='3'/%3E%3Ccircle cx='603' cy='493' r='3'/%3E%3Ccircle cx='731' cy='737' r='3'/%3E%3Ccircle cx='520' cy='660' r='3'/%3E%3Ccircle cx='309' cy='538' r='3'/%3E%3Ccircle cx='295' cy='764' r='3'/%3E%3Ccircle cx='40' cy='599' r='3'/%3E%3Ccircle cx='102' cy='382' r='3'/%3E%3Ccircle cx='127' cy='80' r='3'/%3E%3Ccircle cx='370' cy='105' r='3'/%3E%3Ccircle cx='578' cy='42' r='3'/%3E%3Ccircle cx='237' cy='261' r='3'/%3E%3Ccircle cx='390' cy='382' r='3'/%3E%3C/g%3E%3C/svg%3E");`,
        radialDark:`radial-gradient(circle 600px at 700px 200px, ${colors.purple[900]}, transparent),
                      radial-gradient(circle 400px at calc(100% - 300px) 300px, ${colors.cyan[700]}, transparent),
                      radial-gradient(circle 600px at right center, ${colors.sky[800]}, transparent),
                      radial-gradient(circle 600px at right bottom, ${colors.sky[900]}, transparent),
                      radial-gradient(circle 600px at calc(50% - 600px) calc(100% - 100px), ${colors.pink[600]}, ${colors.pink[900]}, transparent)`,

        radial:`radial-gradient(circle 350px at left center, ${colors.orange[700]}, ${colors.orange[900]}, transparent),
                radial-gradient(circle 350px at 450px calc(50% - 250px), ${colors.orange[700]}, ${colors.orange[900]}, transparent),
                radial-gradient(circle 380px at 500px calc(50% + 150px), ${colors.orange[700]}, ${colors.orange[900]}, transparent)`,

        teste: `conic-gradient(from 180deg at 50% 50%,#e92a67 0deg, ${colors.rose[600]} 112.5deg, ${colors.indigo[600]} 228.75deg,rgba(255,255,255,0) 360deg)`
      }
    },
  },
  plugins: [],
  darkMode: "class"
}
