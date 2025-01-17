// tailwind.config.js
module.exports = {
  content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // colors taken from Dirty Swan Design System
      // https://dirtyswan.design/?path=/story/css-variables-colors--page
      colors: {
        grey: {
          100: "#fafaff",
          200: "#f5f5fa",
          300: "#d2d2d8",
          500: "#b4b4ba",
          600: "#696970",
          700: "#4c4c53",
          900: "#26262e",
        },
        primary: {
          25: "#fcfcff",
          50: "#f7f7ff",
          100: "#e6e5ff",
          300: "#b1b0f5",
          500: "#8e8cee",
          700: "#6160a2",
          900: "#2e2e4c",
        },
      },
      fontSize: {
        "2sm": "0.625rem",
        sm: "0.875rem",
        base: "1rem",
        xl: "1.25rem",
      },
      minHeight: (theme) => ({
        ...theme("spacing"),
      }),
      minWidth: (theme) => ({
        ...theme("spacing"),
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
