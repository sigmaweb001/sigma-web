<script lang="ts" setup>
import { withQuery } from 'ufo'

definePageMeta({
  layout: false,
})
const isLoaded = ref(false)
const source = computed(() => useRoute().query.source as string)
const name = computed(() => useRoute().query.name as string)
const tags = computed(() => useRoute().query.tags as string[])
const category = computed(() => useRoute().query.category as string)

const url = withQuery('http://localhost:7777/play', {
  source: 'https://minio-dev.sigma.video:9000/for-test/sigma-asset/349405fa-26e2-4da2-b80b-12f08640e155/source.mp4',
  name: 'Hello Name',
  tags: ['tag1', 'tag2'],
  category: 'Hello Category',
})
console.log('[LOG] ~ url:', url)

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
    <div class="mx-auto of-hidden p-4">
      <div class="grid grid-cols-3 mb-3">
        <div class="col-span-2">
          <h1 class="text-xl font-bold">
            {{ name }}
          </h1>
          <div class="mt-1 flex space-x-2">
            <span class="text-sm text-secondary-foreground"> <strong>Tags:</strong> {{ tags.join(', ') }}</span>
            <span class="text-sm text-secondary-foreground">•</span>
            <span class="text-sm text-secondary-foreground"> <strong>Category:</strong> {{ category }}</span>
          </div>
        </div>
      </div>
      <div class="of-hidden rounded-xl">
        <PlayVideoPlayer v-if="isLoaded" :source="source" :is-dash="isDash" :is-hls="isHls" />
      </div>
    </div>
  </main>
</template>
