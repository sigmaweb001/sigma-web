<script lang="ts" setup>
const { recommended } = definePropsRefs<{
  recommended?: boolean
}>()

const full = inject('full')
// const full = ref(true)
</script>

<template>
  <div
    class="z-1 grid grid-rows-subgrid gap-4 rounded-12px p-24px shadow-black/25 shadow-md ring-2px ring-inset" :class="[
      recommended ? 'ring-primary' : 'ring-transparent',
      full ? 'grid-row-[span_4]' : 'grid-row-[span_2]',
    ]"
  >
    <div class="flex items-center gap-3">
      <div class="text-base font-bold">
        <ContentSlot :use="$slots.title" unwrap="p" />
      </div>
      <div
        v-if="recommended && full"
        class="border-1px border-primary rounded-full px-2 py-1 text-sm text-primary font-500"
      >
        Recommended
      </div>
      <div v-if="!full" class="flex items-end gap-1">
        <div class="text-base font-bold">
          <ContentSlot :use="$slots.price" unwrap="p" />
        </div>
        <div class="text-base text-secondary font-500">
          <ContentSlot :use="$slots.subprice" unwrap="p" />
        </div>
      </div>
    </div>
    <div v-if="full" class="flex items-end gap-3">
      <div class="text-5xl font-bold">
        <ContentSlot :use="$slots.price" unwrap="p" />
      </div>
      <div class="text-base text-secondary font-bold">
        <ContentSlot :use="$slots.subprice" unwrap="p" />
      </div>
    </div>
    <div v-if="full" class="text-pretty text-sm leading-snug">
      <ContentSlot :use="$slots.subtitle" unwrap="p" />
    </div>
    <div class="flex flex-col gap-2" :class="[full ? '' : 'max-h-44px of-hidden']">
      <ContentSlot :use="$slots.cta" unwrap="p" />
    </div>
  </div>
</template>
