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

const pageParams = useUrlSearchParams('history')
pageParams.modal = ''

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

function showVideoList() {
  pageParams.modal = 'list'
}

function hideVideoList() {
  pageParams.modal = ''
}

function selectVideo(videoId: number) {
  selectedVideoId.value = videoId

  hideVideoList()
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

// Play Video Uploading
const { open, onChange, reset } = useFileDialog({
  accept: 'video/*',
  directory: false,
})

const uploadingRef = ref()
const toast = useToast()

function validateFile(file: File): boolean {
  const maxSizeMB = 1024
  const isVideo = file.type.startsWith('video/')
  const isSizeOk = file.size <= maxSizeMB * 1024 * 1024
  if (!isVideo) {
    toast.add({
      title: 'Loại tệp không hợp lệ',
      description: 'Chỉ cho phép tệp video',
      color: 'error',
    })
    return true
  }
  if (!isSizeOk) {
    toast.add({
      title: 'Tệp quá lớn',
      description: `Video vượt quá dung lượng cho phép (Dung lượng tối đa: 1GB)`,
      color: 'error',
    })
    return true
  }
  return false // valid file
}

onChange((newFiles) => {
  if (newFiles?.length > 0) {
    const error = validateFile(newFiles[0])
    if (error) {
      reset()
      return
    }

    pageParams.modal = 'uploading'
    pageParams.uploadId = ''
    // pause video
    playVideoRef.value.pause()
    nextTick(() => {
      uploadingRef.value.startUpload(newFiles[0])
      reset()
    })
  }
})
const uploadingData = ref<{ assetId: string, uploadId: string } | null>(null)
function handleUploadSuccess(data: { assetId: string, uploadId: string }) {
  uploadingData.value = data
  pageParams.modal = 'processing'
}

const hideInfo = computed(() => {
  return pageParams.modal === 'uploading' || pageParams.modal === 'processing' || pageParams.modal === 'share'
})

function handleOpenUploading() {
  open()
}

function handleOpenResult() {
  pageParams.modal = ''
  pageParams.uploadId = uploadingData.value?.uploadId
}

const showDetail = computed(() => Boolean(pageParams.uploadId))
</script>

<template>
  <div class="h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
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
              :hide-controls="hideInfo"
              :control-class="showDetail ? 'bottom-17' : 'bottom-6'"
            />
          </ClientOnly>
        </div>

        <!-- Top Stats Overlay -->
        <div
          v-if="!hideInfo"
          class="absolute top-6 left-6 right-6 flex justify-between items-start z-10 transition-opacity duration-300 flex-nowrap gap-4 overflow-x-auto scrollbar-hide opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
        >
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
          v-if="!hideInfo"
          class="absolute bottom-0 left-0 right-0 px-6 py-5 opacity-0 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto"
        >
          <div class="flex items-end gap-2">
            <!-- View More Demo Button -->
            <UButton
              v-if="pageParams.modal === ''"
              color="neutral"
              variant="solid"
              size="lg"
              class="backdrop-blur-lg bg-white/80 text-gray-800 border-0 hover:bg-white/90 transition-colors duration-200 rounded-full"
              @click="showVideoList"
            >
              <Icon
                name="i-heroicons-rectangle-group-20-solid"
                class="size-5 text-gray-800"
              />
              Xem thêm demo
            </UButton>

            <template v-if="!showDetail">
              <!-- Right Side Content -->
              <div class="flex-1 text-right pr-2">
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
              <UButton
                color="warning"
                size="lg"
                class="font-bold rounded-full"
                @click="open()"
              >
                <Icon
                  name="i-heroicons-arrow-up-tray-20-solid"
                  class="size-5"
                />
                Upload video
              </UButton>
            </template>
            <template v-else>
              <!-- Right Side Content -->
              <div class="flex-1 text-right pr-2">
                <h3 class="text-white font-bold text-sm mb-1">
                  Video kết quả chỉ được lưu trữ trong vòng 24h
                </h3>
                <p class="text-white/80 text-xs">
                  Bạn có thể kéo thanh so sánh để đối chiếu với video gốc
                </p>
              </div>

              <!-- Upload Button -->
              <UButton
                color="warning"
                size="lg"
                class="font-bold rounded-full"
              >
                <Icon
                  name="i-heroicons-arrow-down-tray-20-solid"
                  class="size-5"
                />
                Tải video
              </UButton>
              <UButton
                color="neutral"
                variant="outline"
                size="lg"
                class="font-bold rounded-full"
                @click="pageParams.modal = 'share'"
              >
                <Icon
                  name="i-heroicons-share-20-solid"
                  class="size-5"
                />
                Chia sẻ
              </UButton>

              <!-- Upload Button -->
              <UButton
                color="neutral"
                variant="outline"
                size="lg"
                class="font-bold rounded-full"
                @click="open()"
              >
                <Icon
                  name="i-heroicons-arrow-up-tray-20-solid"
                  class="size-5"
                />
                Upload video
              </UButton>
            </template>
          </div>
        </div>
      </div>

      <!-- Demo Overlay -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="pageParams.modal !== ''"
          class="absolute inset-0 z-[9999] bg-black/10 backdrop-blur-xs overflow-hidden flex flex-col"
        >
          <PlayVideoList
            v-if="pageParams.modal === 'list'"
            :demo-videos="demoVideos"
            :selected-video-id="selectedVideoId"
            @select-video="selectVideo"
            @close="hideVideoList"
          />

          <PlayFileUploading
            v-else-if="pageParams.modal === 'uploading'"
            ref="uploadingRef"
            :uploading-data="uploadingData"
            @upload="handleOpenUploading"
            @success="handleUploadSuccess"
          />

          <PlayFileProcessing
            v-else-if="pageParams.modal === 'processing'"
            ref="processingRef"
            @upload="handleOpenUploading"
            @back="pageParams.modal = ''"
            @result="handleOpenResult"
          />

          <PlayFileShare
            v-else-if="pageParams.modal === 'share'"
            @back="pageParams.modal = ''"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style>
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
