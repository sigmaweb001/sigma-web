import { createDefu } from 'defu'
import type { LiteralUnion } from 'type-fest'
import type { PropType } from 'vue'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import { ThemeColors } from './plugin'

export type ColorProp = LiteralUnion<ThemeColors, string> | undefined


export const disabled = { type: Boolean } as const

export const readonly = { type: Boolean } as const

export const configurable = {
  type: [Array, String, Number, Object, undefined] as PropType<ConfigurableValue>,
} as const

export const defuProps = createDefu((obj, key, value) => {
  // If merging type => Just override the existing type
  if (key === 'type') {
    obj[key] = value

    return true
  }

  // Remove default value if `required: true` is passed
  else if (key === 'required' && value) {
    delete obj.default

    // Assign required as usual
    obj[key] = value

    return true
  }
})
