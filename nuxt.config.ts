import { pwa } from './config/pwa'
import { appDescription } from './utils/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    'radix-vue/nuxt',
    '@nuxt/devtools',
    '@nuxtjs/i18n',
    '@vue-macros/nuxt',
    '@nuxtjs/sanity',
    '@nuxt/image',
    '@hypernym/nuxt-gsap',
  ],

  gsap: {
    composables: true,
    extraPlugins: {
      scrollTrigger: true,
    },
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: ['en', 'vi'],
    // locales: [
    //   {
    //     code: 'en',
    //     file: 'en.json',
    //   },
    //   {
    //     code: 'vi',
    //     file: 'vi.json',
    //   },
    // ],
    // lazy: true,
    // langDir: 'locales',
  },
  sanity: {
    projectId: 'xbopepf9',
    dataset: 'production',
    apiVersion: '2023-09-15',
    useCdn: true,
    token: 'skUkcWpvAKU9pPT22C8s058oAXhuKbMowAVNkrFXuJA8UfuFbRUctmktJvmv0yhl0H0pXrVzWHmzRFVAI9xJT1Pf62ejxXvBUkB6c8KliCyEDAxo9mDwF5pcS8R6xzPJQEXVGL5vDTVNs5mZ0xQFSJvR0aX0J9X9dKp8mAJeG7dJcniNQYhh',
    additionalClients: {
      preview: {
        useCdn: false,
        perspective: 'previewDrafts',
        withCredentials: true,
      },
    },
  },

  image: {
    sanity: {
      projectId: 'xbopepf9',
      dataset: 'production',
    },
  },
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    'vue-json-pretty/lib/styles.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/login_sigma.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  // pwa,

  devtools: {
    enabled: true,
  },
  vite: {
    optimizeDeps: { exclude: ['fsevents'] },
  },
})
