/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B57B7",
        accent: "#F36A10",
        lightBlue: "#EAF3FF",
        softOrange: "#FFF3E8",
      },
    },
  },
  plugins: [],
}