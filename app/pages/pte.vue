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
          <span class="text-white font-bold text-sm">{{ selectedVideo.originalSize }} {{ selectedVideo.originalUnit }}</span>
        </div>
        <div class="text-white/50">
          |
        </div>
        <div class="flex gap-1">
          <span class="text-white/80 text-sm font-medium">Encoding Settings</span>
          <span class="text-white font-medium text-sm">{{ selectedVideo.resolution }} {{ selectedVideo.codec }}</span>
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
          <span class="text-white font-medium text-sm">{{ selectedVideo.resolution }} {{ selectedVideo.codec }}</span>
        </div>
      </div>
    </template>

    <template #list-item="{ video }">
      <div class="relative z-20 p-3 flex flex-col w-full">
        <div class="flex items-center gap-4 mb-1.5 ">
          <span class="text-white text-xl font-extrabold leading-none">{{ video.resolution }}</span>

          <div class="flex items-center gap-1">
            <span class="text-white text-xl font-bold leading-none">{{ video.originalSize }}</span>
            <span class="text-gray-300 text-base font-semibold leading-none">{{ video.originalUnit }}</span>
            <span class="text-orange-400 text-xl font-bold leading-none mx-1">&gt;</span>
            <span class="text-orange-400 text-xl font-extrabold leading-none">{{ video.optimizedSize }}</span>
            <span class="text-orange-300 text-base font-semibold leading-none">{{ video.optimizedUnit }}</span>
          </div>
        </div>
        <div class="flex items-center gap-1 text-xs text-gray-300 font-medium">
          <span>{{ video.dimensions }}</span>
          <span>|</span>
          <span>{{ video.duration }}</span>
          <span>|</span>
          <span>{{ 'MP4' }}</span>
          <span>|</span>
          <span>{{ video.codec }}</span>
          <span>|</span>
          <span>{{ video.fps }}</span>
        </div>
      </div>
    </template>
  </PlayMain>
</template>
