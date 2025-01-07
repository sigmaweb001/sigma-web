<script setup lang="ts">
import { nanoid } from 'nanoid'
import { joinURL } from 'ufo'

useHead({
  title: 'SSAI Manual Ads Insert',
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/hls.js@latest',
      tagPosition: 'head',
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk@v1.1.1/build/sdk-dai.iife.js',
      tagPosition: 'head',
    },
  ],
})
const NuxtLink = resolveComponent('NuxtLink')
const sessionId = useSessionStorage('sessionId', nanoid())
const localePath = useLocalePath()

const domain = 'https://dev-streaming.gviet.vn:8783'

function getPlayerUrl(sessionId: string) {
  return `http://123.31.18.25:2180/manifest/manipulation/master/c1979665-2bf6-488f-b1db-51a847ae4679/${sessionId}/manifest/origin04/demo-ssai/master.m3u8`
}

const adDuration = ref('30')
const adUrl = ref(getPlayerUrl(sessionId.value))
const timeElapsed = ref('00:00:00')
const adInsertedTime = ref('')

function formatTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  return [hrs, mins, secs]
    .map(v => v < 10 ? `0${v}` : v)
    .join(':')
}

const isLoading = ref(false)

const destroyFn = ref<() => void | null>(null)
const hlsInstance = ref<any | null>(null)

async function insertAd() {
  destroyFn.value?.()
  hlsInstance.value?.destroy()
  sessionId.value = nanoid()

  const duration = Number.parseInt(adDuration.value)
  if (duration < 5 || duration > 60) {
    alert('Duration must be between 5 and 60 seconds')
    return
  }

  isLoading.value = true
  const res = await $fetch(joinURL(domain, '/api/demo-page/sessions', sessionId.value), {
    method: 'POST',
    body: {
      duration,
    },
  })
  console.log('[LOG] ~ res:', res)
  const video = document.querySelector('.videoElement') as HTMLVideoElement | null
  if (!video)
    return

  const sourceURL = getPlayerUrl(sessionId.value)
  const { playerUrl, adsUrl } = window.SigmaDaiSdk.processURL(sourceURL)

  // STEP 6: Create a new instance of the Sigma SSAI SDK with the video and ad containers
  window.SigmaDaiSdk.createSigmaDai({
    video,
    adContainer: null,
    adsUrl,
  })
    .then(({ onEventTracking, sigmaPlayer, destroy }) => {
      // Check if the HLS.js is supported in the browser
      if (window.Hls.isSupported()) {
        const hls = new window.Hls()
        hlsInstance.value = hls

        // STEP 7: Load the manifest URL and attach the HLS stream to the video element
        hls.loadSource(playerUrl)
        hls.attachMedia(video)

        sigmaPlayer.attachHls(hls)
        destroyFn.value = destroy

        // STEP 9: Set up event tracking for logging
        onEventTracking('*', (payload: any) => {
          console.log('[LOG] ~ payload:', payload)
        })

        onEventTracking('complete', (payload: any) => {
          // adInsertedTime.value = formatTime(video.currentTime)
        })

        // play video
        video.play()
      }

      isLoading.value = false
    })

  video.addEventListener('timeupdate', () => {
    if (video) {
      timeElapsed.value = formatTime(video.currentTime)
    }
  })
}
</script>

<template>
  <main>
    <div class="relative mb-4">
      <PricingHero>
        <template #title>
          SSAI Manual Ads Insert
        </template>
        <template #subtitle>
          Easily insert ads into a live stream playlist and customize content flow with real-time updates
        </template>
        <template #image>
          <img src="/Media Live/slide5.png" alt="SSAI Manual Ads Insert">
        </template>
      </PricingHero>
    </div>

    <div class="mx-16 flex items-start justify-between gap-8">
      <div class="flex-1">
        <div class="mb-2 text-lg font-semibold">
          Time Elapsed: {{ timeElapsed }}
        </div>
        <video controls class="videoElement w-full rounded-lg shadow" />
        <p v-if="adInsertedTime" class="mt-4">
          Ad inserted successfully at {{ adInsertedTime }}
        </p>
      </div>
      <div class="mt-9 w-80 rounded-lg bg-white p-4 shadow">
        <h3 class="mb-4 text-xl font-semibold">
          Manual Ads Insert
        </h3>
        <div class="mb-4">
          <div class="flex items-center gap-1">
            <label for="adTime" class="block text-sm text-gray-700 font-medium">Duration</label>
            <p class="text-xs text-gray-500">
              (from 5 to 60 seconds)
            </p>
          </div>
          <SInputText
            v-model="adDuration"
            class="min-w-64"
            placeholder="30"
            type="number"
            min="5"
            max="60"
          />
        </div>
        <div class="mb-4">
          <label for="adUrl" class="block text-sm text-gray-700 font-medium">Ad URL</label>
          <SInputText
            v-model="adUrl"
            disabled
            class="min-w-64"
            placeholder=""
          />
        </div>
        <SButton v-if="!isLoading" @click="insertAd">
          Insert Ad Now
        </SButton>
      </div>
    </div>

    <SectionCta>
      <template #title>
        Experience seamless ad insertion with SSAI's Manual Ads Insert feature. Control when and where your ads appear in real-time for a fully customized streaming experience
      </template>

      <template #default>
        <SButton
          class="underline-transparent rounded-full! hover:underline-current"
          :to="localePath('/contact')"
          :as="NuxtLink"
          size="lg"
          variant="white"
        >
          Contact us
        </SButton>
      </template>
    </SectionCta>
  </main>
</template>
