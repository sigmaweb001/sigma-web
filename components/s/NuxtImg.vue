<script lang="ts" setup>
const props = defineProps<{
  width?: string | number
  height?: string | number
  fit?: string
  format?: string
  provider?: string
  preset?: string
  densities?: string
  modifiers?: Record<string, any>
  sizes?: string | Record<string, any>
  quality?: string | number
  preload?: boolean
  background?: string
  alt?: string
  referrerpolicy?: string
  usemap?: string
  longdesc?: string
  ismap?: boolean
  loading?: string
  crossorigin?: boolean | 'anonymous' | 'use-credentials'
  decoding?: 'auto' | 'async' | 'sync'
  placeholder?: string | number | boolean | unknown[]
  image: {
    asset: {
      _ref: string
    }
  }
}>()
</script>

<template>
  <NuxtImg
    v-bind="{ ...props, ...$attrs }"
    provider="sanity"
    :src="image.asset._ref"
    class="absolute inset-0 h-full w-full object-cover"
    fit="cover"
  />
  <!-- sizes="xs:96px" -->
</template>
