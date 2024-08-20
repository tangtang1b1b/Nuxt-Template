/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      boxShadow: {
        nav: "0 2px 4px rgba(0, 0, 0, 0.1)",
        button: "0 4px 6px 1px rgba(0, 0, 0, 0.2)"
      }
    },
  },
  plugins: [],
}

