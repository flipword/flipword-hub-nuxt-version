module.exports = {
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#FF9100",
      positive: "#01da7c",
      base: "#EAEAEA",
      white: "#FFFFFF",
      whiteShadow: "#C1C1C1",
      black: "#000000",
    },
    borderColor: {
      primary: "#FF9100",
      base: "#EAEAEA",
      white: "#FFFFFF",
      whiteShadow: "#C1C1C1",
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    dropShadow: {
      top: "0 -4px 3px rgba(0, 0, 0, 0.05)",
    },
    textColor: {
      black: "#1E1E1E",
      white: "#FFFFFF",
    },
    extend: {
      fontFamily: {
        sans: ["QuicksandCustom"],
      },
      borderRadius: {
        "4xl": "4rem",
        "5xl": "5rem",
      },
      fontSize: {
        title: "5.5vw",
        subtitle: "2vw",
        button: "1.75vw",
        demo: "1.5vw",
      },
      spacing: {
        110: "27rem",
        "2.5vw": "2.5vw",
        "7vw": "7vw",
        "14vw": "14vw",
        "-15vh": "-15vh",
      },
      screens: {
        xs: "500px",
        "4xl": "1600px",
      },
      margin: {
        "1/12": "8.33%",
      },
      padding: {
        "1/12": "8.33%",
      },
      zIndex: {
        behind: "-1",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
