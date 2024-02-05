<script lang="ts" setup>
const { col, gap } = definePropsRefs<{
  col?: number
  gap?: number
  padding?: number
}>()
const targetRef = ref(null)
const full = ref(true)
const appConfig = useAppConfig()
const { top } = useElementBounding(targetRef)

watch(top, () => {
  const offset = appConfig.banner.enabled ? 104 : 64
  full.value = top.value > offset
})

provide('full', full)

const stop = usePricingStop()
const hPricing = useHeightPricing()
const targetRef2 = ref()
const { height } = useElementBounding(targetRef2)

watchOnce(height, () => {
  if (height.value === 0)
    hPricing.value = 0
  else
    hPricing.value = height.value
})

const keyFeature = useKeyFeature()
</script>

<template>
  <div class="mx-auto container" :class="[full ? '' : 'opacity-0']">
    <div
      ref="targetRef"
      :style="{ '--col': col ?? 4, '--gap': gap ? `${gap}px` : '24px', '--padding': padding ? `${padding}px` : '0px' }"
      class="grid gap-[var(--gap)] p-[var(--padding)] xl:grid-cols-[repeat(var(--col),minmax(0,1fr))]"
    >
      <div lt-xl="container" class="mt-10 w-full flex flex-col">
        <h2
          class="mt-3 max-w-2xl text-3xl text-gray-800 font-bold leading-snug tracking-tight lg:text-4xl dark:text-white lg:leading-tight"
        >
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h2>
        <div
          class="py-2 text-start text-base prose prose-trueGray lg:text-base xl:text-base dark:prose-invert"
        >
          <ContentSlot :use="$slots.subtitle" unwrap="p" />
        </div>
        <div class="grid grid-cols-2 border border-border rounded-16px px-2 py-2">
          <SButton class="px-2.5 rounded-full!" :variant="keyFeature ? 'gradient' : 'ghost'" @click="keyFeature = true">
            Key features
          </SButton>
          <SButton class="px-2.5 rounded-full!" :variant="!keyFeature ? 'gradient' : 'ghost'" @click="keyFeature = false">
            All features
          </SButton>
        </div>
      </div>
      <div
        :style="{
          '--col': (col ?? 4) - 1,
          '--gap': gap ? `${gap}px` : '24px',
          '--padding': padding ? `${padding}px` : '0px',
          '--span': (col ?? 4) - 1,
        }"
        class="grid col-span-[var(--span)] grid-cols-[repeat(var(--col),minmax(0,1fr))] gap-[var(--gap)] p-[var(--padding)]"
      >
        <ContentSlot :use="$slots.default" unwrap="p" />
      </div>
    </div>
  </div>

  <div ref="targetRef2" :class="[full || stop ? 'hidden' : 'block z-100 fixed pt-5 w-full top-0 bg-background']">
    <div class="mx-auto container">
      <div
        :style="{ '--col': col ?? 4, '--gap': gap ? `${gap}px` : '24px', '--padding': padding ? `${padding}px` : '0px' }"
        class="grid gap-[var(--gap)] p-[var(--padding)] xl:grid-cols-[repeat(var(--col),minmax(0,1fr))]"
      >
        <div lt-xl="container" class="mt-10 w-full flex flex-col">
          <h2
            class="mt-3 max-w-2xl text-3xl text-gray-800 font-bold leading-snug tracking-tight lg:text-4xl dark:text-white lg:leading-tight"
          >
            <ContentSlot :use="$slots.title" unwrap="p" />
          </h2>
          <div class="grid grid-cols-2 mt-2 border border-border rounded-16px px-2 py-2">
            <SButton class="px-2.5 rounded-full!" :variant="keyFeature ? 'gradient' : 'ghost'" @click="keyFeature = true">
              Key features
            </SButton>
            <SButton
              class="px-2.5 rounded-full!" :variant="!keyFeature ? 'gradient' : 'ghost'"
              @click="keyFeature = false"
            >
              All features
            </SButton>
          </div>
        </div>
        <div
          :style="{
            '--col': (col ?? 4) - 1,
            '--gap': gap ? `${gap}px` : '24px',
            '--padding': padding ? `${padding}px` : '0px',
            '--span': (col ?? 4) - 1,
          }"
          class="grid col-span-[var(--span)] grid-cols-[repeat(var(--col),minmax(0,1fr))] gap-[var(--gap)] p-[var(--padding)]"
        >
          <ContentSlot :use="$slots.default" unwrap="p" />
        </div>
      </div>
    </div>
  </div>
</template>
