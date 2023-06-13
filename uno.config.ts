// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
  presetWebFonts,
} from 'unocss'
import { presetAnu } from './preset'
import { presetThemeDefault } from './preset-theme-default/src'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter',
      }
    }),
    // anu-vue presets
    presetAnu(),
    presetThemeDefault(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
