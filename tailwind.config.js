/** @type {import('tailwindcss').Config} */
module.exports = {
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
      screens: {
        xs: '360px',
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          sm: "540px",
          md: "720px",
          lg: "960px",
          xl: "1140px",
          '2xl': "1320px",
        },
      },
      colors: {
        brand: "#F3C76F",
        brandSecondary: "#9C855B",
        whiteAccent: "#F1F1F1",
        blackAccent: "#1D1D1D",
      },
      // boxShadow: {
      //   accent: "0px 0px 5px rgba(10, 10, 10, 0.5)",
      //   card: "0px 0px 2px rgba(10, 10, 10, 0.5)",
      // },
      // fontFamily: {
      //   'inter-l': ['Inter-Light'],
      //   'inter-r': ['Inter-Regular'],
      //   'inter-m': ['Inter-Medium'],
      //   'inter-sb': ['Inter-SemiBold'],
      //   'inter-b': ['Inter-Bold'],
      // }
    },
  },
  plugins: [],
}

