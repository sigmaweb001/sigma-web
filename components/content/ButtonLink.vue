<script setup lang="ts">
import { PinceauTheme } from 'pinceau'
import { computedStyle } from 'pinceau/runtime'

defineProps({
  blank: {
    type: Boolean,
    required: false,
    default: false
  },
  color: computedStyle<keyof PinceauTheme['color']>('primary'),
  href: {
    type: String,
    required: true,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  ...variants
})
</script>

<template>
  <NuxtLink
    class="button-link"
    :to="href"
    :target="blank ? '_blank' : undefined"
  >
    <Icon
      v-if="icon"
      :name="icon"
    />
    <ContentSlot
      :use="$slots.default"
      unwrap="p ul li"
    />
  </NuxtLink>
</template>

<style lang="ts" scoped>
css({
  '.button-link': {
    display: 'inline-flex',
    flex: 'none',
    alignItems: 'center',
    fontWeight: '{elements.buttonLink.fontWeight}',
    // color: (props) => `{color.${props.color}.500}`,
    color: 'white',
    // backgroundImage: (props) => `linear-gradient(135deg, {color.${props.color}.300} 0%, {color.${props.color}.400} 100%)`,
    backgroundColor: '{button.backgroundColor.static}',
    borderWidth: '{elements.buttonLink.borderWidth}',
    borderStyle: '{elements.buttonLink.borderStyle}',
    borderColor: '{elements.buttonLink.borderColor}',
    borderRadius: '{elements.buttonLink.borderRadius}',
    width: '{elements.buttonLink.width}',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: '{button.backgroundColor.hover}',
    },
    '&:focus': {
      outline: 'none',
      boxShadow: (props) => `0 0 0 1px {color.${props.color}.400}`,
    },
    '.icon': {
      marginInlineEnd: '{elements.buttonLink.icon.marginInlineEnd}'
    },
  },
  variants: {
    size: {
      small: {
        padding: `{elements.buttonLink.small.padding}`,
        fontSize: '{elements.buttonLink.small.fontSize}',
        lineHeight: '{elements.buttonLink.small.lineHeight}',
      },
      medium: {
        padding: `{elements.buttonLink.medium.padding}`,
        fontSize: '{elements.buttonLink.medium.fontSize}',
        lineHeight: '{elements.buttonLink.medium.lineHeight}',
      },
      large: {
        padding: `{elements.buttonLink.large.padding}`,
        fontSize: '{elements.buttonLink.large.fontSize}',
        lineHeight: '{elements.buttonLink.large.lineHeight}',
      },
      giant: {
        padding: `{elements.buttonLink.giant.padding}`,
        fontSize: '{elements.buttonLink.giant.fontSize}',
        lineHeight: '{elements.buttonLink.giant.lineHeight}',
      },
      options: {
        default: 'medium'
      }
    },
    ghost: {
      true: {
        boxShadow: 'none',
        '--button-backgroundColor-static': `transparent`,
        '--button-backgroundColor-hover': (props) => `{color.${props.color}.100}`,
        '@dark': {
          '--button-backgroundColor-hover': (props) => `{color.${props.color}.800}`,
        },
        '&:hover': {
          boxShadow: '{elements.buttonLink.boxShadow}',
        },
      },
      false: {
        boxShadow: '{elements.buttonLink.boxShadow}',
        '--button-backgroundColor-static': (props) => `{color.${props.color}.100}`,
        '--button-backgroundColor-hover': (props) => `{color.${props.color}.200}`,
        '@dark': {
          '--button-backgroundColor-static': (props) => `{color.${props.color}.700}`,
          '--button-backgroundColor-hover': (props) => `{color.${props.color}.600}`,
        }
      }
    }
  }
})
</style>
