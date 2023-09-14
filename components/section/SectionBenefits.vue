<script lang="ts" setup>
const { data } = definePropsRefs<{
  data: {
    image: string
    title: string
    desc: string
    bullets: { title: string; icon: string; desc: string }[]
  }
  imgPos?: 'right'
}>()
</script>

<template>
  <div class="mb-20 mt-10 flex flex-wrap container lg:flex-nowrap lg:gap-10">
    <div class="w-full flex items-center justify-center lg:w-1/2" :class="{ 'lg:order-1': imgPos === 'right' }">
      <div>
        <img :src="data.image" width="521" height="482" alt="Benefits" layout="intrinsic" placeholder="blur">
      </div>
    </div>

    <div class="w-full flex flex-wrap items-center lg:w-1/2" :class="{ 'lg:justify-end': imgPos === 'right' }">
      <div>
        <div v-if="data.title || data.desc" class="mt-4 w-full flex flex-col">
          <h3
            class="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight dark:text-white"
          >
            {{ data.title }}
          </h3>

          <p class="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
            {{ data.desc }}
          </p>
        </div>

        <div class="mt-5 w-full">
          <Benefit v-for="(item, index) in data.bullets" :key="index" :title="item.title" :icon="item.icon">
            {{ item.desc }}
          </Benefit>
        </div>
      </div>
    </div>
  </div>
</template>
