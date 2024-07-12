import withNuxt from './.nuxt/eslint.config.mjs'
import antfu from '@antfu/eslint-config'

export default withNuxt(antfu({
  unocss: true,
  formatters: true,
  rules: {
    'unused-imports/no-unused-vars': 'warn',
  },
}))
