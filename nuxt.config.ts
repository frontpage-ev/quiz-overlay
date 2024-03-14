// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  css: [
    '~/assets/css/base.css'
  ],

  nitro: {
    experimental: {
      database: true
    },
    storage: {
      file: {
        driver: 'fs',
        base: './.data/kv'
      }
    }
  }
})
