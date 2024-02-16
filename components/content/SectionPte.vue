<script lang="ts" setup>
import { VideoPlayer } from '@videojs-player/vue'

const { locale } = useI18n()

const { left } = definePropsRefs<{
  left?: boolean
}>()
const { data } = await useAsyncData('pte', () => queryContentLocale().where({ _partial: true }).findOne(), { watch: [locale] })

const videos = computed(() => data.value.body)

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
  <section>
    <SectionTitle v-if="$slots.title || $slots.subtitle" :left="left">
      <template #title>
        <ContentSlot :use="$slots.title" unwrap="p" />
      </template>
      <template #subtitle>
        <ContentSlot :use="$slots.subtitle" unwrap="p" />
      </template>
    </SectionTitle>
    <div class="flex gap-12px rounded-8px bg-accent px-24px py-32px">
      <div class="grid gap-12px">
        <div
          v-for="(item, i) in videos" :key="i" class="relative h-90px w-160px cursor-pointer of-hidden rounded-8px"
          :class="[i === selectedIndex ? 'ring-3px ring-primary' : '']" @click="selectedIndex = i"
        >
          <NuxtImg class="absolute inset-0" :src="item.thumb" />
          <div class="absolute bottom-2 right-2 text-white font-bold">
            <div>{{ item.reso }}</div>
          </div>
        </div>
      </div>
      <div :key="selectedIndex" class="relative grid grid-cols-3 flex-1 gap-12px">
        <div class="col-span-2">
          <div class="mb-2 text-base">
            <div class="text-lg text-primary font-bold">
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
            aspect-ratio="16:9" :poster="videos[selectedIndex].thumb" :controls="true" :src="video"
            :loop="true" :volume="0" @mounted="() => { }" @ready="() => { }" @play="() => { }" @pause="() => { }"
            @ended="() => { }" @timeupdate="timeUpdate"
          >
            <template #="{ player, state }">
              <div class="group absolute inset-0" lt-lg="hidden">
                <ImgComparisonSlider class="relative h-full w-full">
                  <template #first>
                    <div class="slotted h-full w-full" />
                  </template>
                  <template #second />
                </ImgComparisonSlider>
                <SButton
                  v-if="!state.playing" variant="white" as="a" class="absolute left-1/2 top-1/2 z-1 translate-x--1/2 translate-y--1/2 cursor-pointer !rounded-full"
                  @click="player.play()"
                >
                  Play video
                  <i class="i-ri:play-fill" />
                </SButton>

                <div
                  class="absolute left-1/2 top-32px hidden translate-x-[calc(-100%-48px)] rounded-3 bg-white px-4 py-1.5 text-sm text-black shadow transition-all group-hover:block"
                >
                  <div class="flex justify-between gap-8">
                    <div>
                      Standard Static
                    </div>
                    <div class="font-bold">
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
                  class="absolute left-1/2 top-32px hidden translate-x-[calc(48px)] rounded-3 bg-white px-4 py-1.5 text-sm text-black shadow transition-all group-hover:block"
                >
                  <div class="flex justify-between gap-8">
                    <div class="text-primary font-bold">
                      Sigma ncode
                    </div>
                    <div class="text-primary font-bold">
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

        <div class="mt-10 flex-shrink-0">
          <div>
            <div class="text-lg text-primary font-bold">
              Bitrate
            </div>
            <BitrateEchart class="mt-2" :current-index="currentIndex" :default-data="defaultData" :pte-data="pteData" />
          </div>
          <div class="mt-4">
            <div class="text-lg text-primary font-bold">
              Performance
            </div>
            <div class="mt-2 text-sm font-500">
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
  </section>
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
