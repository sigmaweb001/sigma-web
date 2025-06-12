<script lang="ts" setup>
import 'plyr/dist/plyr.css'
import Plyr from 'plyr'

const props = defineProps<{
  src: string
}>()

const { src } = toRefs(props)

const videoRef = ref()

onMounted(() => {
  const player = new Plyr(videoRef.value)

  videoRef.value.src = src.value
})
const loaded = ref(false)
function onLoad() {
  loaded.value = true
}
</script>

<template>
  <video
    ref="videoRef"
    class="size-0"
    controls
    crossorigin
    playsinline
    @load="onLoad"
  />
</template>
