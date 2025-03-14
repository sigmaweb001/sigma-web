<script lang="ts" setup>
const props = defineProps<{
  left?: boolean
}>()

const { left } = toRefs(props)
</script>

<template>
  <section>
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
    <SAccordion
      type="single"
      class="w-full"
      collapsible
    >
      <slot
        name="default"
        mdc-unwrap="p"
      />
    </SAccordion>
  </section>
</template>
