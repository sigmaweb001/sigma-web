<script lang="ts" setup>
definePageMeta({
  layout: 'empty',
})

const pageParams = useUrlSearchParams('history')

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

const isUploading = ref(false)
const selectedFile = ref(null)
const showDemoOverlay = computed({
  get: () => pageParams.open === 'true',
  set: (value) => {
    pageParams.open = value.toString()
  },
})
const selectedVideoId = ref(2) // Default to second video (Standard Demo)

const demoVideos = [
  {
    id: 1,
    title: 'Video của bạn',
    resolution: '4K',
    originalSize: '480',
    originalUnit: 'MB',
    optimizedSize: '168',
    optimizedUnit: 'MB',
    dimensions: '3840 x 1714',
    duration: '12:24',
    format: 'MP4',
    codec: 'H.264',
    fps: '24 FPS',
    thumbnail: 'https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg',
  },
  {
    id: 2,
    title: 'Standard Demo',
    resolution: '4K',
    originalSize: '6.8',
    originalUnit: 'GB',
    optimizedSize: '910',
    optimizedUnit: 'MB',
    dimensions: '3840 x 1714',
    duration: '12:24',
    format: 'MP4',
    codec: 'H.264',
    fps: '24 FPS',
    thumbnail: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg',
  },
  {
    id: 3,
    title: '2K Demo',
    resolution: '2K',
    originalSize: '1.1',
    originalUnit: 'GB',
    optimizedSize: '286',
    optimizedUnit: 'MB',
    dimensions: '1920 x 1080',
    duration: '12:24',
    format: 'MP4',
    codec: 'H.264',
    fps: '24 FPS',
    thumbnail: 'https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg',
  },
  {
    id: 4,
    title: 'HD Demo 1',
    resolution: 'HD',
    originalSize: '815',
    originalUnit: 'MB',
    optimizedSize: '284',
    optimizedUnit: 'MB',
    dimensions: '1920 x 818',
    duration: '12:24',
    format: 'MP4',
    codec: 'H.264',
    fps: '24 FPS',
    thumbnail: 'https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg',
  },
  {
    id: 5,
    title: 'HD Demo 2',
    resolution: 'HD',
    originalSize: '815',
    originalUnit: 'MB',
    optimizedSize: '284',
    optimizedUnit: 'MB',
    dimensions: '1920 x 818',
    duration: '12:24',
    format: 'MP4',
    codec: 'H.264',
    fps: '24 FPS',
    thumbnail: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg',
  },
]

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
    // Handle file upload logic here
    console.log('File selected:', target.files[0])
  }
}

const triggerFileUpload = () => {
  const fileInput = document.getElementById('file-upload') as HTMLInputElement
  fileInput?.click()
}

const showDemo = () => {
  showDemoOverlay.value = true
}

const hideDemo = () => {
  showDemoOverlay.value = false
}

const selectVideo = (videoId: number) => {
  selectedVideoId.value = videoId
  hideDemo()
}

const selectedVideo = computed(() => {
  return demoVideos.find(video => video.id === selectedVideoId.value) || demoVideos[1]
})

onMounted(() => {
  // Hide fc_frame elements
  const fcFrameElements = document.querySelectorAll('.fc_frame')
  fcFrameElements.forEach((element) => {
    (element as HTMLElement).style.display = 'none !important'
  })

  // Add horizontal scroll for video demo list
})

const scrollableDiv = ref(null)

whenever(scrollableDiv, () => {
  if (scrollableDiv.value) {
    scrollableDiv.value.$el.addEventListener('wheel', (event) => {
      event.preventDefault()
      if (event.shiftKey) {
        scrollableDiv.value.$el.scrollLeft += event.deltaX
      }
      else {
        scrollableDiv.value.$el.scrollLeft += event.deltaX === 0
          ? event.deltaY
          : Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      }
    })
  }
})

