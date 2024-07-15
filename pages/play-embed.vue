<script lang="ts" setup>
import { withQuery } from 'ufo'

definePageMeta({
  layout: false,
})
const isLoaded = ref(false)
const route = useRoute()
const source = route.query.source as string
const name = route.query.name as string
const tags = route.query.tags as string[]
const category = route.query.category as string

const isHls = source?.includes('.m3u8')
const isDash = source?.includes('.mpd')

if (isHls) {
  isLoaded.value = true
}
else if (isDash) {
  useHead({
    script: [
      {
        src: '/script/dash.all.min.js',
        onload: () => {
          if (isDash)
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
  <main class="grid h-100dvh of-hidden">
    <div class="max-w-screen-1 relative mx-auto w-full">
      <PlayVideoPlayer v-if="isLoaded" :source="source" :is-dash="isDash" :is-hls="isHls" />
    </div>
  </main>
</template>

<style>
.fc-widget-normal {
  @apply hidden!;
}

.plyr {
  @apply w-full h-full inset-0 absolute;
}
</style>
