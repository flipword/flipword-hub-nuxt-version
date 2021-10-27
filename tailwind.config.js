module.exports = {
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#FF9100",
      base: "#EAEAEA",
      white: "#FFFFFF",
      whiteShadow: "#C1C1C1",
    },
    borderColor: {
      primary: "#FF9100",
      base: "#EAEAEA",
      white: "#FFFFFF",
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    textColor: {
      black: "#1E1E1E",
    },
    extend: {
      borderRadius: {
        "5xl": "5rem",
      },
      fontSize: {
        title: "5vw",
        subtitle: "1.75vw",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
