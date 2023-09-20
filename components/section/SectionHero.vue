<script lang="ts" setup>
const { item } = definePropsRefs<{
  item: any
}>()
</script>

<template>
  <DevOnly>
    <div class="fixed right-0 top-0 z-100 max-h-1/2 max-w-1/2 of-auto bg-white">
      <details>
        <VueJsonPretty :data="item" />
      </details>
    </div>
  </DevOnly>
  <div class="grid justify-items-center py-20 container" xl="flex flex-wrap">
    <div class="w-full flex items-center" xl="w-1/2">
      <div class="grid mx-auto mb-8 justify-items-center tracking-tight" xl="max-w-2xl justify-items-start">
        <h1
          class="text-4xl font-bold leading-snug tracking-tight text-gray-800" lg="text-5xl leading-tight"
          xl="text-6xl leading-tight" dark="text-white"
        >
          {{ item.title }}
        </h1>
        <p class="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
          {{ item.subtitle }}
        </p>

        <div class="prose-li-sigma prose prose-black">
          <SSanityContent :blocks="item.content" />
        </div>
      </div>
    </div>
    <div class="relative w-full flex items-center justify-center" xl="w-1/2">
      <SNuxtImg
        v-if="item.bgType === 'photo'" :image="item.photos.desktopPhoto" class="relative hidden" lg="block w-1/2"
        xl="w-3/4"
      />
    </div>
  </div>
</template>
