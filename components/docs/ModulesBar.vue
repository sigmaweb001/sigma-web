<script setup lang="ts">
const props = defineProps({
  currentPageId: {
    type: String,
    required: true,
  },
})
const route = useRoute()

</script>

<template>
  <div class="sticky top-[64px] z-10">

    <div class="hidden md:grid dark:bg-$color-primary-900 w-full py-17px place-items-center"
      style="backdrop-filter: var(--elements-backdrop-filter)">
      <div class="grid max-w-screen-xl mx-auto justify-items-stretch">
        <DocumentNav />
      </div>
    </div>
  </div>
</template>
