<script lang="ts" setup>
definePageMeta({
  layout: false,
})
const isLoaded = ref(false)
const source = computed(() => useRoute().query.source as string)

const isHls = computed(() => source.value.includes('.m3u8'))
const isDash = computed(() => source.value.includes('.mpd'))

if (isHls.value) {
  isLoaded.value = true
}
else if (isDash.value) {
  useHead({
    script: [
      {
        src: '/script/dash.all.min.js',
        onload: () => {
          if (isDash.value)
            isLoaded.value = true
        },
      },
    ],
  })
}
else {
  isLoaded.value = true
}
</script>

<template>
  <main class="of-hidden">
    <PlayNavbar />
    <div class="mx-auto p-4">
      <div class="of-hidden rounded-xl">
        <PlayVideoPlayer v-if="isLoaded" :source="source" :is-dash="isDash" :is-hls="isHls" />
      </div>
    </div>
  </main>
</template>
