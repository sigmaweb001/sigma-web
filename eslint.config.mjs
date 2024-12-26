import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(antfu({
  unocss: true,
  formatters: true,
  rules: {
    'unused-imports/no-unused-vars': 'warn',
  },
})).overrideRules({
  'vue/max-attributes-per-line': ['warn', { singleline: 3 }],
})
