<script lang="ts" setup>
const props = defineProps<{
  col?: string
  padding?: string
  gap?: string
  bg?: boolean
  left?: boolean
  title?: string
  description?: string
  gradient?: boolean
}>()

const { col, padding, gap, bg, left, title, description, gradient } = toRefs(props)
</script>

<template>
  <UPageSection
    :ui="{
      container: 'py-4! gap-4 sm:gap-y-4',
    }"
  >
    <img
      v-if="gradient"
      src="/images/gradient-bg.png"
      class="absolute top-0 left-0 w-full h-full object-fill -z-1"
    >
    <SectionTitle
      v-if="$slots.title || $slots.subtitle || title || description"
      :left="left"
    >
      <template #title>
        <slot
          name="title"
          mdc-unwrap="p"
        >
          {{ title }}
        </slot>
      </template>
      <template #subtitle>
        <slot
          name="subtitle"
          mdc-unwrap="p"
        >
          {{ description }}
        </slot>
      </template>
    </SectionTitle>
    <div
      :style="{ '--col': col ?? 2, '--gap': gap ? `${gap}px` : '24px', '--padding': padding ? `${padding}px` : '0px' }"
      class="grid grid-cols-[repeat(var(--col),minmax(0,1fr))] gap-(--gap) p-(--padding)"
      :class="[bg ? 'bg-gray-100 rounded-xl' : '']"
    >
      <slot />
    </div>
  </UPageSection>
</template>
