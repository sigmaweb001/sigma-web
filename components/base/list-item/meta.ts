import type { ExtractPublicPropTypes } from 'vue'
import { configurable, disabled } from '@/composables/useProps'

import { aTypographyProps } from '@/components/base/typography'
import { aLayerProps } from '@/composables/useLayer'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aListItemProps = {
  ...{
    ...aLayerProps,
    states: {
      ...aLayerProps.states,
      default: true,
    },
  },

  ...aTypographyProps,

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  /**
   * List item value, makes list item clickable.
   */
  value: { type: null },

  /**
   * List item icon
   */
  icon: configurable,

  /**
   * Render icon at the end instead of starting of list item
   */
  iconAppend: Boolean,

  /**
   * Mark list item disabled
   */
  disabled,

  /**
   * Props for rendering avatar.
   */
  avatarProps: Object,

  /**
   * Render avatar at the end instead of starting of list item
   */
  avatarAppend: Boolean,

  /**
   * Mark list item as active
   */
  isActive: Boolean,
} as const
export type AListItemProps = ExtractPublicPropTypes<typeof aListItemProps>

// 👉 Slots
export const aListItemSlots = {
  /**
   * Render custom content and override other slots.
   */
  default: (_: {
    item: AListItemProps
  }) => null as any,

  /**
   * Prepend custom content to the list item
   */
  prepend: (_: {
    item: AListItemProps
  }) => null as any,

  /**
   * Render custom content instead of `ATypography` preserving `prepend` and `append` slot usage
   */
  content: (_: {
    item: AListItemProps
  }) => null as any,

  /**
   * Append custom content to the list item
   */
  append: (_: {
    item: AListItemProps
  }) => null as any,
} as const

// 👉 Events
export interface AListItemEvents {
  (e: 'click:icon'): void
  (e: 'click:avatar'): void
  (e: 'click:iconAppend'): void
  (e: 'click:avatarAppend'): void
}
