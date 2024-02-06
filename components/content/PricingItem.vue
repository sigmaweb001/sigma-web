<script lang="ts" setup>
const { recommended } = definePropsRefs<{
  recommended?: boolean
}>()

const full = inject('full')
// const full = ref(true)
</script>

<template>
  <div
    class="z-1 grid grid-rows-subgrid gap-4 rounded-12px p-24px shadow-black/25 shadow-md" :class="[
      recommended ? 'from-primary-400 to-primary-500 bg-gradient-to-lt text-primary-foreground' : '',
      full ? 'grid-row-[span_4]' : 'grid-row-[span_2]',
    ]"
  >
    <div class="flex items-center gap-3">
      <div class="text-lg font-bold">
        <ContentSlot :use="$slots.title" unwrap="p" />
      </div>
      <div
        v-if="recommended && full"
        class="rounded-full bg-primary-foreground px-2 py-1 text-sm text-primary font-500"
      >
        Recommended
      </div>
      <div v-if="!full" class="flex items-end gap-1">
        <div class="text-lg font-600">
          <ContentSlot :use="$slots.price" unwrap="p" />
        </div>
        <div class="text-base font-500" :class="[!recommended ? 'text-secondary' : 'text-primary-foreground']">
          <ContentSlot :use="$slots.subprice" unwrap="p" />
        </div>
      </div>
    </div>
    <div v-if="full" class="flex items-end gap-3">
      <div class="text-5xl font-bold">
        <ContentSlot :use="$slots.price" unwrap="p" />
      </div>
      <div class="text-base font-bold" :class="[!recommended ? 'text-secondary' : 'text-primary-foreground']">
        <ContentSlot :use="$slots.subprice" unwrap="p" />
      </div>
    </div>
    <div v-if="full" class="text-pretty text-sm leading-snug">
      <ContentSlot :use="$slots.subtitle" unwrap="p" />
    </div>
    <div class="flex flex-col gap-2" :class="[full ? '' : 'max-h-46px of-hidden']">
      <ContentSlot :use="$slots.cta" unwrap="p" />
    </div>
  </div>
</template>
