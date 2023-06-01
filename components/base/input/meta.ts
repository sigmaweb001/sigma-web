import type { ExtractPublicPropTypes } from 'vue'
import { aBaseInputProps, aBaseInputSlots } from '@/components/base/base-input'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aInputProps = {
  ...aBaseInputProps,
  modelValue: [String, Number] as PropType<string | number>,
} as const
export type AInputProps = ExtractPublicPropTypes<typeof aInputProps>

// 👉 Slots
const { default: _, ...aTextareaBaseInputSlots } = aBaseInputSlots

export { aTextareaBaseInputSlots }
export const aInputSlots = {
  ...aTextareaBaseInputSlots,
} as const

// 👉 Events
export interface AInputEvents {
  (e: 'update:modelValue', value: AInputProps['modelValue']): void
}
