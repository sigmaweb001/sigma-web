<script lang="ts" setup>
const props = defineProps<{
  left?: boolean
  col?: number
  gap?: number
  padding?: number
  noBorder?: boolean
  feat?: boolean
}>()

const { left, col, gap, padding, noBorder, feat } = toRefs(props)

const keyFeature = useKeyFeature()
</script>

<template>
  <div
    v-if="!keyFeature ? true : !!feat"
    :style="{ '--col': col ?? 4, '--gap': gap ? `${gap}px` : '24px', '--padding': padding ? `${padding}px` : '0px' }"
    class="grid gap-[var(--gap)] border-l-[2px] p-[var(--padding)] xl:grid-cols-[repeat(var(--col),minmax(0,1fr))] first:border-l-transparent not-first:border-l-primary"
    :class="[
      noBorder ? '' : 'border-b-[1px] border-b-gray-200 dark:border-b-trueGray-700',
    ]"
  >
    <slot
      name="default"
      mdc-unwrap="p"
    />
  </div>
</template>
