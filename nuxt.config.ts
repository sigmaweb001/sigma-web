import yaml from '@rollup/plugin-yaml'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/content',
    // '@nuxt/image',
    '@nuxt/scripts',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'nuxt-cloudflare-analytics',
    'nuxt-llms',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    'nuxt-gtag',
  ],
  devtools: {
    enabled: true,
  },

  app: {
    head: {
      script: [
        {
          src: 'https://js.appointlet.com/',
          async: true,
          defer: true,
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo_sigma.png' },
        { rel: 'stylesheet', href: 'https://js.appointlet.com/styles.css' },
      ],
    },
  },
  css: ['~/assets/main.css'],
  colorMode: {
    preference: 'light',
  },
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['sql', 'diff'],
        },
      },
    },
    preview: {
      api: 'https://api.nuxt.studio',
    },
  },
  ui: {

    theme: {
      colors: ['primary', 'secondary', 'info', 'success', 'warning', 'error', 'important'],
    },
  },

  runtimeConfig: {
    public: {
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Lejt7ElAAAAALNFyfDMb8_dlRbbi7EMCJEK_tT2',
      ssaiManualUrl: process.env.NUXT_PUBLIC_SSAI_MANUAL_URL || '',
      playerUrl: process.env.NUXT_PUBLIC_PLAYER_URL || '',
      //
      ssaiUrl: process.env.NUXT_PUBLIC_SSAI_URL || '',
      ssaiAdsEndpoint: process.env.NUXT_PUBLIC_SSAI_ADS_ENDPOINT || '',

      // ai ssai
      ssaiAiRawUrl: process.env.NUXT_PUBLIC_SSAI_AI_RAW_URL || '',
      ssaiAiAdsUrl: process.env.NUXT_PUBLIC_SSAI_AI_ADS_URL || '',
    },
  },
  routeRules: {
    '/': { prerender: true },
    // '/api/templates.json': { prerender: true },
    // '/blog/rss.xml': { prerender: true },
  },
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-02-11',
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      // For CF trailing slash issue
      autoSubfolderIndex: false,
      failOnError: false,
    },
  },
  vite: {
    plugins: [
      yaml(),
    ],
  },
  typescript: {
    strict: false,
  },
  cloudflareAnalytics: {
    token: '469b1f7049f14941acef0d0262a07ab3',
    scriptPath: false,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID || 'G-BV8FJFFZLR',
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'en',
        file: 'en.json',
        name: 'English',
        language: 'en-US',
      },
      {
        code: 'vi',
        file: 'vi.json',
        name: 'Vietnamese',
        language: 'vi-VN',
      },
    ],
    lazy: true,
    langDir: '',
    detectBrowserLanguage: false,
  },
  llms: {
    domain: 'https://sigma.video',
    title: 'SigmaStreaming Documentation for LLMs',
    description: '',
    full: {
      title: '',
      description: '',
    },
  },
})
