<script lang="ts" setup>
definePageMeta({
  layout: 'empty',
})

useSeoMeta({
  title: 'Video Censorship Tool - Sigma Video',
  ogTitle: 'Video Censorship Tool - Sigma Video',
  description: 'Try Sigma Video Censorship: blur, mask, or remove sensitive content from your videos easily and securely. Upload your video to experience automated and manual censorship features.',
  ogDescription: 'Try Sigma Video Censorship: blur, mask, or remove sensitive content from your videos easily and securely. Upload your video to experience automated and manual censorship features.',
  ogImage: '/images/censorship-preview.jpg',
  twitterCard: 'summary_large_image',
  twitterImage: '/images/censorship-preview.jpg',
  twitterTitle: 'Video Censorship Tool - Sigma Video',
  twitterDescription: 'Try Sigma Video Censorship: blur, mask, or remove sensitive content from your videos easily and securely.',
  keywords: 'video censorship, blur video, mask video, remove sensitive content, sigma video, censorship tool, video editing',
  robots: 'index, follow',
  ogType: 'website',
  ogLocale: 'vi_VN',
})

const domain = 'https://dev-streaming.gviet.vn:8783'
const videoSamples = ref([])
const data = await $fetch('/api/sigma-demo/vod-demo/video-samples', {
  baseURL: domain,
  params: {
    mode: 'censorship',
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
</script>

<template>
  <PlayMain
    v-model:selected-video-id="selectedVideoId"
    :demo-videos="videoSamples"
    :uploading="{
      title: 'AI Censorship',
      subtitle: 'Đang tải video lên hệ thống với model là [model-name]',
    }"
    :processing="{
      title: 'Hệ thống Sigma AI Censorship bắt đầu xử lý với model là [model-name]',
      successTitle: 'Hệ thống Sigma AI Censorship đã hoàn tất xử lý video!',
    }"
  >
    <template #stats>
      <!-- Standard Static Stats -->
      <div class="backdrop-blur-md bg-gray-800/60 rounded-full px-4 py-2 flex items-center gap-3 min-w-max">
        <div class="flex gap-1">
          <span class="text-white/80 text-sm font-medium">Original Video</span>
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
          <span class="text-white font-bold text-sm">Sigma Censorship</span>
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
  </PlayMain>
</template>
