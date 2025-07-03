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
  // Get references to both video elements
  const adsVideo = document.querySelector('.videoElement') as HTMLVideoElement | null
  const originalVideo = document.querySelector('.originalVideoElement') as HTMLVideoElement | null

  if (!adsVideo || !originalVideo)
    return

  let destroyFn
  let hlsInstance
  let originalHlsInstance

  // STEP 5: Set the URL of the HLS manifest (video stream with SSAI)
  const sourceURL = 'https://dai.sigma.video/manifest/manipulation/master/53ff75d8-22ca-4457-baf9-a058233e098b/scte35-av6s-clear/master.m3u8'

  // Initialize original video (without ads)
  if (window.Hls.isSupported()) {
    const originalHls = new window.Hls()
    originalHlsInstance = originalHls

    // Use original stream without SSAI processing
    const originalSourceURL = 'https://dai.sigma.video/manifest/origin04/scte35-av6s-clear/master.m3u8'
    originalHls.loadSource(originalSourceURL)
    originalHls.attachMedia(originalVideo)

    originalHls.on(window.Hls.Events.MEDIA_ATTACHED, () => {
      originalVideo.muted = true
      originalVideo.play()
    })
  }

  const { playerUrl, adsUrl } = window.SigmaDaiSdk.processURL(sourceURL)

  // STEP 6: Create a new instance of the Sigma SSAI SDK with the ads video
  window.SigmaDaiSdk.createSigmaDai({
    video: adsVideo,
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
        hls.attachMedia(adsVideo)

        sigmaPlayer.attachHls(hls)
        destroyFn = destroy

        function createHlsFragChanged() {
          return async (event: string, data: any) => {
            const { tagList, _url } = data.frag

            const isAds = tagList.flat().find(tag => tag === 'ads')

            if (isAds) {
              if (!adInsertedTime.value) {
                adInsertedTime.value = formatTime(adsVideo.currentTime)
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
          adsVideo.muted = true
          adsVideo.play()
        })
      }
    })

  adsVideo.addEventListener('timeupdate', () => {
    if (adsVideo) {
      timeElapsed.value = formatTime(adsVideo.currentTime)
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
      <!-- Two videos side by side -->
      <div class="grid grid-cols-2 gap-6">
        <!-- Original Stream -->
        <div class="space-y-3 px-10">
          <div class="text-lg font-semibold">
            Time Elapsed: {{ timeElapsed }}
          </div>
          <div class="relative aspect-video max-h-[420px] mx-auto">
            <video
              controls
              muted
              class="originalVideoElement size-full absolute top-0 left-0 rounded-lg shadow"
            />
          </div>
          <div class="text-center">
            <h3 class="text-lg font-semibold text-orange-500 mb-2">
              Original stream
            </h3>
            <div class="bg-(--ui-color-primary-100)/20 dark:bg-(--ui-color-primary-800)/20 p-4 rounded-lg">
              <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                This is the original video stream, played without any ad insertion. It showcases the
                untouched content, providing a baseline for comparison. Unlike the stream on the right,
                this playback does not include any AI-detected ad break points or dynamic ad insertion.
              </p>
            </div>
          </div>
        </div>

        <!-- AI Ads Insert Stream -->
        <div class="space-y-3 px-10">
          <p class="text-lg text-(--ui-primary) font-semibold">
            {{ adInsertedTime ? `Ads (${adInsertedTime})` : 'In-stream' }}
          </p>
          <div class="relative aspect-video max-h-[420px] mx-auto">
            <video
              controls
              muted
              class="videoElement size-full absolute top-0 left-0 rounded-lg shadow"
            />
          </div>
          <div class="text-center">
            <h3 class="text-lg font-semibold text-orange-500 mb-2">
              AI Ads insert stream
            </h3>
            <div class="bg-(--ui-color-primary-100)/20 dark:bg-(--ui-color-primary-800)/20 p-4 rounded-lg">
              <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                This stream demonstrates how AI automatically detects and inserts ads into the video at
                optimal break points. The ad insertion is seamlessly integrated into the playback,
                ensuring minimal disruption to the viewing experience. It highlights the effectiveness of
                AI Ads Marker in delivering intelligent and context-aware ad placements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
