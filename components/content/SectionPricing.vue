<script lang="ts" setup>
const { left, col } = definePropsRefs<{
  left?: boolean
  col?: number
  gap?: number
  padding?: number
}>()
</script>

<template>
  <section>
    <div :style="{ '--col': col ?? 4, '--gap': gap ? gap + 'px' : '24px', '--padding': padding ? padding + 'px' : '0px' }"
      class="grid xl:grid-cols-[repeat(var(--col),minmax(0,1fr))] gap-[var(--gap)] p-[var(--padding)]">

      <div class=""
        :class="`container flex w-full flex-col mt-10 ${left ? '' : 'items-center justify-center text-center'}`">

        <h2
          class="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight dark:text-white">
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h2>
        <div class="py-2 text-start text-base prose prose-trueGray dark:prose-invert lg:text-base xl:text-base">
          <ContentSlot :use="$slots.subtitle" unwrap="p" />
        </div>
      </div>
      <div :style="{
        '--col': (col ?? 4) - 1,
        '--gap': gap ? gap + 'px' : '32px',
        '--padding': padding ? padding + 'px' : '0px',
        '--span': (col ?? 4) - 1
      }"
        class="grid col-span-[var(--span)] grid-cols-[repeat(var(--col),minmax(0,1fr))] gap-[var(--gap)] p-[var(--padding)]">
        <ContentSlot :use="$slots.default" unwrap="p" />
      </div>
    </div>
  </section>
</template>
