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

const url = withQuery('http://localhost:7777/play', {
  source: 'https://minio-dev.sigma.video:9000/for-test/sigma-asset/349405fa-26e2-4da2-b80b-12f08640e155/source.mp4',
  name: 'Hello Name',
  tags: ['tag1', 'tag2'],
  category: 'Hello Category',
})
// console.log('[LOG] ~ url:', url)

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
  <main class="grid grid-rows-[auto_1fr_auto] h-100dvh of-hidden">
    <PlayNavbar />

    <div class="relative mx-auto w-full">
      <PlayVideoPlayer v-if="isLoaded" :source="source" :is-dash="isDash" :is-hls="isHls" />
    </div>

    <div class="grid grid-cols-3 mb-3 px-4 py-4">
      <div class="col-span-2">
        <h1 v-if="name" class="text-xl font-bold">
          {{ name }}
        </h1>
        <div class="mt-1 flex gap-4 space-x-2">
          <span v-if="tags" class="text-sm text-secondary-foreground"> <strong>Tags:</strong> {{ tags?.join(', ') }}</span>
          <span v-if="category" class="text-sm text-secondary-foreground"> <strong>Category:</strong> {{ category }}</span>
        </div>
      </div>
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
