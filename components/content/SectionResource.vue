<script lang="ts" setup>
definePropsRefs<{
  left?: boolean
}>()
</script>

<template>
  <section>
    <SectionTitle v-if="$slots.title || $slots.subtitle" :left="left">
      <template #title>
        <ContentSlot :use="$slots.title" unwrap="p" />
      </template>
      <template #subtitle>
        <ContentSlot :use="$slots.subtitle" unwrap="p" />
      </template>
    </SectionTitle>
  </section>
  <div class="relative my-10 gap-24px container">
    <SCarousel
      class="relative w-full" :opts="{ align: 'start' }"
    >
      <SCarouselContent>
        <ContentSlot :use="$slots.default" unwrap="p" />
      </SCarouselContent>
      <SCarouselPrevious />
      <SCarouselNext />
    </SCarousel>
  </div>
</template>
