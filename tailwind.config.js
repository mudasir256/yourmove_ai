/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#E85E5C",
        "brand-secondary": "#410B13",
        "brand-dark": "#270006",
        "brand-alt": "#E85E5C",
        main: "#f1f1f1",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
