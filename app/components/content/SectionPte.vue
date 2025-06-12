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
    <div class="flex gap-[12px] bg-(--bg-muted) px-[24px] py-[32px] rounded-[8px] ">
      <div class="grid gap-[12px]">
        <div
          v-for="(item, i) in videos"
          :key="item.src"
          class="relative w-[160px] h-[90px] rounded-[8px] overflow-hidden cursor-pointer"
          :class="[i === selectedIndex ? 'ring-[3px] ring-(--ui-primary)' : '']"
          @click="selectedIndex = i"
        >
          <img
            class="absolute inset-0"
            :src="item.thumb"
          >
          <div class="absolute bottom-2 right-2 text-white font-bold">
            <div>{{ item.reso }}</div>
          </div>
        </div>
      </div>
      <div
        :key="selectedIndex"
        class="flex-1 relative grid grid-cols-3 gap-[12px]"
      >
        <div class="col-span-2">
          <div class="mb-2 text-base">
            <div class="font-bold text-(--ui-primary) text-lg">
              {{ res[0].name }}
            </div>
            <div>
              {{ videos[selectedIndex].reso2 }}
            </div>
            <div class="font-bold">
              {{ res[0].vbr_size }}MB
            </div>
          </div>
          <VideoPlayer
            aspect-ratio="16:9"
            :poster="videos[selectedIndex].thumb"
            :controls="true"
            :src="video"
            :loop="true"
            :volume="0"
            @timeupdate="timeUpdate"
          >
            <template #default="{ player, state }">
              <div
                class="absolute inset-0 group"
                lt-lg="hidden"
              >
                <ImgComparisonSlider class="w-full h-full relative">
                  <template #first>
                    <div class="slotted w-full h-full" />
                  </template>
                  <template #second />
                </ImgComparisonSlider>
                <UButton
                  v-if="!state.playing"
                  variant="solid"
                  size="lg"
                  as="div"
                  class="absolute z-2 top-1/2 rounded-full! left-1/2 cursor-pointer -translate-x-1/2 -translate-y-1/2"
                  @click="player.play()"
                >
                  Play video
                  <i class="i-ri:play-fill" />
                </UButton>

                <div
                  class="text-sm bg-white hidden group-hover:block shadow transition-all text-black px-4 py-1.5 rounded-lg absolute top-[32px] left-1/2 translate-x-[calc(-100%-48px)]"
                >
                  <div class="flex justify-between gap-8">
                    <div>
                      Standard Static
                    </div>
                    <div class="font-bold ">
                      <div>{{ res[0].vbr_size }}MB</div>
                    </div>
                  </div>
                  <div class="flex justify-between gap-8">
                    <div>
                      Encoding Seting
                    </div>
                    <div class="font-bold">
                      {{ videos[selectedIndex].reso3 }} H.264
                    </div>
                  </div>
                </div>

                <div
                  class="text-sm bg-white hidden group-hover:block shadow transition-all text-black px-4 py-1.5 rounded-lg absolute top-[32px] left-1/2 translate-x-[calc(48px)]"
                >
                  <div class="flex justify-between gap-8">
                    <div class="font-bold text-(--ui-primary)">
                      Sigma ncode
                    </div>
                    <div class="font-bold text-(--ui-primary)">
                      <div>{{ res[0].pte_size }}MB</div>
                    </div>
                  </div>
                  <div class="flex justify-between gap-8">
                    <div>
                      Per-Title Encoding
                    </div>
                    <div class="font-bold">
                      {{ videos[selectedIndex].reso3 }} H.264
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </VideoPlayer>
        </div>

        <div class="flex-shrink-0 mt-10">
          <div>
            <div class="text-lg text-(--ui-primary) font-bold">
              Bitrate
            </div>
            <BitrateEchart
              class="mt-2"
              :current-index="currentIndex"
              :default-data="defaultData"
              :pte-data="pteData"
            />
          </div>
          <div class="mt-4">
            <div class="text-lg text-(--ui-primary) font-bold">
              Performance
            </div>
            <div class="text-sm font-medium mt-2">
              <div class="flex justify-between gap-8">
                <div>Per Title Segment Data</div>
                <div>{{ res[0].pte_size }}MB</div>
              </div>
              <div class="flex justify-between gap-8">
                <div>Default Segment Data</div>
                <div>{{ res[0].vbr_size }}MB</div>
              </div>
              <div class="flex justify-between gap-8">
                <div>Saving</div>
                <div>{{ Math.max(Math.round((res[0].vbr_size - res[0].pte_size) / res[0].vbr_size * 100), 0) }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
