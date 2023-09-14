<script lang="ts" setup>
const slot = useSlots()
// const slug = speakingurl(slot)
</script>

<template>
  <h4 :id="slug" class="group">
    <slot />
    <!-- <Anchor :slug="slug" /> -->
  </h4>
</template>
