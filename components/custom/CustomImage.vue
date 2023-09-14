<script lang="ts" setup>
const { crop } = definePropsRefs<{
  crop: {
    left: number
    top: number
    bottom: number
    right: number
  }
  hotspot: {
    height: number
    width: number
    x: number
    y: number
  }
  asset: {
    _ref: string
  }
}>()
</script>

<template>
  <NuxtImg :src="asset._ref" provider="sanity" loading="lazy" />
</template>
