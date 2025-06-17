<script lang="ts" setup>
const pageParams = useUrlSearchParams('history')

const showDemoOverlay = computed({
  get: () => pageParams.open === 'true',
  set: (value) => {
    pageParams.open = value.toString()
  },
})
const selectedVideoId = ref(1) // Default to second video (Standard Demo)

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
  return demoVideos.find(video => video.id === selectedVideoId.value) || demoVideos[0]
})

const originalSrc = computed(() => {
  return selectedVideo.value.originalSrc
})
const optimizedSrc = computed(() => {
  return selectedVideo.value.optimizedSrc
})

const isTallScreen = ref(false)

const updateAspect = () => {
  // 16/9 = 1.777...
  isTallScreen.value = window.innerHeight / window.innerWidth > 9 / 16
}

onMounted(() => {
  updateAspect()
  window.addEventListener('resize', updateAspect)

  // Hide fc_frame elements
  const fcFrameElements = document.querySelectorAll('.fc_frame')
  fcFrameElements.forEach((element) => {
    (element as HTMLElement).style.display = 'none !important'
  })

  // Add horizontal scroll for video demo list
})

onUnmounted(() => {
  window.removeEventListener('resize', updateAspect)
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

const playVideoRef = ref(null)
</script>

<template>
  <div
    class="relative group aspect-video"
    :class="isTallScreen ? 'w-full' : 'h-full'"
  >
    <!-- Video/Thumbnail Section -->
    <div class="relative w-full h-full bg-gray-900 overflow-hidden flex items-center justify-center">
      <!-- Background Image/Video -->
      <div class="absolute inset-0">
        <ClientOnly>
          <PlayVideoPte
            :key="selectedVideoId"
            ref="playVideoRef"
            :src="originalSrc"
            :optimized-src="optimizedSrc"
            :thumbnail="selectedVideo.thumbnail"
          />
        </ClientOnly>
      </div>

      <!-- Top Stats Overlay -->
      <div class="absolute top-6 left-6 right-6 flex justify-between items-start z-10 transition-opacity duration-300 flex-nowrap gap-4 overflow-x-auto scrollbar-hide">
        <!-- Standard Static Stats -->
        <div class="backdrop-blur-md bg-gray-700/50 rounded-full px-4 py-2 flex items-center gap-3 min-w-max">
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
        <div class="backdrop-blur-md bg-gray-700/50 rounded-full px-4 py-2 flex items-center gap-3 min-w-max">
          <div class="flex gap-1">
            <span class="text-white font-bold text-sm">Sigma Per-title Encoding</span>
            <span class="text-orange-400 font-bold text-sm">{{ selectedVideo.optimizedSize }} {{
              selectedVideo.optimizedUnit }}</span>
          </div>
          <div class="text-white/50">
            |
          </div>
          <div class="flex gap-1">
            <span class="text-white/80 text-sm font-medium">Encoding Settings</span>
            <span class="text-white font-medium text-sm">1080P H.264</span>
          </div>
        </div>
      </div>

      <div
        class="absolute bottom-0 left-0 right-0 px-6 py-5 opacity-0 bg-gradient-to-t from-gray-900/80 to-transparent  pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto"
      >
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
              Trải nghiệm video của bạn (Tối đa 1GB)
            </h3>
            <p class="text-white/80 text-xs">
              <a
                href="https://portal.sigma.video/auth/signup"
                class="underline"
                target="_blank"
              >Bạn muốn thử video lớn hơn?</a>
            </p>
          </div>

          <!-- Upload Button -->
          <slot name="upload" />
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
                          <span class="text-orange-400 text-2xl font-extrabold leading-none">{{ video.optimizedSize
                          }}</span>
                          <span class="text-orange-300 text-lg font-semibold leading-none">{{ video.optimizedUnit
                          }}</span>
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
