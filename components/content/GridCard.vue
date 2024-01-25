<script lang="ts" setup>
defineProps<{
  span?: number
  icon?: string
  left?: boolean
  padding?: number
}>()

const slot = useSlots()
const rowSpan = computed(() => {
  let rowSpan = 1
  if (slot.title)
    rowSpan++
  if (slot.subtitle)
    rowSpan++
  if (slot.default)
    rowSpan++
  if (slot.cta)
    rowSpan++
  return rowSpan
})
</script>

<template>
  <div
    class="grid grid-row-[span_4] col-span-[var(--span)] grid-rows-subgrid gap-3 rounded-xl bg-gray-100 p-[var(--padding)] dark:bg-trueGray-800"
    :style="{
      '--span': span ?? 1, '--padding': padding ? `${padding}px` : '24px', 'grid-row': `span ${rowSpan}`,
    }"
  >
    <div :class="[left ? '' : 'flex-center']">
      <div v-if="$slots.image" class="relative size-70px flex flex-shrink-0">
        <Slot class="absolute inset-0 h-full w-full object-scale-down">
          <ContentSlot :use="$slots.image" unwrap="p" />
        </Slot>
      </div>
      <div v-else-if="icon" class="size-70px flex flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
        <Icon :name="icon ?? 'i-ri:article-line'" class="h-48px w-48px text-primary" />
      </div>
    </div>
    <div
      v-if="$slots.title" class="text-gray-800 font-medium dark:text-gray-200"
      :class="[left ? '' : 'text-center text-balance']"
    >
      <ContentSlot :use="$slots.title" unwrap="p" />
    </div>
    <div v-if="$slots.subtitle" :class="[left ? '' : 'text-balance text-center text-15px/22px']">
      <ContentSlot :use="$slots.subtitle" unwrap="p" />
    </div>
    <div v-if="$slots.default" class="text-15px/22px">
      <ContentSlot :use="$slots.default" unwrap="p" />
    </div>
    <div v-if="$slots.cta" class="mx-auto text-15px/22px">
      <ContentSlot :use="$slots.cta" unwrap="p" />
    </div>
  </div>
</template>
