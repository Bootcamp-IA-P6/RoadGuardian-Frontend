/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        asphalt: { 900: "#14171A", 800: "#1F2226", 700: "#2A2E33" },
        concrete: { 50: "#F1F2F4" },
        amber: { 500: "#F5A623", 600: "#DB8E12" },
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
}