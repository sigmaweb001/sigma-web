<script lang="ts" setup>
definePageMeta({
  layout: false,
})
const isLoaded = ref(false)
const route = useRoute()
const source = route.query.source as string

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
  <main class="grid h-100dvh overflow-hidden">
    <div class="relative mx-auto w-full">
      <PlayVideoPlayer
        v-if="isLoaded"
        :source="source"
        :is-dash="isDash"
        :is-hls="isHls"
      />
    </div>
  </main>
</template>

<style>
html,
body,
#__nuxt {
  @apply overflow-hidden relative z-3147483600;
}

.fc-widget-normal {
  @apply hidden!;
}

.plyr {
  width: 100%;
  height: 100%;
  inset: 0;
  position: absolute;
}
</style>
