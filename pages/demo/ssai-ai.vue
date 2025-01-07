<script lang="ts" setup>
const route = useRoute()
useHead({
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

const NuxtLink = resolveComponent('NuxtLink')

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

onMounted(() => {
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

        // STEP 9: Set up event tracking for logging
        onEventTracking('start', (payload: any) => {
          adInsertedTime.value = formatTime(video.currentTime)
        })

        onEventTracking('complete', (payload: any) => {
          adInsertedTime.value = ''
        })
      }
    })

  video.addEventListener('timeupdate', () => {
    if (video) {
      timeElapsed.value = formatTime(video.currentTime)
    }
  })
})
</script>

<template>
  <main>
    <div class="relative mb-10">
      <PricingHero>
        <template #title>
          SSAI AI Ads Marker
        </template>
        <template #subtitle>
          SSAI AI Ads Marker leverages artificial intelligence to automatically detect and mark ad insertion points in live or on-demand content, ensuring seamless and precise ad placements
        </template>
        <template #image>
          <img src="/Media Live/slide5.png" alt="SSAI Manual Ads Insert">
        </template>
      </PricingHero>
    </div>

    <div class="mx-16 my-8 flex items-start justify-between gap-8">
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <div class="mb-2 text-lg font-semibold">
            Time Elapsed: {{ timeElapsed }}
          </div>
          <p class="mt-4 text-primary font-semibold">
            {{ adInsertedTime }} {{ adInsertedTime ? 'Ads' : 'In-stream' }}
          </p>
        </div>
        <video controls class="videoElement w-full rounded-lg shadow" />
      </div>
      <div class="mt-15 w-80 rounded-lg bg-white p-4 text-primary shadow">
        <h3 class="mb-4 text-lg">
          Observe how ads seamlessly appear within the video without interruption, providing an optimal user experience. AI Ads Marker ensures that the ad placement points are selected accurately and appropriately.
        </h3>
      </div>
    </div>

    <!-- SECTION CTA -->
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
