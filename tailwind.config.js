/** @type {import('tailwindcss').Config} */
/** @import {url("https://fonts.googleapis.com/css2?family=Poppins&display=swap")} */


module.exports = {
  content: [
    "./src/**/*.{html,css,js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // fontSize: {
    //   title: `2.6rem;`,
    //   paragraph: `1.2rem;`
    // },
    extend: {
      width: {
        120: "30rem", // You can adjust the width as needed
      },
      colors: {
        primary: {
          500: '#FF6363;',
          800: '#FF1313;',
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

