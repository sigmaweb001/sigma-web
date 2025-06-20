<script setup lang="ts">
const props = defineProps<{
  demoVideos: Array<any>
  selectedVideoId: number
}>()

const emit = defineEmits(['select-video', 'close'])

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

function handleSelectVideo(event: Event, videoId: number) {
  // prevent action on .item-action
  if (event.target.classList.contains('item-action')) {
    return
  }
  emit('select-video', videoId)
}
</script>

<template>
  <div class="relative z-11 flex-1 flex flex-col justify-end p-6">
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
            class="flex-shrink-0 w-72 rounded-xl shadow-lg border border-black/10 cursor-pointer transition-all duration-300 scale-95 overflow-hidden relative video-card bg-gray-900/80 backdrop-blur-lg select-none"
            :class="{
              'ring-2 ring-white': video.id === selectedVideoId,
              'border-gray-700/50 hover:scale-100': video.id !== selectedVideoId,
            }"
            :style="{ 'animation-delay': `${index * 100}ms` }"
            @click="handleSelectVideo($event, video.id)"
          >
            <div class="aspect-video relative flex items-end justify-stretch">
              <img
                :src="video.thumbnail"
                class="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105"
                alt="video thumbnail"
              >
              <div class="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/80 z-10" />
              <slot
                name="item"
                :video="video"
              />
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
    <div class="flex items-end gap-4">
      <UButton
        color="neutral"
        variant="solid"
        size="lg"
        class="backdrop-blur-lg bg-white/80 text-gray-800 border-0 hover:bg-white/90 transition-colors duration-200 rounded-full"
        @click="emit('close')"
      >
        <Icon
          name="i-heroicons-x-mark-20-solid"
          class="size-5 text-gray-800"
        />
        Thu gọn
      </UButton>
    </div>
  </div>
</template>
