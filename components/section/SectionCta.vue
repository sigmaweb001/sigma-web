<script lang="ts" setup>
const { data } = defineProps<{
  data: {
    title: string
    description: string
    //
    cta: string
    linkType: 'internal' | 'external'
    page: {
      type: 'page'
      slug: string
      isHome: false
    }
    isButton: true
    url: null
    children: any
  }
}>()
</script>

<template>
  <div class="py-10 container">
    <div
      class="relative mx-auto max-w-4xl w-full flex flex-wrap items-center justify-between gap-5 overflow-hidden rounded-xl from-primary-400 to-primary-500 bg-gradient-to-r px-7 py-7 text-white lg:flex-nowrap lg:px-12 lg:py-12"
    >
      <div
        class="absolute bottom-3 left-3 z-1 h-24 w-24 rounded-full bg-white from-white to-primary-600 bg-gradient-to-b opacity-20"
      />
      <div
        class="absolute left-1/2 z-1 h-24 w-24 rounded-full bg-white from-white to-primary-600 bg-gradient-to-b opacity-20 -top-10"
      />
      <div class="relative z-0 flex-grow text-center lg:text-left">
        <h2 class="text-3xl font-medium lg:text-3xl">
          {{ data.title }}
        </h2>
        <p class="mt-2 text-white text-opacity-80 lg:text-xl">
          {{ data.description }}
        </p>
      </div>

      <div class="relative w-full flex-shrink-0 text-center lg:w-auto">
        <template v-if="data.linkType === 'internal'">
          <NuxtLink :to="useLocalePath()(data.page.slug)" class="mx-auto inline-block rounded-md bg-white px-7 py-3 text-center font-medium text-primary-600 lg:px-8 lg:py-3 sm:text-lg focus:outline-none">
            {{ data.cta }}
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>
