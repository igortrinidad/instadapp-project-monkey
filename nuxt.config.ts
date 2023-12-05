import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  devtools: { enabled: true },
  
  runtimeConfig: {
    OPEN_AI_KEY: process.env.OPEN_AI_KEY,
    public: {
      ENCRYPTION_KEY: process.env.NUXT_PUBLIC_ENCRYPTION_KEY,
    }
  },

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
