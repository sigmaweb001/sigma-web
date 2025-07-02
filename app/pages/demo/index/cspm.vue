<script lang="ts" setup>
useHead({
  title: 'SSAI AI Ads Marker',
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/hls.js@latest',
      // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
      tagPosition: 'head',
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk@v1.1.1/build/sdk-dai.iife.js',
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

function startPlayer() {
// Get references to the video and ad container elements
  const video = document.querySelector('.videoElement') as HTMLVideoElement | null
  if (!video)
    return
  let destroyFn
  let hlsInstance

  // STEP 5: Set the URL of the HLS manifest (video stream with SSAI)
  const sourceURL = 'https://dai.sigma.video/manifest/manipulation/master/53ff75d8-22ca-4457-baf9-a058233e098b/scte35-av6s-clear/master.m3u8'

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
    <div class="relative mb-4">
      CSPM
    </div>

    <div class="mx-16 flex items-start justify-between gap-8">
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <div class="mb-2 text-lg font-semibold">
            Time Elapsed: {{ timeElapsed }}
          </div>
          <p class="mt-4 text-lg text-(--ui-primary) font-semibold">
            {{ adInsertedTime ? `Ads (${adInsertedTime})` : 'In-stream' }}
          </p>
        </div>
        <video
          controls
          class="videoElement w-full rounded-lg shadow"
        />
      </div>
      <UCard class="mt-15 w-80 rounded-lg p-4 text-(--ui-primary)">
        <h3 class="mb-4 text-base">
          Observe how ads seamlessly appear within the video without interruption, providing an optimal user experience. AI Ads Marker ensures that the ad placement points are selected accurately and appropriately.
        </h3>
      </UCard>
    </div>

    <SectionCta
      title="Experience seamless ad insertion with SSAI's Manual Ads Insert feature. Control when and where your ads appear in real-time for a fully customized streaming experience"
      :button="{
        label: 'Contact us',
        to: localePath('/contact'),
      }"
    />
  </main>
</template>
