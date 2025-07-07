<script lang="ts" setup>
useHead({
  title: 'CSPM',
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/hls.js@latest',
      // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
      tagPosition: 'head',
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk@v1.5.1/build/sdk-dai.iife.js',
      tagPosition: 'head',
    },
  ],
})

const localePath = useLocalePath()

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

const config = useRuntimeConfig()

function startPlayer() {
// Get references to the video and ad container elements
  const video = document.querySelector('.videoElement') as HTMLVideoElement | null
  if (!video)
    return
  let destroyFn
  let hlsInstance

  // STEP 5: Set the URL of the HLS manifest (video stream with SSAI)
  const adsEndpoint = config.public.ssaiAdsEndpoint
  const params = {
    userId: 'abcd1234',
    sessionId: 'xyz987',
  }

  const { adsUrl } = window.SigmaDaiSdk.getAdsURL(adsEndpoint, params)

  const playerUrl = config.public.ssaiUrl

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
        hlsInstance = hls

        // STEP 7: Load the manifest URL and attach the HLS stream to the video element
        hls.loadSource(playerUrl)
        hls.attachMedia(video)

        sigmaPlayer.attachHls(hls)
        destroyFn = destroy

        function createHlsFragChanged() {
          return async (event: string, data: any) => {
            const { tagList, _url } = data.frag

            const isAds = tagList.flat().find(tag => tag === 'ads')

            if (isAds) {
              if (!adInsertedTime.value) {
                adInsertedTime.value = formatTime(video.currentTime)
              }
            }
            else {
              adInsertedTime.value = ''
            }
          }
        }

        hls.on(window.Hls.Events.FRAG_CHANGED, createHlsFragChanged())
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
  <main class="py-10">
    <div class="mx-16 gap-8">
      <div class="flex items-center gap-6 justify-center pb-4">
        <div class="text-lg font-semibold">
          Time Elapsed: {{ timeElapsed }}
        </div>
        <p class="text-lg text-(--ui-primary) font-semibold">
          {{ adInsertedTime ? `Ads (${adInsertedTime})` : 'In-stream' }}
        </p>
        <UBadge
          color="success"
          variant="subtle"
        >
          Content
        </UBadge>
      </div>
      <div class="relative aspect-video max-h-[420px] mx-auto">
        <video
          controls
          class="videoElement size-full absolute top-0 left-0 rounded-lg shadow"
        />
      </div>

      <div class="mt-4 mx-30 bg-(--ui-color-primary-100)/20 dark:bg-(--ui-color-primary-800)/20 p-4 rounded-lg">
        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          <span class="text-(--ui-primary) font-semibold">CSPM (Client-Side Placement & Management)</span> - This method allows ads to be inserted directly within the client environment. Instead of server-side processing, the client is responsible for detecting ad insertion points and injecting advertisements dynamically during playback. This approach offers greater flexibility, enabling integration across multiple platforms while leveraging personalized data to optimize ad performance.
        </p>
      </div>
    </div>
  </main>
</template>
