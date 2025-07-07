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

// Separate time tracking for both videos
const originalTimeElapsed = ref('00:00:00')
const adsTimeElapsed = ref('00:00:00')
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

// Add type declarations for window objects
declare global {
  interface Window {
    Hls: any
    SigmaDaiSdk: any
  }
}

function startPlayer() {
  // Get references to both video elements
  const originalVideo = document.querySelector('.originalVideoElement') as HTMLVideoElement | null
  const adsVideo = document.querySelector('.videoElement') as HTMLVideoElement | null

  const ssaiAiRawUrl = config.public.ssaiAiRawUrl
  const ssaiAiAdsUrl = config.public.ssaiAiAdsUrl

  if (!adsVideo || !originalVideo)
    return

  let _destroyFn: (() => void) | undefined
  let _hlsInstance: any
  let _originalHlsInstance: any

  // STEP 5: Set the URL of the HLS manifest (video stream with SSAI)
  const sourceURL = ssaiAiAdsUrl

  // Initialize original video (without ads)
  if (window.Hls.isSupported()) {
    const originalHls = new window.Hls()
    _originalHlsInstance = originalHls

    // Use original stream without SSAI processing
    const originalSourceURL = ssaiAiRawUrl
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
    .then(({ sigmaPlayer, destroy }: { sigmaPlayer: any, destroy: () => void }) => {
      // Check if the HLS.js is supported in the browser
      if (window.Hls.isSupported()) {
        const hls = new window.Hls()
        _hlsInstance = hls

        // STEP 7: Load the manifest URL and attach the HLS stream to the video element
        hls.loadSource(playerUrl)
        hls.attachMedia(adsVideo)

        sigmaPlayer.attachHls(hls)
        _destroyFn = destroy

        function createHlsFragChanged() {
          return async (_event: string, data: { frag: { tagList: string[][], _url: string } }) => {
            const { tagList } = data.frag

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

  // Add separate time tracking for both videos
  originalVideo.addEventListener('timeupdate', () => {
    if (originalVideo) {
      originalTimeElapsed.value = formatTime(originalVideo.currentTime)
    }
  })

  adsVideo.addEventListener('timeupdate', () => {
    if (adsVideo) {
      adsTimeElapsed.value = formatTime(adsVideo.currentTime)
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
            Time Elapsed: {{ originalTimeElapsed }}
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
          <div class="flex justify-between items-center">
            <div class="text-lg font-semibold">
              Time Elapsed: {{ adsTimeElapsed }}
            </div>
            <!-- <p class="text-lg text-(--ui-primary) font-semibold">
              {{ adInsertedTime ? `Ads (${adInsertedTime})` : 'In-stream' }}
            </p> -->
          </div>
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
