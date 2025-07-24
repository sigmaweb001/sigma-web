<script lang="ts" setup>
const pageParams = useUrlSearchParams('history')
pageParams.modal = ''

const selectedVideo = defineModel<any>('selected-video', { required: true })
const isEn = computed(() => {
  return pageParams.lang === 'en'
})

const props = defineProps<{
  demoVideos: Array<any>
  uploading: {
    title: string
    subtitle?: string
  }
  processing: {
    title: string
    successTitle: string
  }
  mode: 'pte' | 'censorship'
  icon?: string
}>()

const demoVideos = props.demoVideos

function showVideoList() {
  pageParams.modal = 'list'
}

function hideVideoList() {
  pageParams.modal = ''
}

function selectVideo(videoId: number) {
  selectedVideo.value = demoVideos.find(video => video.id === videoId) || demoVideos[0]

  hideVideoList()
}

const originalSrc = computed(() => {
  return selectedVideo.value?.originalSrc
})
const optimizedSrc = computed(() => {
  return selectedVideo.value?.optimizedSrc
})

const isTallScreen = ref(false)

const updateAspect = () => {
  // 16/9 = 1.777...
  isTallScreen.value = window.innerHeight / window.innerWidth > 9 / 16
}

const isClientLoaded = ref(false)

onMounted(() => {
  updateAspect()
  window.addEventListener('resize', updateAspect)

  // Hide fc_frame elements
  const fcFrameElements = document.querySelectorAll('.fc_frame')
  fcFrameElements.forEach((element) => {
    (element as HTMLElement).style.display = 'none !important'
  })

  // Add horizontal scroll for video demo list
  if (!pageParams.jobId) {
    isClientLoaded.value = true
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateAspect)
})

const playVideoRef = ref(null)

// Play Video Uploading
const { open, onChange, reset } = useFileDialog({
  accept: 'video/*',
  directory: false,
})

const uploadingRef = ref()
const toast = useToast()

async function validateFile(file: File): Promise<boolean> {
  const maxSizeMB = 1024
  const isVideo = file.type.startsWith('video/')
  const isSizeOk = file.size <= maxSizeMB * 1024 * 1024
  if (!isVideo) {
    toast.add({
      title: isEn.value ? 'Invalid file type' : 'Loại tệp không hợp lệ',
      description: isEn.value ? 'Only video files are allowed' : 'Chỉ cho phép tệp video',
      color: 'error',
    })
    return true
  }
  if (!isSizeOk) {
    toast.add({
      title: isEn.value ? 'File too large' : 'Tệp quá lớn',
      description: isEn.value ? 'Video exceeds maximum allowed size (Max size: 1GB)' : `Video vượt quá dung lượng cho phép (Dung lượng tối đa: 1GB)`,
      color: 'error',
    })
    return true
  }

  async function getDuration(file: File) {
    if (!file) return 0
    const url = URL.createObjectURL(file)
    const video = document.createElement('video')
    video.preload = 'metadata'
    return await new Promise<number>((resolve) => {
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(url)
        resolve(video.duration)
      }
      video.src = url
    })
  }

  const duration = await getDuration(file)
  if (duration > 600) {
    toast.add({
      title: isEn.value ? 'Video too long' : 'Video quá dài',
      description: isEn.value ? 'Video exceeds maximum allowed duration (Max duration: 10 minutes)' : 'Video vượt quá thời gian cho phép (Thời gian tối đa: 10 phút)',
      color: 'error',
    })
    return true
  }

  return false // valid file
}

onChange(async (newFiles) => {
  if (newFiles?.length > 0) {
    const error = await validateFile(newFiles[0])
    if (error) {
      reset()
      return
    }

    pageParams.modal = 'uploading'
    pageParams.jobId = undefined
    // pause video
    playVideoRef.value.pause()
    nextTick(() => {
      uploadingRef.value.startUpload(newFiles[0])
      reset()
    })
  }
})
const uploadingData = ref<{ assetId: string, videoUri: string } | null>(null)
function handleUploadSuccess(data: { assetId: string, videoUri: string }) {
  uploadingData.value = data
  pageParams.modal = 'processing'
}

