<script lang="ts" setup>
definePropsRefs<{
  left?: boolean
}>()

const spaceBetween = 24
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

    <!-- <swiper-container
      class="swiper-config px-20" :slides-per-view="4" :space-between="spaceBetween"
      :breakpoints="{
        768: {
          slidesPerView: 4,
        },
      }" :free-mode="true" :loop="true"
    >
    </swiper-container>
    <SButton
      variant="outline"
      class="z absolute left-16px top-1/2 flex-center translate-y--1/2 !h-40px !w-40px !rounded-full !p-0" @click="next"
    >
      <div class="i-ri:arrow-left-s-line text-24px" />
    </SButton>
    <SButton
      variant="outline"
      class="absolute right-16px top-1/2 flex-center translate-y--1/2 !h-40px !w-40px !rounded-full !p-0" @click="prev();"
    >
      <div class="i-ri:arrow-right-s-line text-24px" />
    </SButton> -->
  </div>
</template>
