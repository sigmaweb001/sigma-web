<script lang="ts" setup>
import { VideoPlayer } from '@videojs-player/vue'

const props = defineProps<{
  left?: boolean
}>()

const { left } = toRefs(props)

const data = ref([
  {
    src: 'https://pte-cdn.sigma.video/bbb30/pte/master.m3u8',
    thumb: 'https://pte-cdn.sigma.video/bbb30/thumb.jpg',
    reso: 'HD',
    metric: 'https://pte-cdn.sigma.video/bbb30/metrics.txt',
    reso2: '1920x1080 10:34 MP4 H.264 30FPS',
    reso3: '1080p',
  },
  {
    src: 'https://pte-cdn.sigma.video/tos/pte/master.m3u8',
    thumb: 'https://pte-cdn.sigma.video/tos/thumb.jpg',
    reso: 'HD',
    metric: 'https://pte-cdn.sigma.video/tos/metrics.txt',
    reso2: '1920x1080 12:14 MP4 H.264 30FPS',
    reso3: '1080p',
  },
  {
    src: 'https://pte-cdn.sigma.video/football/pte/master.m3u8',
    thumb: 'https://pte-cdn.sigma.video/football/thumb.jpg',
    reso: 'HD',
    metric: 'https://pte-cdn.sigma.video/football/metrics.txt',
    reso2: '1920x1080 9:50 MP4 H.264 30FPS',
    reso3: '1080p',
  },
  {
    src: 'https://pte-cdn.sigma.video/tennis/pte/master.m3u8',
    thumb: 'https://pte-cdn.sigma.video/tennis/thumb.jpg',
    reso: 'HD',
    metric: 'https://pte-cdn.sigma.video/tennis/metrics.txt',
    reso2: '1920x1080 6:25 MP4 H.264 30FPS',
    reso3: '1080p',
  },
  {
    src: 'https://pte-cdn.sigma.video/movie/pte/master.m3u8',
    thumb: 'https://pte-cdn.sigma.video/movie/thumb.jpg',
    reso: 'HD',
    metric: 'https://pte-cdn.sigma.video/movie/metrics.txt',
    reso2: '1920x1080 9:59 MP4 H.264 30FPS',
    reso3: '1080p',
  },
])

const videos = computed(() => data.value)

const selectedIndex = ref(0)
const video = computed(() => videos.value[selectedIndex.value].src)
const metrics = await Promise.all(videos.value.map(video => $fetch<any>(video.metric, { responseType: 'json' })))
const res = computed(() => metrics[selectedIndex.value])
const currentTime = ref(1)

const pteData = computed(() => {
  const data = res.value[0].times as any[]
  return data.map(item => Number.parseFloat(item.rate.toFixed(2)))
})

const defaultData = computed(() => {
  const data = res.value[1].times as any[]
  return data.map(item => Number.parseFloat(item.rate.toFixed(2)))
})

function timeUpdate(e: any) {
  const player = e.target.player
  currentTime.value = player.currentTime()
}

const currentIndex = computed(() => Math.round(currentTime.value / 2))
</script>

<template>
  <UPageSection
    :ui="{
      container: 'py-4! gap-4 sm:gap-y-4',
      title: 'lg:text-4xl!',
    }"
  >
    <template #title>
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </template>
    <iframe
      src="/pte"
      class="aspect-video w-full rounded-lg"
    />
  </UPageSection>
</template>

<style>
@import 'video.js/dist/video-js.css';

.video-js .vjs-control-bar {
  z-index: 100;
}

.video-js .vjs-big-play-button {
  display: none;
}
</style>
