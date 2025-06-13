<script lang="ts" setup>
const props = defineProps<{
  src: string
}>()

const { src } = toRefs(props)

const videoRef = ref()

onMounted(() => {
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
    :src="src"
    class="size-0"
    crossorigin
    playsinline
    @load="onLoad"
  />
</template>
