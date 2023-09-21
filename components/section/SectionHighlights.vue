<script lang="ts" setup>
const data = [
  {
    title: 'Secure Video Hosting',
    desc: 'Secure video hosting with an all-in-one streaming platform.',
    icon: 'i-ri:shield-user-line',
  },
  {
    title: 'Stream Live Events',
    desc: 'Reliable, flawless live event streaming with top-tier CDNs.',
    icon: 'i-ri:live-line',
  },
  {
    title: 'VOD | OTT Platform',
    desc: 'Integrate live video & VODS with our APIs with no difficulty.',
    icon: 'i-ri:movie-2-line',
  },
  {
    title: 'Integrated Interactive TV',
    desc: 'Boost your revenue by monetizing video with us.',
    icon: 'i-ri:star-smile-line',
  },
  {
    title: 'Low Latency Streaming',
    desc: 'Livestream with low latency, optimal experience.',
    icon: 'i-ri:time-line',
  },
  {
    title: '24/7 Customer Support',
    desc: 'Connect with our support starting when become our partner.',
    icon: 'i-ri:customer-service-2-line',
  },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-24px container">
    <div v-for="(item, i) in data" :key="i" class="grid justify-items-center rounded-2xl bg-gray-100 p-6 px-10 py-10 text-center dark:bg-trueGray-800">
      <div class="h-60px w-60px flex-center border border-primary-300/50 rounded-lg p-2">
        <i :class="item.icon" class="text-24px text-primary" />
      </div>
      <h4 class="mt-4 text-xl font-medium text-gray-800 dark:text-gray-200">
        {{ item.title }}
      </h4>
      <p class="mt-1 text-balance text-sm text-gray-500 dark:text-gray-400">
        {{ item.desc }}
      </p>
    </div>
  </div>
</template>
