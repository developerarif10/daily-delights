module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7f3",
          100: "#ffece1",
          300: "#ffb48a",
          500: "#f97316",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
