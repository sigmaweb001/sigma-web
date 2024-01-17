<script lang="ts" setup>
const { recommended } = definePropsRefs<{
  recommended?: boolean
}>()
</script>

<template>
  <div class="border-2px grid grid-rows-subgrid grid-row-[span_4] gap-4 rounded-12px p-24px"
    :class="[recommended ? 'border-primary' : 'border-transparent']">
    <div class="flex gap-3 items-center">
      <div class="text-base font-bold">
        <ContentSlot :use="$slots.title" unwrap="p" />
      </div>
      <div v-if="recommended" class="px-2 py-1 rounded-full text-sm font-500 border-primary border-1px text-primary">
        Recommended
      </div>
    </div>
    <div class="flex gap-3 items-end">
      <div class="font-bold text-5xl">
        <ContentSlot :use="$slots.price" unwrap="p" />
      </div>
      <div class="text-base font-bold text-secondary">
        <ContentSlot :use="$slots.subprice" unwrap="p" />
      </div>
    </div>
    <div class="text-pretty leading-snug text-sm">
      <ContentSlot :use="$slots.subtitle" unwrap="p" />
    </div>
    <div class="flex flex-col gap-2">
      <ContentSlot :use="$slots.cta" unwrap="p" />
    </div>
  </div>
</template>
