<script lang="ts" setup>
definePropsRefs<{ image: string; name: string; title: string }>()
</script>

<template>
  <div class="mt-8 flex items-center space-x-3">
    <div class="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
      <img
        :src="image"
        width="40"
        height="40"
        alt="Avatar"
        layout="responsive"
        placeholder="blur"
      >
    </div>
    <div>
      <div class="text-lg font-medium">
        {{ name }}
      </div>
      <div class="text-gray-600 dark:text-gray-400">
        {{ title }}
      </div>
    </div>
  </div>
</template>
