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
const countdown = ref(0)

watch(countdown, (value) => {
  if (value === 0)
    return
  setTimeout(() => {
    countdown.value = value - 1
  }, 1000)
})
function formatTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  return [hrs, mins, secs]
    .map(v => v < 10 ? `0${v}` : v)
    .join(':')
}
const isPending = computed(() => countdown.value > 0)

const isLoading = ref(false)

const destroyFn = ref<() => void | null>(null)
const hlsInstance = ref<any | null>(null)

async function insertAds() {
  const duration = Number.parseInt(adDuration.value)
  if (duration < 5 || duration > 60) {
    alert('Duration must be between 5 and 60 seconds')
    return
  }
  isLoading.value = true
  countdown.value = duration
  const res = await $fetch(joinURL(domain, '/api/demo-page/sessions', sessionId.value), {
    method: 'POST',
    body: {
      duration,
    },
  })
  isLoading.value = false
  isPending.value = true
}

async function startPlayer() {
  destroyFn.value?.()
  hlsInstance.value?.destroy()
  sessionId.value = nanoid()

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
          // console.log('[LOG] ~ payload:', payload)
        })

        onEventTracking('complete', (payload: any) => {
          // adInsertedTime.value = formatTime(video.currentTime)
        })

        // play video
        hls.on(window.Hls.Events.MEDIA_ATTACHED, () => {
          video.muted = true
          video.play()
        })
      }
    })

  video.addEventListener('timeupdate', () => {
    if (video) {
      timeElapsed.value = formatTime(video.currentTime)
    }
  })
}

onMounted(() => {
  // wait until window.SigmaDaiSdk is ready
  const interval = setInterval(() => {
    if (window.SigmaDaiSdk) {
      clearInterval(interval)
      startPlayer()
    }
  }, 100)
})
</script>

<template>
  <main class="py-5">
    <div class="mx-16 flex items-start justify-center gap-8">
      <div class="">
        <div class="mb-2 text-lg font-semibold">
          Time Elapsed: {{ timeElapsed }}
        </div>
        <div class="relative aspect-video h-[420px]">
          <video
            controls
            class="videoElement size-full absolute top-0 left-0 rounded-lg shadow"
          />
        </div>
        <p
          v-if="adInsertedTime"
          class="mt-4"
        >
          Ad inserted successfully at {{ adInsertedTime }}
        </p>
      </div>
      <UCard class="mt-9 w-80">
        <template #header>
          <h3 class="text-xl font-semibold">
            Manual Ads Insert
          </h3>
        </template>

        <div class="space-y-4">
          <div>
            <div class="flex items-center gap-1 mb-2">
              <label
                for="adTime"
                class="block text-sm text-gray-700 dark:text-gray-300 font-medium"
              >
                Duration
              </label>
              <p class="text-xs text-gray-500">
                (from 5 to 60 seconds)
              </p>
            </div>
            <UInput
              v-model="adDuration"
              class="min-w-64"
              placeholder="30"
              type="number"
              min="5"
              max="60"
            />
          </div>
          <div>
            <label
              for="adUrl"
              class="block text-sm text-gray-700 dark:text-gray-300 font-medium mb-2"
            >Ad URL</label>
            <UInput
              v-model="adUrl"
              disabled
              class="min-w-64"
              placeholder=""
            />
          </div>
          <UButton
            :disabled="isLoading || isPending"
            @click="insertAds"
          >
            {{ isLoading || isPending ? `Inserting... (${countdown}s)` : 'Insert Ads Now' }}
          </UButton>
        </div>
      </UCard>
    </div>
  </main>
</template>
