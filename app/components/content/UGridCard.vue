<script lang="ts" setup>
const props = defineProps<{
  title?: string
  description?: string
  image?: string
  left?: boolean
  icon?: string
}>()
</script>

<template>
  <UPageCard
    v-bind="props"
    :ui="{
      root: left ? 'text-left rounded-2xl' : 'text-center rounded-2xl',
      leadingIcon: 'size-17 p-1',
    }"
    spotlight
    variant="subtle"
  >
    <template
      v-if="image"
      #header
    >
      <img
        :src="image"
        class="size-18 mx-auto"
      >
    </template>
  </UPageCard>
</template>
