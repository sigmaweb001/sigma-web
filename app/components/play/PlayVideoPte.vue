<script lang="ts" setup>
const props = defineProps<{
  src: string
  optimizedSrc: string
  thumbnail: string
  hideControls: boolean
  controlClass: string
  isEn?: boolean
}>()

const { src, optimizedSrc, thumbnail, hideControls, isEn } = toRefs(props)

const videoRef = ref<HTMLVideoElement>()
const videoRefOptimized = ref<HTMLVideoElement>()

const loaded = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const isMuted = ref(false)
const isPlaying = ref(false)
const error = ref<string | null>(null)

// Synchronization variables
const syncTolerance = 0.1 // Allow 100ms difference before syncing
const bothVideosLoaded = ref(false)
const video1Loaded = ref(false)
const video2Loaded = ref(false)
let isSyncing = false

function onError(event: Event) {
  const video = event.target as HTMLVideoElement
  switch (video.error?.code) {
    case MediaError.MEDIA_ERR_ABORTED:
      error.value = isEn?.value
        ? 'The video playback was aborted.'
        : 'Quá trình phát video đã bị hủy bỏ.'
      break
    case MediaError.MEDIA_ERR_NETWORK:
      error.value = isEn?.value
        ? 'A network error caused the video download to fail.'
        : 'Lỗi mạng đã làm tải video thất bại.'
      break
    case MediaError.MEDIA_ERR_DECODE:
      error.value = isEn?.value
        ? 'The video playback was aborted due to a corruption problem or because the video used features your browser did not support.'
        : 'Quá trình phát video đã bị hủy bỏ do lỗi dữ liệu hoặc video sử dụng tính năng mà trình duyệt không hỗ trợ.'
      break
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      error.value = isEn?.value
        ? 'The video could not be loaded, either because the server or network failed or because the format is not supported.'
        : 'Không thể tải video, có thể do lỗi máy chủ, mạng hoặc định dạng không được hỗ trợ.'
      break
    default:
      error.value = isEn?.value
        ? 'An unknown error occurred.'
        : 'Đã xảy ra lỗi không xác định.'
      break
  }
}

function onLoadedMetadata(event: Event) {
  const video = event.target as HTMLVideoElement
  const isOptimized = video === videoRefOptimized.value

  if (isOptimized) {
    video2Loaded.value = true
  }
  else {
    video1Loaded.value = true
    duration.value = videoRef.value?.duration || 0
  }

  // Check if both videos are loaded
  if (video1Loaded.value && video2Loaded.value) {
    bothVideosLoaded.value = true
    loaded.value = true
  }
}

function syncVideos() {
  if (isSyncing || !bothVideosLoaded.value || !videoRef.value || !videoRefOptimized.value) {
    return
  }

  const time1 = videoRef.value.currentTime
  const time2 = videoRefOptimized.value.currentTime
  const timeDiff = Math.abs(time1 - time2)

  // If videos are out of sync beyond tolerance, sync them
  if (timeDiff > syncTolerance) {
    isSyncing = true

    // Use the video that's ahead as the reference
    const referenceTime = Math.max(time1, time2)

    if (time1 < referenceTime) {
      videoRef.value.currentTime = referenceTime
    }
    if (time2 < referenceTime) {
      videoRefOptimized.value.currentTime = referenceTime
    }

    // Reset syncing flag after a short delay
    setTimeout(() => {
      isSyncing = false
    }, 50)
  }
}

function onTimeUpdate(event: Event) {
  const video = event.target as HTMLVideoElement
  const isOptimized = video === videoRefOptimized.value

  if (!isOptimized) {
    currentTime.value = videoRef.value?.currentTime || 0
  }

  // Sync videos periodically during playback
  syncVideos()
}

function toggleMute() {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted
    isMuted.value = videoRef.value.muted
  }
  if (videoRefOptimized.value) {
    videoRefOptimized.value.muted = videoRef.value?.muted || false
  }
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

