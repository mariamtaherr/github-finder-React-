/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0e1621",
        panel: "#16202c",
        edge: "#263241",
        accent: "#f5c93f",
        link: "#6cb4ff",
      },
    },
  },
  plugins: [],
};
