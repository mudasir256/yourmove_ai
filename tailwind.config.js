/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        'tiny': '8px',
        'xxs': '10px',
        'base': '16px',
        'xxl': '22px',
      },
      colors: {
        "brand-primary": "#E85E5C",
        "brand-secondary": "#410B13",
        "brand-dark": "#270006",
        "brand-alt": "#E85E5C",
        main: "#f1f1f1",
        'brand-primary-light': 'rgba(232, 94, 92, 0.1)',
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
