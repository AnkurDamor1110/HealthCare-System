/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primarycolor: "#0067FF",
        yellowcolor: "#FEB60D",
        purplecolor: "#9771FF",
        iriscolor: "#01B5C5",
        headingcolor: "#181A1E",
        textcolor: "#4E545F",
      },

      boxshadow:{
        panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px:",
      },
    },
  },
  plugins: [],
}

