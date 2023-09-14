<script lang="ts" setup>
import speakingurl from 'speakingurl'

const slot = useSlots()
// const slug = speakingurl(slot)
const atts = useAttrs()
console.log('[LOG] ~ file: H2.vue:7 ~ atts:', atts)
</script>

<template>
  <h2 :id="slug" class="group">
    <slot />
    <!-- <Anchor :slug="slug" /> -->
  </h2>
</template>
