<script lang="ts" setup>
const { nomargin, color } = definePropsRefs<{
  nomargin?: boolean
  pill?: boolean
  color?: 'green' | 'blue' | 'orange' | 'purple' | 'pink'
}>()
const colors = {
  green: 'text-emerald-700',
  blue: 'text-blue-600',
  orange: 'text-orange-700',
  purple: 'text-purple-600',
  pink: 'text-pink-600',
}
const bgcolor = {
  green: 'bg-emerald-50',
  blue: 'bg-blue-50',
  orange: 'bg-orange-50',
  purple: 'bg-purple-50',
  pink: 'bg-pink-50',
}
</script>

<template>
  <div
    v-if="pill"
    class="h-6 inline-flex shrink-0 items-center justify-center rounded-full bg-blue-50 px-2 text-sm font-bold text-blue-500 dark:bg-gray-800 dark:text-gray-300"
  >
    <slot />
  </div>
  <span
    v-else class="inline-block text-xs font-medium tracking-wider uppercase" :class="[
      !nomargin && 'mt-5',
      colors[color] || colors.pink,
      bgcolor[color] || bgcolor.pink,
    ]"
  >
    <slot />
  </span>
</template>
