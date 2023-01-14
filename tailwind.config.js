const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  purge: [`./src/**/*.{js,ts,jsx,tsx}`],
  darkMode: "class", // or 'media' or 'class'
  mode: "jit",
  theme: {
    screens: {
      xs: "420px",
      // => @media (min-width: 400px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "970px",
      // => @media (min-width: 1024px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        gray: colors.trueGray,
        dynamic: {
          logo: "#3A3A3A",
          black: "#000000",
          gray: "#4B4B4B",
          red: "#dc2626",
          lightGray: "#EFEFEF",
        },
      },
      boxShadow: {
        top: "0 4px 6px 4px rgba(0, 0, 0, 0.1), 0 2px 4px 4px rgba(0, 0, 0, 0.04)",
      },
      typography: {
        DEFAULT: {
          css: {
            h2: {
              // "margin-top": "200px",
            },
          },
        },
        lg: {
          css: {
            h2: {
              "margin-top": "1.6em",
              "margin-bottom": "0.8em",
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
