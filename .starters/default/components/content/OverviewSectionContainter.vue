<script lang="ts" setup>
defineProps({
  title: String,
  secondary: Boolean,
  aos: String
})
</script>

<template>
  <section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4 place-content-stretch">
      <ContentSlot :use="$slots.default" unwrap="div" />
    </div>
  </section>
</template>
