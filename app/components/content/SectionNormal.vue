<script lang="ts" setup>
const props = defineProps<{
  left?: boolean
}>()

const { left } = toRefs(props)
</script>

<template>
  <UPageSection
    :ui="{
      container: 'py-4! gap-4 sm:gap-y-4',
    }"
  >
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
    <slot
      name="default"
      mdc-unwrap="p"
    />
  </UPageSection>
</template>
