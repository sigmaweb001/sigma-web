// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetAnu } from './preset'
import { presetThemeDefault } from './preset-theme-default/src'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),

    // anu-vue presets
    presetAnu(),
    presetThemeDefault(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
