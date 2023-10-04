<script lang="ts" setup>
import { register } from 'swiper/element/bundle'

register()

const { data } = definePropsRefs<{
  data: {
    items: {
      icon: any
      image: any
      description: string
      title: string
    }[]
  }
}>()

const swiperRef = ref()

const spaceBetween = 24

function next() {
  swiperRef.value.swiper.slideNext()
}

function prev() {
  swiperRef.value.swiper.slidePrev()
}
</script>

<template>
  <div class="my-10 gap-24px container">
    <swiper-container
      ref="swiperRef" class="swiper-config" :slides-per-view="3" :space-between="spaceBetween"
      :centered-slides="true" :breakpoints="{
        768: {
          slidesPerView: 3,
        },
      }" :free-mode="true" :loop="true"
    >
      <swiper-slide v-for="(item, i) in data.items" :key="i">
        <ResourceItem class="h-full" :item="item" />
      </swiper-slide>
      <swiper-slide v-for="(item, i) in data.items" :key="i">
        <ResourceItem class="h-full" :item="item" />
      </swiper-slide>
    </swiper-container>
  </div>
  <div class="grid mx-auto container">
    <div class="flex gap-24px">
      <SButton variant="outline" class="flex-center rounded-full !h-40px !w-40px !p-0" @click="next">
        <div class="i-ri:arrow-left-s-line text-24px" />
      </SButton>
      <SButton variant="outline" class="flex-center rounded-full !h-40px !w-40px !p-0" @click="prev();">
        <div class="i-ri:arrow-right-s-line text-24px" />
      </SButton>
    </div>
  </div>
</template>

<style>
.swiper-config {
  --swiper-theme-color: hsl(var(--primary));
}
</style>
