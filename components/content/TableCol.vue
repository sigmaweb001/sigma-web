<script lang="ts" setup>
const { span } = definePropsRefs<{
  span?: number
  noBg?: boolean
}>()
</script>

<template>
  <STooltip v-if="$slots.tooltip">
    <STooltipTrigger as-child>
      <div
        :style="{ '--span': span ?? 1 }"
        class="custom-svg bg-transparent[&>em]:font-bold col-span-[var(--span)] cursor-pointer px-2 py-1.5 text-center text-pretty text-base has-[em]:my-1 not-first:(flex-center) first:(justify-self-start pl-4 font-500)"
        :class="[
          noBg ? '' : 'not-first:(bg-gray-100 dark:bg-trueGray-600)',
          $slots.tooltip ? '' : '',
        ]"
      >
        <ContentSlot :use="$slots.default" unwrap="p" />
      </div>
    </STooltipTrigger>
    <STooltipContent class="max-w-240px border-primary bg-primary-50/90" side="right">
      <div>
        <ContentSlot :use="$slots.tooltip" unwrap="p" />
      </div>
      <STooltipArrow class="fill-primary/90" />
    </STooltipContent>
  </STooltip>
  <div
    v-else :style="{ '--span': span ?? 1 }"
    class="custom-svg bg-transparent[&>em]:font-bold col-span-[var(--span)] px-2 py-1.5 text-center text-pretty text-base has-[em]:my-1 not-first:(flex-center) first:(justify-self-start pl-4 font-500)"
    :class="[
      noBg ? '' : 'not-first:(bg-gray-100 dark:bg-trueGray-600)',
    ]"
  >
    <ContentSlot :use="$slots.default" unwrap="p" />
  </div>
</template>

<style>
.custom-svg svg {
  @apply h-5 w-5 text-gray-400 dark:text-gray-400 mx-2;
}

.custom-svg svg[check='true'] {
  @apply text-primary;
}
</style>
