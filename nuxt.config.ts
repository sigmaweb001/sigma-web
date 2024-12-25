export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },

  modules: [
    '@nuxt/content',
    '@vue-macros/nuxt',
    '@nuxt/image',
    '@unocss/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    'radix-vue/nuxt',
    '@nuxthq/studio',
    'nuxt-icon',
    // '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxt/devtools',
    'nuxt-gtag',
    '@nuxt/eslint',
  ],

  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },

  content: {
    markdown: { remarkPlugins: ['remark-reading-time'] },
  },

  app: {
    head: {
      script: [
        {
          src: '//fw-cdn.com/11186380/3902989.js',
          async: true,
          defer: true,
        },
        {
          src: 'https://js.appointlet.com/',
          async: true,
          defer: true,
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://js.appointlet.com/styles.css' },
      ],
    },
  },

  macros: {
    betterDefine: false,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  googleFonts: {
    families: {
      'Noto Sans': '100..800',
    },
    download: true,
  },

  i18n: {
    vueI18n: './i18n.config.ts',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
      {
        code: 'vi',
        file: 'vi.json',
      },
    ],
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: false,
  },

  colorMode: {
    classSuffix: '',
    preference: 'light',
  },

  $development: {
    css: [
      'vue-json-pretty/lib/styles.css',
    ],
  },

  runtimeConfig: {
    public: {
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY,
    },
  },

  nitro: {
    prerender: {
      failOnError: false,
    },
  },

  compatibilityDate: '2024-12-25',
})