<script lang="ts" setup>
definePageMeta({
  layout: 'empty',
})

useSeoMeta({
  title: 'Per-Title Encoding Demo - Sigma Video',
  ogTitle: 'Per-Title Encoding Demo - Sigma Video',
  description: 'Experience Sigma Per-title Encoding technology that reduces video file sizes by up to 86% while maintaining quality. Upload your own video to see the optimization in action.',
  ogDescription: 'Experience Sigma Per-title Encoding technology that reduces video file sizes by up to 86% while maintaining quality. Upload your own video to see the optimization in action.',
  ogImage: '/images/pte-demo-preview.jpg',
  twitterCard: 'summary_large_image',
  twitterImage: '/images/pte-demo-preview.jpg',
  twitterTitle: 'Per-Title Encoding Demo - Sigma Video',
  twitterDescription: 'Experience Sigma Per-title Encoding - reduce video sizes by 86% while maintaining quality.',
  keywords: 'per-title encoding, video optimization, video compression, sigma video, PTE, video encoding, file size reduction',
  robots: 'index, follow',
  ogType: 'website',
  ogLocale: 'vi_VN',
})

const domain = 'https://dev-streaming.gviet.vn:8783'
const videoSamples = ref([])

const data = await $fetch('/api/sigma-demo/vod-demo/video-samples', {
  baseURL: domain,
  params: {
    mode: 'pte',
  },
})
videoSamples.value = data.map((item: any) => ({
  ...item,
  id: item.name,
}))

const selectedVideoId = ref('Big Buck Bunny')
const selectedVideo = computed(() => {
  return videoSamples.value.find(video => video.id === selectedVideoId.value) || videoSamples.value[0]
})

const originalSize = ref(Math.floor(Math.random() * 1000))
const optimizedSize = ref(Math.floor(Math.random() * 1000))
</script>

<template>
  <PlayMain
    v-model:selected-video-id="selectedVideoId"
    :demo-videos="videoSamples"
    :uploading="{
      title: 'Uploading Video',
      subtitle: 'Đang tải video lên hệ thống',
    }"
    :processing="{
      title: 'Hệ thống Sigma AI Per-title Encoding bắt đầu xử lý',
      successTitle: 'Hệ thống Sigma AI Per-title Encoding đã hoàn tất xử lý video!',
    }"
    :original-size="originalSize"
    :optimized-size="optimizedSize"
  >
    <template #stats>
      <!-- Standard Static Stats -->
      <div class="backdrop-blur-md bg-gray-800/60 rounded-full px-4 py-2 flex items-center gap-3 min-w-max">
        <div class="flex gap-1">
          <span class="text-white/80 text-sm font-medium">Standard Static</span>
          <span class="text-white font-bold text-sm">6.8 GB</span>
        </div>
        <div class="text-white/50">
          |
        </div>
        <div class="flex gap-1">
          <span class="text-white/80 text-sm font-medium">Encoding Settings</span>
          <span class="text-white font-medium text-sm">1080P H.264</span>
        </div>
      </div>

      <!-- Sigma PTE Stats -->
      <div class="backdrop-blur-md bg-gray-800/60 rounded-full px-4 py-2 flex items-center gap-3 min-w-max">
        <div class="flex gap-1">
          <span class="text-white font-bold text-sm">Sigma Per-title Encoding</span>
          <span class="text-orange-400 font-bold text-sm">{{ selectedVideo.optimizedSize }} {{ selectedVideo.optimizedUnit }}</span>
        </div>
        <div class="text-white/50">
          |
        </div>
        <div class="flex gap-1">
          <span class="text-white/80 text-sm font-medium">Encoding Settings</span>
          <span class="text-white font-medium text-sm">1080P H.264</span>
        </div>
      </div>
    </template>
  </PlayMain>
</template>
