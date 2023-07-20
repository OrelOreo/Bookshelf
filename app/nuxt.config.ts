// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    modules: ['@pinia/nuxt','@nuxtjs/tailwindcss'],
    typescript: {
        strict: true
    },
    runtimeConfig: {
        public: {
            API_SERVER: process.env.API_SERVER_URL,
        }
      }
})
