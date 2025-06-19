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
]
const selectedVideoId = ref(1)

const selectedVideo = computed(() => {
  return demoVideos.find(video => video.id === selectedVideoId.value) || demoVideos[0]
})
</script>

<template>
  <PlayMain
    v-model:selected-video-id="selectedVideoId"
    :demo-videos="demoVideos"
    :uploading="{
      title: 'AI Censorship',
      subtitle: 'Đang tải video lên hệ thống với model là [model-name]',
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
          <span class="text-white font-medium text-sm">1080P H.264</span>
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
          <span class="text-white font-medium text-sm">1080P H.264</span>
        </div>
      </div>
    </template>
  </PlayMain>
</template>
