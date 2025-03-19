<script lang="ts" setup>
import tinycolor from 'tinycolor2'

const props = defineProps<{
  color: string
  to?: string
  active?: boolean
}>()

const { color, to, active } = toRefs(props)

const hslColor = computed(() => tinycolor(color.value).toHsl())

const textColor = computed(() => {
  return invert(color.value, { black: '#000000', white: '#ffffff', threshold: 0.38 })
})

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <Component
    :is="to ? NuxtLink : 'div'"
    :to="to"
    :style="{
      '--color': `hsl(${hslColor.h} ${hslColor.s * 100}% ${hslColor.l * 100}% / var(--opacity, 1))`,
      '--textColor': textColor,
      '--opacity': 0.5,
    }"
    class="inline-block max-w-240px truncate border-1 border-$color rounded-8px px-1.5 py-1.5 text-12px/12px font-medium tracking-wider uppercase"
    :class="[
      active ? 'text-$textColor' : 'text-$color',
      active ? 'bg-$color' : 'bg-none',
    ]"
  >
    <slot />
  </Component>
</template>
