<script lang="ts" setup>
const { children, level, listItem, style } = definePropsRefs<{
  style: 'normal'
  listItem: 'bullet'
  children?: any
  level: 1
}>()
</script>

<template>
  <li v-if="listItem === 'bullet'" class="flex items-center gap-2" not-last="mb-4">
    <span class="h-24px w-24px flex-center rounded-full bg-primary/50">
      <i class="i-ri-check-line text-14px text-primary" />
    </span>
    <SSanityContent :blocks="children" />
  </li>
</template>
