<script lang="ts" setup>

</script>

<template>
  <div class="py-10 container">
    <div
      class="relative mx-auto w-full max-w-screen-lg flex flex-wrap items-center justify-between gap-5 overflow-hidden rounded-xl from-primary-400 to-primary-500 bg-gradient-to-r px-7 py-7 text-white lg:flex-nowrap lg:px-12 lg:py-12"
    >
      <div
        class="absolute bottom-3 left-3 z-1 h-24 w-24 rounded-full bg-white from-white to-primary-600 bg-gradient-to-b opacity-20"
      />
      <div
        class="absolute left-1/2 z-1 h-24 w-24 rounded-full bg-white from-white to-primary-600 bg-gradient-to-b opacity-20 -top-10"
      />
      <div class="relative z-0 flex-grow text-center lg:text-left">
        <div class="text-3xl text-white font-medium lg:text-3xl">
          <ContentSlot :use="$slots.title" unwrap="p" />
        </div>
        <div class="mt-2 text-white text-opacity-80 lg:text-xl">
          <ContentSlot :use="$slots.subtitle" unwrap="p" />
        </div>
      </div>

      <div class="relative w-full flex flex-shrink-0 gap-2 text-center lg:w-auto">
        <ContentSlot :use="$slots.default" unwrap="p" />
      </div>
    </div>
  </div>
</template>
