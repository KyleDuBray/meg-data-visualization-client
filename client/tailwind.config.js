/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          //access with "primary-<int>"
          1: "#F3C2A4",
          2: "#7063A4",
        },
      },
    },
  },
  plugins: [],
};
