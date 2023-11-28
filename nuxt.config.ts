// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Bottle Keeping - Customer",
      meta: [
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, shrink-to-fit=no",
        },
        { name: "description", content: "Welcome to Bottle Keeping System" },
        { name: "keyword", content: "" },
        { name: "robots", content: "noindex" },
      ],
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-8",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/images/logo/hwg-logo.svg",
        },
        { rel: "prefetch", as: "image", href: "/images/icon-not-found.svg" },
        { rel: "prefetch", as: "image", href: "/images/watermark.webp" },
        { rel: "prefetch", as: "image", href: "/images/logo/hwg-logo.svg" },
      ],
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: "https://customer.holywings.id",
      environment: "production",
      version: "0.0.1",
    },
  },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
      },
    ],
    [
      "@nuxtjs/eslint-module",
      {
        failOnError: true,
        formatter: "unix",
      },
    ],
    "@nuxt/image",
  ],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
