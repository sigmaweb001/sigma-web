<script lang="ts" setup>
const { col } = definePropsRefs<{
  left?: boolean
  col?: number
  gap?: number
  padding?: number
  noBorder?: boolean
}>()
</script>

<template>
  <div
    :style="{ '--col': col ?? 4, '--gap': gap ? `${gap}px` : '24px', '--padding': padding ? `${padding}px` : '0px' }"
    class="grid gap-[var(--gap)] border-l-2px p-[var(--padding)] xl:grid-cols-[repeat(var(--col),minmax(0,1fr))] first:border-l-transparent not-first:border-l-primary"
    :class="[
      noBorder ? '' : 'border-b-1px border-b-gray-200 dark:border-b-trueGray-700',
    ]"
  >
    <ContentSlot :use="$slots.default" unwrap="p" />
  </div>
</template>
