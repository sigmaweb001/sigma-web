<script lang="ts" setup>
import speakingurl from 'speakingurl'

const slot = useSlots()
// const slug = speakingurl(slot)
const atts = useAttrs()
</script>

<template>
  <h1 :id="slug" class="group">
    <slot />
    <!-- <Anchor :slug="slug" /> -->
  </h1>
</template>
