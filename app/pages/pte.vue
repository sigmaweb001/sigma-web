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

const demoVideos = [
  {
    id: 1,
    title: 'Big Buck Bunny',
    resolution: '1080p',
    originalSize: '600',
    originalUnit: 'MB',
    optimizedSize: '200',
    optimizedUnit: 'MB',
    dimensions: '1920 x 1080',
    duration: '09:56',
    format: 'MP4',
    codec: 'H.264',
    fps: '30 FPS',
    thumbnail: 'https://pte-cdn.sigma.video/bbb30/thumb.jpg',
    originalSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    optimizedSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 2,
    title: 'Sintel',
    resolution: '2K',
    originalSize: '1.1',
    originalUnit: 'GB',
    optimizedSize: '300',
    optimizedUnit: 'MB',
    dimensions: '1920 x 816',
    duration: '14:48',
    format: 'MP4',
    codec: 'H.264',
    fps: '24 FPS',
    thumbnail: 'https://durian.blender.org/wp-content/uploads/2010/05/sintel_poster.jpg',
    originalSrc: 'https://media.xiph.org/sintel/sintel-2048-surround.mp4',
    optimizedSrc: 'https://media.xiph.org/sintel/sintel-1024-surround.mp4',
  },
  {
    id: 3,
    title: 'Tears of Steel',
    resolution: '4K',
    originalSize: '6.3',
    originalUnit: 'GB',
    optimizedSize: '1.5',
    optimizedUnit: 'GB',
    dimensions: '3840 x 1634',
    duration: '12:14',
    format: 'MP4',
    codec: 'H.264',
    fps: '24 FPS',
    thumbnail: 'https://mango.blender.org/wp-content/themes/mango/images/project/tears_of_steel_poster.jpg',
    originalSrc: 'https://mango.blender.org/wp-content/content/download.php?file=tearsofsteel_4k.mov',
    optimizedSrc: 'https://mango.blender.org/wp-content/content/download.php?file=tearsofsteel_720p.mov',
  },
  {
    id: 4,
    title: 'Elephants Dream',
    resolution: 'HD',
    originalSize: '815',
    originalUnit: 'MB',
    optimizedSize: '284',
    optimizedUnit: 'MB',
    dimensions: '1920 x 1080',
    duration: '10:53',
    format: 'MP4',
    codec: 'H.264',
    fps: '24 FPS',
    thumbnail: 'https://orange.blender.org/wp-content/themes/orange/images/common/ed_head.jpg',
    originalSrc: 'https://download.blender.org/durian/movies/elephants-dream-1080p.mp4',
    optimizedSrc: 'https://download.blender.org/durian/movies/elephants-dream-720p.mp4',
  },
  {
    id: 5,
    title: 'Sintel (HD)',
    resolution: 'HD',
    originalSize: '815',
    originalUnit: 'MB',
    optimizedSize: '284',
    optimizedUnit: 'MB',
    dimensions: '1280 x 544',
    duration: '14:48',
    format: 'MP4',
    codec: 'H.264',
    fps: '24 FPS',
    thumbnail: 'https://durian.blender.org/wp-content/uploads/2010/05/sintel_poster.jpg',
    originalSrc: 'https://media.xiph.org/sintel/sintel-2048-surround.mp4',
    optimizedSrc: 'https://media.xiph.org/sintel/sintel-1024-surround.mp4',
  },
]

const selectedVideoId = ref(1)

const selectedVideo = computed(() => {
  return demoVideos.find(video => video.id === selectedVideoId.value) || demoVideos[0]
})

const originalSize = ref(Math.floor(Math.random() * 1000))
const optimizedSize = ref(Math.floor(Math.random() * 1000))
</script>

<template>
  <PlayMain
    v-model:selected-video-id="selectedVideoId"
    :demo-videos="demoVideos"
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
