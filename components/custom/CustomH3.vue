<script lang="ts" setup>
const slot = useSlots()
console.log('[LOG] ~ file: H1.vue:3 ~ slot:', slot)
// const slug = speakingurl(slot)
</script>

<template>
  <h3 :id="slug" class="group">
    <slot />
    <!-- <Anchor :slug="slug" /> -->
  </h3>
</template>