const originalSrc = ref('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
const optimizedSrc = ref('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4')

const playVideoRef = ref(null)
function handlePlay() {
  playVideoRef.value?.play()
}
</script>

<template>
  <div class="h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
    <!-- Main Demo Container -->
    <div class="relative w-full aspect-video group">
      <!-- Video/Thumbnail Section -->
      <div class="relative w-full h-full bg-gray-900 overflow-hidden flex items-center justify-center">
        <!-- Background Image/Video -->
        <div class="absolute inset-0 ">
          <ClientOnly>
            <PlayVideoPte
              ref="playVideoRef"
              :src="originalSrc"
              :optimized-src="optimizedSrc"
            />
          </ClientOnly>
        </div>

        <!-- Top Stats Overlay -->
        <div
          class="absolute top-6 left-6 right-6 flex justify-between items-start z-10 transition-opacity duration-300"
        >
          <!-- Standard Static Stats -->
          <div class="backdrop-blur-md bg-gray-700/50 rounded-full px-4 py-2 flex items-center gap-3">
            <div class="flex flex-col">
              <span class="text-white/80 text-sm font-medium">Standard Static</span>
              <span class="text-white font-bold text-sm">6.8 GB</span>
            </div>
            <div class="text-white/50">
              |
            </div>
            <div class="flex flex-col">
              <span class="text-white/80 text-sm font-medium">Encoding Settings</span>
              <span class="text-white font-medium text-sm">1080P H.264</span>
            </div>
          </div>

          <!-- Sigma PTE Stats -->
          <div class="backdrop-blur-md bg-gray-700/50 rounded-full px-4 py-2 flex items-center gap-3">
            <div class="flex flex-col">
              <span class="text-white font-bold text-sm">Sigma Per-title Encoding</span>
              <span class="text-orange-400 font-bold text-sm">{{ selectedVideo.optimizedSize }} {{
                selectedVideo.optimizedUnit }}</span>
            </div>
            <div class="text-white/50">
              |
            </div>
            <div class="flex flex-col">
              <span class="text-white/80 text-sm font-medium">Encoding Settings</span>
              <span class="text-white font-medium text-sm">1080P H.264</span>
            </div>
          </div>
        </div>

        <div class="absolute bottom-0 left-0 right-0 px-6 py-5 opacity-0 bg-gradient-to-t from-gray-900/80 to-transparent  pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto">
          <div class="flex items-end gap-4">
            <!-- View More Demo Button -->
            <UButton
              v-if="!showDemoOverlay"
              color="neutral"
              variant="solid"
              size="xl"
              class="backdrop-blur-lg bg-white/80 text-gray-800 border-0 hover:bg-white/90 transition-colors duration-200 rounded-full"
              @click="showDemo"
            >
              <Icon
                name="i-heroicons-rectangle-group-20-solid"
                class="size-5 text-gray-800"
              />
              Xem thêm demo
            </UButton>

            <!-- Right Side Content -->
            <div class="flex-1 text-right">
              <h3 class="text-white font-bold text-sm mb-1">
                Trải nghiệm thử với video của bạn
              </h3>
              <p class="text-white/60 text-xs">
                Dung lượng tối đa 500 Mb
              </p>
            </div>

            <!-- Upload Button -->
            <UButton
              color="warning"
              size="xl"
              :loading="isUploading"
              class="font-bold rounded-full"
              @click="triggerFileUpload"
            >
              <Icon
                name="i-heroicons-arrow-up-tray-20-solid"
                class="size-5"
              />
              Upload video
            </UButton>
          </div>
        </div>
      </div>

      <!-- Demo Overlay -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 scale-105"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="showDemoOverlay"
          class="absolute inset-0 z-[9999] bg-black/10 backdrop-blur-xs"
        >
          <!-- Overlay Background -->
          <div class="absolute inset-0 overflow-hidden flex flex-col">
            <!-- Demo Videos Content -->
            <div class="relative z-11 flex-1 flex flex-col justify-end p-6">
              <!-- Demo Videos Grid/Scroll -->
              <div class="mb-6">
                <div class="backdrop-blur-md bg-black/20 rounded-2xl py-2">
                  <TransitionGroup
                    id="video-demo-list"
                    ref="scrollableDiv"
                    name="video-list"
                    tag="div"
                    class="flex gap-1 overflow-x-auto overflow-y-hidden scrollbar-hide"
                    appear
                  >
                    <div
                      v-for="(video, index) in demoVideos"
                      :key="video.id"
                      class="flex-shrink-0 w-82 rounded-2xl shadow-xl border border-black/10 cursor-pointer transition-all duration-300 scale-95 hover:scale-99 overflow-hidden relative video-card bg-gray-900/80 backdrop-blur-lg select-none"
                      :class="{
                        'ring-2 ring-white': video.id === selectedVideoId,
                        'border-gray-700/50': video.id !== selectedVideoId,
                      }"
                      :style="{ 'animation-delay': `${index * 100}ms` }"
                      @click="selectVideo(video.id)"
                    >
                      <!-- Video Thumbnail -->
                      <div class="aspect-video relative flex items-end justify-stretch">
                        <img
                          :src="video.thumbnail"
                          class="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105"
                          alt="video thumbnail"
                        >
                        <div class="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/80 z-10" />
                        <div class="relative z-20 p-5 flex flex-col w-full">
                          <div class="flex items-center gap-3 mb-1">
                            <span class="text-white text-2xl font-extrabold leading-none">{{ video.resolution }}</span>
                            <span class="text-white text-2xl font-bold leading-none">{{ video.originalSize }}</span>
                            <span class="text-gray-300 text-lg font-semibold leading-none">{{ video.originalUnit }}</span>
                            <span class="text-orange-400 text-2xl font-bold leading-none mx-1">&gt;</span>
                            <span class="text-orange-400 text-2xl font-extrabold leading-none">{{ video.optimizedSize }}</span>
                            <span class="text-orange-300 text-lg font-semibold leading-none">{{ video.optimizedUnit }}</span>
                          </div>
                          <div class="flex items-center gap-2 text-xs text-gray-300 font-medium">
                            <span>{{ video.dimensions }}</span>
                            <span>|</span>
                            <span>{{ video.duration }}</span>
                            <span>|</span>
                            <span>{{ video.format }}</span>
                            <span>|</span>
                            <span>{{ video.codec }}</span>
                            <span>|</span>
                            <span>{{ video.fps }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TransitionGroup>
                </div>
              </div>

              <!-- Bottom Controls -->
              <div class="flex items-end gap-4">
                <!-- Close Button -->
                <UButton
                  color="neutral"
                  variant="solid"
                  size="xl"
                  class="backdrop-blur-lg bg-white/80 text-gray-800 border-0 hover:bg-white/90 transition-colors duration-200 rounded-full"
                  @click="hideDemo"
                >
                  <Icon
                    name="i-heroicons-x-mark-20-solid"
                    class="size-5 text-gray-800"
                  />
                  Thu gọn
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Hidden File Input -->
      <input
        id="file-upload"
        type="file"
        accept="video/*"
        class="hidden"
        @change="handleFileUpload"
      >
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Video card animation */
.video-card {
  animation: slideInUp 0.6s ease-out both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* TransitionGroup animations */
.video-list-enter-active {
  transition: all 0.5s ease-out;
}

.video-list-leave-active {
  transition: all 0.3s ease-in;
}

.video-list-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.video-list-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}

.video-list-move {
  transition: transform 0.4s ease;
}
</style>
