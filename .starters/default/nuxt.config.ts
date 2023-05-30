export default defineNuxtConfig({
  // https://github.com/nuxt-themes/docus
  extends: '@nuxt-themes/docus',
  css: ["aos/dist/aos.css"],

  modules: [
    // https://github.com/nuxt-modules/plausible
    '@nuxtjs/plausible',
    // https://github.com/nuxt/devtools
    '@nuxt/devtools',
    '@unocss/nuxt',
  ],
  devtools: {
    enabled: true,
    componentInspector: {
      toggleComboKey: 'meta-shift-x',
    },
  },
})
