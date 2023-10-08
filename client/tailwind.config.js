/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": { min: "1367px" },
      },
      colors: {
        background: "#F2F2F2",
        foreground: "#FFFFFF",
        textColor: { DEFAULT: "#4B4B4B", light: "#A8A7A7" },
        accent: {
          primary: "#D1AC6C",
          secondary: "#0B0B0D",
          tertiary: {
            DEFAULT: "#961a23",
            light: "#d42127",
            hover: "#ff272e",
          },
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