const hideInfo = computed(() => {
  return pageParams.modal === 'uploading' || pageParams.modal === 'processing' || pageParams.modal === 'share'
})

function handleOpenUploading() {
  open()
}

function handleOpenResult(jobId: string) {
  pageParams.modal = ''
  pageParams.jobId = jobId
}

const showDetail = computed(() => Boolean(pageParams.jobId))
interface JobResponse {
  id: string
  status: string
  source: {
    metadata: {
      size: number
      width: number
      height: number
      duration: number
      format: string
      videoCodec: string
      fps: number
      thumbnail: string
    }
    uri: string
  }
  transcode: {
    metadata: {
      size: number
    }
    uri: string
  }
}

const domain = 'https://dev-streaming.gviet.vn:8783'

watchImmediate(showDetail, async (newVal) => {
  function showError() {
    toast.add({
      title: isEn.value ? 'Error' : 'Lỗi',
      description: isEn.value ? 'An error occurred while processing the video' : 'Đã xảy ra lỗi khi xử lý video',
      color: 'error',
    })
  }

  if (newVal) {
    try {
      const jobResponse = await $fetch<JobResponse>(`/api/sigma-demo/vod-demo/jobs/${pageParams.jobId}`, {
        baseURL: domain,
      })

      // if (jobResponse.status !== 'completed') {
      //   showError()
      //   return
      // }

      const sourceMetadata = jobResponse.source.metadata
      const optimizedMetadata = jobResponse.transcode.metadata

      function getSizeAndUnit(bytes, decimals = 2) {
        if (bytes === 0) return [0, 'B'] // special-case 0

        const k = 1024
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        const i = Math.floor(Math.log(bytes) / Math.log(k)) // exponent / unit index

        const value = parseFloat((bytes / k ** i).toFixed(decimals))
        return [value, units[i]]
      }

      const [originalSize, originalUnit] = getSizeAndUnit(sourceMetadata.size)
      const [optimizedSize, optimizedUnit] = getSizeAndUnit(optimizedMetadata.size)

      selectedVideo.value = {
        id: jobResponse.id,
        name: jobResponse.id,
        resolution: sourceMetadata.width + 'p',
        originalSize,
        originalUnit,
        optimizedSize,
        optimizedUnit,
        dimensions: sourceMetadata.width + ' x ' + sourceMetadata.height,
        duration: new Date(sourceMetadata.duration * 1000).toISOString().substr(11, 8).replace(/^00:/, ''),
        format: sourceMetadata.format.includes('mp4') ? 'mp4' : sourceMetadata.format.split(',')[0],
        codec: sourceMetadata.videoCodec,
        fps: sourceMetadata.fps + ' FPS',
        thumbnail: sourceMetadata.thumbnail,
        originalSrc: jobResponse.source.uri,
        optimizedSrc: jobResponse.transcode.uri,
      }
      isClientLoaded.value = true
    }
    catch (error) {
      console.error('Error checking job status:', error)
      showError()
    }
  }
})

const { startDownload } = useDownloadVideo()

async function handleDownloadVideo() {
  const url = optimizedSrc.value
  const filename = (selectedVideo.value?.title || 'video') + '.mp4'
  startDownload(url, filename, isEn.value)
}
</script>

