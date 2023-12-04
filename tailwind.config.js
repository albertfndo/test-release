/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./error.vue",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      screens: {
        xs: "360px",
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          sm: "540px",
          md: "720px",
          lg: "960px",
          xl: "1140px",
          "2xl": "1320px",
        },
      },
      colors: {
        brand: "#F3C76F",
        brandSecondary: "#FAE9C5",
        primaryBg: "#121212",
        secondaryBg: "#2C2C2C",
        cardBg: "#464646",
        primaryText: "#EEECE8",
        secondaryText: "#C4C4C4",
        success: "#5EC371",
        danger: "#BC1E1E",
        dangerCard: "#D06262",
        pending: "#EBBC16",
        pendingCard: "#E9C954",
        disabled: "#666666",
      },
      boxShadow: {
        accent: "0px 0px 6px rgba(10, 10, 10, 0.5)",
        card: "0px 0px 2px rgba(10, 10, 10, 0.5)",
      },
      fontFamily: {
        'poppins-r': ['Poppins-Regular'],
        'poppins-m': ['Poppins-Medium'],
        'poppins-sb': ['Poppins-SemiBold']
      },
      fontSize: {
        xxs: "10px",
      },
    },
  },
  plugins: [],
};
