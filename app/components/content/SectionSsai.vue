<script lang="ts" setup>
useHead({
  title: 'SSAI',
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

  console.log('[LOG] ~ adsUrl:', adsUrl)
  const playerUrl = config.public.ssaiUrl
  console.log('[LOG] ~ playerUrl:', playerUrl)

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
            console.log('[LOG] ~ data:', data)
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

        // onEventTracking('*', (data) => {
        //   console.log('[LOG] ~ data:', data)
        //   const { eventType } = data
        //   if (eventType === 'start') {
        //     if (!adInsertedTime.value) {
        //       adInsertedTime.value = formatTime(video.currentTime)
        //     }
        //   }
        //   else if (eventType === 'complete') {
        //     adInsertedTime.value = ''
        //   }
        // })

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
      <div class="flex items-center gap-6 pb-4 w-[900px] mx-auto">
        <div class="text-lg font-semibold">
          Time Elapsed: {{ timeElapsed }}
        </div>

        <UBadge
          v-if="!adInsertedTime"
          color="success"
          variant="subtle"
        >
          Content
        </UBadge>

        <UBadge
          v-if="adInsertedTime"
          color="warning"
          variant="subtle"
        >
          Ads
        </UBadge>
      </div>
      <div class="relative aspect-video max-w-[900px] mx-auto">
        <video
          controls
          class="videoElement size-full absolute top-0 left-0 rounded-lg shadow"
        />
      </div>

      <div class="mt-4 mx-auto bg-(--ui-color-primary-100)/20 dark:bg-(--ui-color-primary-800)/20 p-4 rounded-lg max-w-[900px]">
        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          <span class="text-(--ui-primary) font-semibold">SSAI (Server-Side Ad Insertion)</span> - This widely adopted approach involves SSAI (Server-Side Ad Insertion) operating on the server. The system detects ad insertion points within the content stream and injects advertisements at the designated time before delivering the content to the viewer. This method ensures a smooth, uninterrupted viewing experience while minimizing ad-blocking issues.
        </p>
      </div>
    </div>
  </main>
</template>