async function play() {
  if (!bothVideosLoaded.value) {
    // Wait for both videos to be loaded before playing
    return
  }

  try {
    // Ensure both videos start from the same time
    const currentTimeToSync = Math.max(
      videoRef.value?.currentTime || 0,
      videoRefOptimized.value?.currentTime || 0,
    )

    if (videoRef.value) {
      videoRef.value.currentTime = currentTimeToSync
      await videoRef.value.play()
    }
    if (videoRefOptimized.value) {
      videoRefOptimized.value.currentTime = currentTimeToSync
      await videoRefOptimized.value.play()
    }
  }
  catch (e) {
    console.error('Error playing videos:', e)
  }
}

function pause() {
  if (videoRef.value) {
    videoRef.value.pause()
  }
  if (videoRefOptimized.value) {
    videoRefOptimized.value.pause()
  }
}

function onPlay() {
  isPlaying.value = true
}

function onPause() {
  isPlaying.value = false
}

// Watch for both videos to be loaded
watch(bothVideosLoaded, (newValue) => {
  if (newValue) {
    // Sync initial mute state
    if (videoRef.value && videoRefOptimized.value) {
      const muteState = videoRef.value.muted
      videoRefOptimized.value.muted = muteState
      isMuted.value = muteState
    }
  }
})

defineExpose({ play, pause })
</script>

<template>
  <div class="relative w-full h-full group focus-within:group">
    <template v-if="!error">
      <ImgComparisonSlider
        :hide-handle="!isPlaying"
        class="w-full h-full relative"
      >
        <template #first>
          <video
            ref="videoRef"
            :src="src"
            class="w-full h-full object-cover"
            crossorigin="anonymous"
            preload="auto"
            playsinline
            :poster="thumbnail"
            @loadedmetadata="onLoadedMetadata"
            @timeupdate="onTimeUpdate"
            @play="onPlay"
            @pause="onPause"
            @error="onError"
          />
        </template>
        <template #second>
          <video
            ref="videoRefOptimized"
            :src="optimizedSrc"
            class="w-full h-full object-cover"
            crossorigin="anonymous"
            preload="auto"
            playsinline
            :poster="thumbnail"
            @loadedmetadata="onLoadedMetadata"
            @timeupdate="onTimeUpdate"
            @play="onPlay"
            @pause="onPause"
            @error="onError"
          />
        </template>
      </ImgComparisonSlider>

      <transition name="fade">
        <div
          v-if="loaded && !hideControls"
          class="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-black/60 rounded-full flex items-center gap-4 text-white text-sm z-10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-opacity duration-300"
          style="min-width: 200px; justify-content: center;"
          :class="[controlClass]"
        >
          <button
            v-if="isPlaying"
            class="focus:outline-none size-5"
            @click="pause"
          >
            <UIcon
              name="i-heroicons-pause-20-solid"
              class="h-5 w-5"
            />
          </button>
          <button
            v-else
            class="focus:outline-none size-5"
            @click="play"
          >
            <UIcon
              name="i-heroicons-play-20-solid"
              class="h-5 w-5"
            />
          </button>
          <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
          <button
            class="focus:outline-none size-5"
            @click="toggleMute"
          >
            <UIcon
              :name="isMuted ? 'i-lucide-volume-x' : 'i-lucide-volume-2'"
              class="h-5 w-5"
            />
          </button>
        </div>
      </transition>
      <!-- Central Play Button Overlay -->
      <div
        v-if="!isPlaying"
        class="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
      >
        <button
          class="pointer-events-auto backdrop-blur-md bg-gray-900/60 border border-white/20 hover:bg-gray-900/80 transition-colors duration-200 rounded-full flex items-center gap-2 px-4 py-2 text-white text-base font-semibold shadow-lg"
          @click="play"
        >
          <UIcon
            name="i-heroicons-play-20-solid"
            class="size-5"
          />
          {{ isEn ? 'Play video' : 'Phát video' }}
        </button>
      </div>
    </template>
    <div
      v-else
      class="absolute inset-0 flex flex-col items-center justify-center bg-black text-white p-4 text-center"
    >
      <UIcon
        name="i-heroicons-exclamation-triangle-20-solid"
        class="w-10 h-10 mb-4 text-red-500"
      />
      <p class="font-semibold">
        {{ isEn ? 'Error playing video' : 'Lỗi phát video' }}
      </p>
      <p class="text-sm text-gray-300">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
