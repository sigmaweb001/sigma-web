<script lang="ts" setup>
const props = defineProps<{
  src: string
  optimizedSrc: string
  thumbnail: string
  hideControls: boolean
  controlClass: string
}>()

const { src, optimizedSrc, thumbnail, hideControls } = toRefs(props)

const videoRef = ref()
const videoRefOptimized = ref()

const loaded = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const isMuted = ref(false)
const isPlaying = ref(false)

function onLoadedMetadata() {
  loaded.value = true
  duration.value = videoRef.value?.duration || 0
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
    <ImgComparisonSlider
      :hide-handle="!isPlaying"
      class="w-full h-full relative"
    >
      <template #first>
        <video
          ref="videoRef"
          :src="src"
          class="w-full h-full object-cover"
          crossorigin
          playsinline
          :poster="thumbnail"
          @loadedmetadata="onLoadedMetadata"
          @timeupdate="onTimeUpdate"
          @play="onPlay"
          @pause="onPause"
        />
      </template>
      <template #second>
        <video
          ref="videoRefOptimized"
          :src="optimizedSrc"
          class="w-full h-full object-cover"
          crossorigin
          playsinline
          :poster="thumbnail"
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
        Phát video
      </button>
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
