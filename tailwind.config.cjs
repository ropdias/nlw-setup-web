/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      // Here we are adding a color to tailwind that didnt exist in the color palette
      colors: {
        background: "#09090A",
      },
    },
  },
  plugins: [],
};
