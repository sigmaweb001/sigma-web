<script lang="ts" setup>
const { span } = definePropsRefs<{
  span?: number
  noBg?: boolean
}>()
</script>

<template>
  <STooltip>
    <STooltipTrigger as-child>
      <div
        :style="{ '--span': span ?? 1 }"
        class="custom-svg bg-transparent[&>em]:font-bold col-span-[var(--span)] px-2 py-1.5 text-center text-pretty text-base has-[em]:my-1 not-first:(flex-center) first:(justify-self-start pl-4 font-500)"
        :class="[noBg ? '' : 'not-first:(bg-gray-100 dark:bg-trueGray-600)',
                 $slots.tooltip ? 'cursor-pointer' : '',
        ]"
      >
        <ContentSlot :use="$slots.default" unwrap="p" />
      </div>
    </STooltipTrigger>
    <STooltipContent v-if="$slots.tooltip" class="max-w-240px border-primary bg-primary-100" side="right">
      <ContentSlot :use="$slots.tooltip" unwrap="p" />
      <STooltipArrow class="fill-primary/90" />
    </STooltipContent>
  </STooltip>
</template>

<style>
.custom-svg svg {
  @apply h-5 w-5 text-gray-400 dark:text-gray-400 mx-2;
}

.custom-svg svg[check='true'] {
  @apply text-primary;
}
</style>
