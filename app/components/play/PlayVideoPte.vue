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

const _loaded = ref(false)
const loadedOptimized = ref(false)
const loaded = computed(() => _loaded.value && loadedOptimized.value)
const currentTime = ref(0)
const duration = ref(0)
const isMuted = ref(false)
const isPlaying = ref(false)
const error = ref<string | null>(null)

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

function onLoadedMetadata() {
  _loaded.value = true
  duration.value = videoRef.value?.duration || 0
}

function onLoadedMetadataOptimized() {
  loadedOptimized.value = true
}

function onTimeUpdate() {
  currentTime.value = videoRef.value?.currentTime || 0
}

function toggleMute() {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted
    isMuted.value = videoRef.value.muted
  }
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

function play() {
  if (videoRef.value) {
    videoRef.value.play()
  }
  if (videoRefOptimized.value) {
    videoRefOptimized.value.play()
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

defineExpose({ play, pause })
</script>

<template>
  <div class="relative w-full h-full group focus-within:group">
    <template v-if="!error">
      <ImgComparisonSlider
        :hide-handle="!isPlaying"
        class="w-full h-full relative"
        :handle-text="isEn ? 'Drag to compare' : 'Kéo để so sánh'"
      >
        <template #first>
          <video
            ref="videoRef"
            :src="src"
            class="w-full h-full object-cover"
            :class="loaded ? 'opacity-100' : 'opacity-0'"
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
            :class="loaded ? 'opacity-100' : 'opacity-0'"
            crossorigin="anonymous"
            preload="auto"
            playsinline
            :poster="thumbnail"
            @loadedmetadata="onLoadedMetadataOptimized"
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
        v-if="!isPlaying && loaded"
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
