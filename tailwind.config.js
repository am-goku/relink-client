/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,css,js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        120: "30rem", // You can adjust the width as needed
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

