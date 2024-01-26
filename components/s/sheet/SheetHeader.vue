<script setup lang="ts">
const props = defineProps<{ class?: string }>()
</script>

<template>
  <div class="flex flex-col text-center space-y-2 sm:text-left">
    <slot />
  </div>
</template>
