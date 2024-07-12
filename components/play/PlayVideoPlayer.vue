<script lang="ts" setup>
import 'plyr/dist/plyr.css'
import Plyr from 'plyr'
import Hls from 'hls.js'

const props = defineProps<{
  source: string
  isHls?: boolean
  isDash?: boolean
}>()

const { source, isHls, isDash } = toRefs(props)

const videoRef = ref()

onMounted(() => {
  // For more dash options, see https://github.com/Dash-Industry-Forum/dash.js

  const player = new Plyr(videoRef.value)

  if (isHls.value) {
    if (!Hls.isSupported()) {
      videoRef.value.src = source
    }
    else {
      const hls = new Hls()
      hls.loadSource(source.value)
      hls.attachMedia(videoRef.value)
    }
    // const player = new Plyr(videoRef.value, { captions: { active: true, update: true } })
  }
  else if (isDash.value) {
    const dash = window.dashjs.MediaPlayer().create()
    dash.initialize(videoRef.value, source.value, true)
  }
  else {
    videoRef.value.src = source.value
  }
})
</script>

<template>
  <video ref="videoRef" controls crossorigin playsinline />
</template>
