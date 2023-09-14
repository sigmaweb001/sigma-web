<script lang="ts" setup>
const playVideo = ref(false)
</script>

<template>
  <div class="container">
    <div class="mx-auto mb-20 max-w-4xl w-full overflow-hidden rounded-2xl">
      <div
        class="relative aspect-ratio-16/9 cursor-pointer bg-indigo-300 from-purple-400 to-indigo-700 bg-gradient-to-tr"
        @click="playVideo = !playVideo"
      >
        <template v-if="!playVideo">
          <button class="absolute inset-auto left-1/2 top-1/2 h-28 w-28 transform text-white -translate-x-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-28 w-28"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Play Video</span>
          </button>
        </template>
        <template v-else>
          <iframe
            class="absolute inset-0 h-full w-full"
            src="https://www.youtube-nocookie.com/embed/aOq49euWnIo?controls=0&autoplay=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </template>
      </div>
    </div>
  </div>
</template>
