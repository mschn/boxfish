/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        "jetbrains-mono": ["JetBrains Mono"],
      },
    },
  },
  plugins: [require("tailwindcss-primeui")],
};
