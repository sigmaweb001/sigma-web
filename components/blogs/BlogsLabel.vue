<script lang="ts" setup>
const { color, to } = definePropsRefs<{
  to: string
  color?: 'green' | 'blue' | 'orange' | 'purple' | 'pink'
}>()
const colors = {
  green: 'text-emerald-700',
  blue: 'text-blue-600',
  orange: 'text-orange-600',
  purple: 'text-purple-600',
}
const bgcolor = {
  green: 'bg-emerald-50',
  blue: 'bg-blue-50',
  orange: 'bg-orange-50',
  purple: 'bg-purple-50',
}

const active = {
  green: '!text-emerald-50 !bg-emerald-700',
  blue: '!text-blue-50 !bg-blue-600',
  orange: '!text-orange-50 !bg-orange-500',
  purple: '!text-purple-50 !bg-purple-600',
}
</script>

<template>
  <NuxtLink
    :exact-active-class="active[color] || active.orange" :to="to" v-bind="$attrs"
    class="inline-block rounded rounded-full px-5px py-2px text-11px font-medium tracking-wider uppercase" :class="[
      colors[color] || colors.orange,
      bgcolor[color] || bgcolor.orange,
    ]"
  >
    <span>
      <slot />
    </span>
  </NuxtLink>
</template>
