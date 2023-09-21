<script lang="ts" setup>
const { data } = definePropsRefs<{
  data: {
    title: string
    desc: string
    items: {
      icon: any
      description: string
      title: string
    }[]
    photos: {
      photo: {
        asset: any
      }
    }
    bgType: 'photo'
    bgPos: 'left' | 'right'
  }
}>()
</script>
<!-- <img :src="data.image" layout="intrinsic" placeholder="blur"> -->

<template>
  <div class="mb-20 mt-10 flex flex-wrap container lg:flex-nowrap lg:gap-10">
    <div class="w-full flex items-center justify-center lg:w-1/2" :class="{ 'lg:order-1': data.bgPos === 'right' }">
      <div v-if="data.photos?.photo" class="relative h-482px w-521px">
        <SNuxtImg :image="data.photos?.photo" alt="Benefits" />
      </div>
    </div>

    <div class="w-full flex flex-wrap items-center lg:w-1/2" :class="{ 'lg:justify-end': data.bgPos === 'right' }">
      <div>
        <div v-if="data.title || data.desc" class="mt-4 w-full flex flex-col">
          <h3
            class="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight dark:text-white"
          >
            {{ data.title }}
          </h3>

          <p v-if="data.desc" class="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
            {{ data.desc }}
          </p>
        </div>

        <div class="mt-5 w-full">
          <Benefit v-for="(item, index) in data.items" :key="index" :title="item.title" :icon="item.icon">
            {{ item.description }}
          </Benefit>
        </div>
      </div>
    </div>
  </div>
</template>
