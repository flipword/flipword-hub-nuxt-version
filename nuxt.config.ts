import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
    css: ['~/assets/css/tailwind.css'],
    buildModules: ['@nuxtjs/tailwindcss'],
})
