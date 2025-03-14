<script lang="ts" setup>
defineProps<{
  left?: boolean
}>()
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
  </section>
  <div class="relative my-10 gap-[24px] container">
    <SCarousel
      class="relative w-full"
      :opts="{ align: 'start' }"
    >
      <SCarouselContent>
        <slot
          name="default"
          mdc-unwrap="p"
        />
      </SCarouselContent>
      <SCarouselPrevious />
      <SCarouselNext />
    </SCarousel>
  </div>
</template>
