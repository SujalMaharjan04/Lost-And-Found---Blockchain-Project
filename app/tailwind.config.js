/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          500: "#6f4cff",
          600: "#5a3ae6",
          700: "#452ec7",
        },
      },
    },
  },
  plugins: [],
};
