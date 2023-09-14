<script lang="ts" setup>

const customers = [
  {
    title: 'We’re inspired by our customers’s ideas and are fun to work with',
    icon: 'i-ri:customer-service-2-line'
  },
  {
    title: 'Our video cloud platform is designed for unlimited scale',
    icon: 'i-ri:cloud-line'
  },
  {
    title: 'We have the broadest video technology stack: Real-time, Live, VOD',
    icon: 'i-ri:movie-2-line'
  },
  {
    title: 'Our accessible products drive engagement and interactivity for all',
    icon: 'i-ri:star-smile-line'
  },
  {
    title: 'We build everything on our video APIs, and many tech companies use them too',
    icon: 'i-ri:broadcast-line'
  },
  {
    title: 'Our products are loved by customers and easy to use',
    icon: 'i-ri:heart-2-line'
  }
]
</script>

<template>
  <div class="container bg-gray-200 dark:bg-trueGray-800 rounded-lg py-10">
    <div class="grid grid-cols-2 gap-5">
      <div class="flex gap-4 items-center p-5" v-for="(item, i) in customers" :key="i">
        <div class="rounded-full bg-gray-100 dark:bg-trueGray-700 text-primary h-60px w-60px flex-shrink-0 flex-center">
          <i :class="item.icon" class="text-24px text-primary" />

        </div>
        <p class="mt-1 text-gray-600 dark:text-gray-400 text-balance text-base">
          {{ item.title }}
        </p>
      </div>
    </div>
  </div>
</template>