<template>
  <div class="h-full w-full relative">
    <template v-if="!isClientLoaded">
      <div class="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80">
        <svg
          class="animate-spin h-12 w-12 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </div>
    </template>
    <template v-else>
      <div class="h-screen bg-black/80 flex items-center justify-center relative overflow-hidden">
        <div
          class="relative group aspect-video"
          :class="isTallScreen ? 'w-full' : 'h-full'"
        >
          <!-- Video/Thumbnail Section -->
          <div class="relative w-full h-full bg-black/80 overflow-hidden flex items-center justify-center">
            <!-- Background Image/Video -->
            <div class="absolute inset-0">
              <ClientOnly>
                <PlayVideoPte
                  :key="selectedVideo.id"
                  ref="playVideoRef"
                  :src="originalSrc"
                  :optimized-src="optimizedSrc"
                  :thumbnail="selectedVideo.thumbnail"
                  :hide-controls="hideInfo"
                  :control-class="showDetail ? 'bottom-17' : 'bottom-6'"
                  :is-en="isEn"
                />
              </ClientOnly>
            </div>

            <!-- Top Stats Overlay -->
            <div
              v-if="!hideInfo"
              class="absolute top-6 left-6 right-6 flex justify-between items-start z-10 transition-opacity duration-300 flex-nowrap gap-4 overflow-x-auto scrollbar-hide opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
            >
              <slot name="stats" />
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
                  {{ isEn ? 'View more demos' : 'Xem thêm demo' }}
                </UButton>

                <template v-if="!showDetail">
                  <!-- Right Side Content -->
                  <div class="flex-1 text-right pr-2">
                    <h3 class="text-white font-bold text-sm mb-1">
                      {{ isEn ? 'Experience your video (Max 1GB)' : 'Trải nghiệm video của bạn (Tối đa 1GB)' }}
                    </h3>
                    <p class="text-white/80 text-xs">
                      <a
                        href="https://portal.sigma.video/auth/signup"
                        class="underline"
                        target="_blank"
                      >{{ isEn ? 'Want to try larger videos?' : 'Bạn muốn thử video lớn hơn?' }}</a>
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
                    {{ isEn ? 'Upload video' : 'Upload video' }}
                  </UButton>
                </template>
                <template v-else>
                  <!-- Right Side Content -->
                  <div class="flex-1 text-right pr-2">
                    <h3 class="text-white font-bold text-sm mb-1">
                      {{ isEn ? 'Result video is only stored for 24 hours' : 'Video kết quả chỉ được lưu trữ trong vòng 24h' }}
                    </h3>
                    <p class="text-white/80 text-xs">
                      {{ isEn ? 'You can drag the comparison slider to compare with the original video' : 'Bạn có thể kéo thanh so sánh để đối chiếu với video gốc' }}
                    </p>
                  </div>

                  <!-- Download Button -->
                  <UButton
                    color="warning"
                    size="lg"
                    class="font-bold rounded-full"
                    @click="handleDownloadVideo"
                  >
                    <Icon
                      name="i-heroicons-arrow-down-tray-20-solid"
                      class="size-5"
                    />
                    {{ isEn ? 'Download video' : 'Tải video' }}
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
                    {{ isEn ? 'Share' : 'Chia sẻ' }}
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
                    {{ isEn ? 'Upload video' : 'Upload video' }}
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
                :selected-video-id="selectedVideo.id"
                :is-en="isEn"
                @select-video="selectVideo"
                @close="hideVideoList"
              >
                <template #item="{ video }">
                  <slot
                    name="list-item"
                    :video="video"
                  />
                </template>
              </PlayVideoList>

              <PlayFileUploading
                v-else-if="pageParams.modal === 'uploading'"
                ref="uploadingRef"
                :uploading-data="uploadingData"
                :title="uploading.title"
                :subtitle="uploading.subtitle"
                :is-en="isEn"
                :icon="props.icon"
                :mode="props.mode"
                @upload="handleOpenUploading"
                @success="handleUploadSuccess"
              />

              <PlayFileProcessing
                v-else-if="pageParams.modal === 'processing' && uploadingData?.videoUri"
                ref="processingRef"
                :video-uri="uploadingData?.videoUri"
                :title="processing.title"
                :mode="props.mode"
                :success-title="processing.successTitle"
                :is-en="isEn"
                :icon="props.icon"
                @upload="handleOpenUploading"
                @back="pageParams.modal = 'list'"
                @result="handleOpenResult"
              />

              <PlayFileShare
                v-else-if="pageParams.modal === 'share'"
                :is-en="isEn"
                @back="pageParams.modal = ''"
              />
            </div>
          </Transition>
        </div>
      </div>
    </template>
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
