<script lang="ts" setup>
defineProps<{
  left?: boolean
  items: string[]
}>()
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
    <UCarousel
      v-slot="{ item }"
      loop
      arrows
      :autoplay="{ delay: 2000 }"
      :items="items"
      :ui="{
        container: 'items-stretch',
        item: 'lg:basis-1/4 md:basis-1/3 pb-[1px] flex',
      }"
    >
      <ResourceItem :path="item" />
    </UCarousel>
  </UPageSection>
</template>
