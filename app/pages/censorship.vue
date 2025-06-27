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
const model = await $fetch('/api/sigma-demo/vod-demo/models', {
  baseURL: domain,
})

videoSamples.value = (data as any[]).map((item: any) => ({
  ...item,
  id: item.name,
}))

const pageParams = useUrlSearchParams('history')
const selectedVideo = ref({ ...videoSamples.value[0] })

const isEn = computed(() => {
  return pageParams.lang === 'en'
})

const modelName = model?.[0]?.modelName
const icon = model?.[0]?.data?.[0].icon
const { startDownload } = useDownloadVideo()
function createItems(video: any) {
  const items = [
    {
      label: isEn.value ? 'Download original video' : 'Tải video gốc',
      icon: 'i-heroicons-arrow-down-tray-20-solid',
      onSelect() {
        startDownload(video.originalSrc, 'original-' + video.name + '.mp4', isEn.value)
      },
    },
    {
      label: isEn.value ? 'Download demo video' : 'Tải video demo',
      icon: 'i-heroicons:inbox-arrow-down',
      onSelect() {
        startDownload(video.optimizedSrc, 'optimized-' + video.name + '.mp4', isEn.value)
      },
    },
  ]

  return items
}
</script>

<template>
  <PlayMain
    v-model:selected-video="selectedVideo"
    :demo-videos="videoSamples"
    mode="censorship"
    :uploading="{
      title: isEn ? 'AI Censorship' : 'AI Censorship',
      subtitle: isEn ? `Uploading video to system with model ${modelName}` : `Đang tải video lên hệ thống với model là ${modelName}`,
    }"
    :processing="{
      title: isEn ? `Sigma AI Censorship system started processing with model ${modelName}` : `Hệ thống Sigma AI Censorship bắt đầu xử lý với model là ${modelName}`,
      successTitle: isEn ? 'Sigma AI Censorship system has completed video processing!' : 'Hệ thống Sigma AI Censorship đã hoàn tất xử lý video!',
    }"
    :icon
  >
    <template #stats>
      <!-- Standard Static Stats -->
      <div class="backdrop-blur-md bg-gray-800/60 rounded-full px-4 py-2 flex items-center gap-3 min-w-max">
        <div class="flex gap-1">
          <span class="text-white/80 text-sm font-medium">{{ isEn ? 'Original Video' : 'Original Video' }}</span>
        </div>
        <div class="text-white/50">
          |
        </div>
        <div class="flex gap-1">
          <span class="text-white/80 text-sm font-medium">{{ isEn ? 'Encoding Settings' : 'Encoding Settings' }}</span>
          <span class="text-white font-medium text-sm">{{ selectedVideo.resolution }} {{ selectedVideo.codec }}</span>
        </div>
      </div>

      <!-- Sigma PTE Stats -->
      <div class="backdrop-blur-md bg-gray-800/60 rounded-full px-4 py-2 flex items-center gap-3 min-w-max">
        <div class="flex gap-1 items-center">
          <span class="text-white font-bold text-sm">{{ isEn ? 'Sigma Censorship' : 'Sigma Censorship' }}</span>
          <UAvatar
            v-if="icon"
            class="ml-1.5"
            size="sm"
            :src="icon"
          />
        </div>
        <div class="text-white/50">
          |
        </div>
        <div class="flex gap-1">
          <span class="text-white/80 text-sm font-medium">{{ isEn ? 'Encoding Settings' : 'Encoding Settings' }}</span>
          <span class="text-white font-medium text-sm">{{ selectedVideo.resolution }} {{ selectedVideo.codec }}</span>
        </div>
      </div>
    </template>

    <template #list-item="{ video }">
      <div class="relative z-20 p-3 flex flex-col w-full">
        <div class="flex items-center gap-4 mb-1.5 ">
          <span class="text-white text-xl font-extrabold leading-none">{{ modelName }}</span>
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
      <UDropdownMenu
        :items="createItems(video)"
        :content="{
          align: 'end',
        }"
      >
        <div class="absolute top-2 right-2 z-20">
          <UButton
            color="neutral"
            variant="solid"
            size="md"
            class="item-action backdrop-blur-lg bg-white/80 text-gray-800 border-0 hover:bg-white/90 transition-colors duration-200 rounded-full"
          >
            {{ isEn ? 'Download' : 'Download' }}
            <Icon
              name="i-heroicons-chevron-down-20-solid"
              class="size-5 text-gray-800"
            />
          </UButton>
        </div>
      </UDropdownMenu>
    </template>
  </PlayMain>
</template>
