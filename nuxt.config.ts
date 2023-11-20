// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Nuxt Boilerplate",
      meta: [
        { "http-equiv": "X-UA-Compatible", content: "IE=edge"},
        { name: "viewport", content: "width=device-width, initial-scale=1.0, shrink-to-fit=no"},
        { name: "description", content: "" },
        { name: "keyword", content: "" },
      ],
      htmlAttrs: {
        lang: "en"
      },
      charset: "utf-8",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
    [
      '@nuxtjs/eslint-module', 
      {
        failOnError: true,
        formatter: 'unix',
      }
    ]
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
