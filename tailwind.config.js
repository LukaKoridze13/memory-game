/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#FCFCFC",
      darkwhite: "#F2F2F2",
      darkest: "#152938",
      darkgrey: "#304859",
      newgame: "#DFE7EC",
      orange: "#FDA214",
      lightorange: "#FFB84A",
      lightgrey: "#BCCED9",
      grey: "#7191A5",
      bluegrey: "#6395B8",
      menu:"rgba(151,151,151,0.3)"
    },
    extend: {
      boxShadow: {
        'full': '0 0 0 9999px white',
      }
    },
  },
  plugins: [],
};
