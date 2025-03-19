<script lang="ts" setup>
const props = defineProps<{
  left?: boolean
}>()

const { left } = toRefs(props)
</script>

<template>
  <SectionTitle
    v-if="$slots.title || $slots.subtitle"
    :left="left"
  >
    <template #title>
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </template>
    <template #subtitle>
      <slot
        name="subtitle"
        mdc-unwrap="p"
      />
    </template>
  </SectionTitle>
  <UPageSection
    :ui="{
      container: 'py-4! gap-4 sm:gap-y-4',
      root: left ? 'text-left': '',
    }"
  >
    <UPageMarquee :pause-on-hover="true">
      <slot
        name="default"
        mdc-unwrap="p"
      />
    </UPageMarquee>
  </UPageSection>
</template>
