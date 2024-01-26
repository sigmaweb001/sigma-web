<script lang="ts" setup>
const { span } = definePropsRefs<{
  span?: number
  noBg?: boolean
}>()

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <DefineTemplate>
    <div
      :style="{ '--span': span ?? 1 }"
      class="custom-svg bg-transparent[&>em]:font-bold col-span-[var(--span)] px-2 py-1.5 text-pretty text-base has-[em]:my-1 not-first:(flex-center) first:(justify-self-start pl-4 font-500)"
      :class="[
        noBg ? '' : 'not-first:(bg-gray-100 dark:bg-trueGray-600)',
        $slots.tooltip ? 'cursor-pointer' : '',
      ]"
    >
      <ContentSlot :use="$slots.default" unwrap="p" />
      <div v-if="$slots.description">
        <ContentSlot :use="$slots.description" unwrap="p" />
      </div>
    </div>
  </DefineTemplate>
  <STooltip v-if="$slots.tooltip">
    <STooltipTrigger as-child>
      <ReuseTemplate />
    </STooltipTrigger>
    <STooltipContent class="max-w-240px border-primary bg-primary-50/90" side="right">
      <div>
        <ContentSlot :use="$slots.tooltip" unwrap="p" />
      </div>
      <STooltipArrow class="fill-primary/90" />
    </STooltipContent>
  </STooltip>
  <ReuseTemplate v-else />
</template>

<style>
.custom-svg svg {
  @apply h-5 w-5 text-gray-400 dark:text-gray-400 mx-2;
}

.custom-svg svg[check='true'] {
  @apply text-primary;
}
</style>
