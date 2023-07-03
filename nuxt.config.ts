import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  alias: {
    '@app': resolve(__dirname, './src/modules/app'),
  },

  dir: {
    pages: 'src/routes',
    layouts: 'src/layouts',
    plugins: 'src/plugins',
    middleware: 'src/middleware',
  },

  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
    },
  },

})
