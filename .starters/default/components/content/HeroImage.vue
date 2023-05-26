<script lang="ts" setup>

</script>

<template>
  <div>
    <img class="rounded-xl hero-image" alt="Hero Image" src="/hero-support.png" />
  </div>
</template>

<style scoped>
.hero-image {
  opacity: 0;
  animation: enter-opacity 750ms forwards 500ms $dt('ease.expo.inOut');
}

@keyframes enter-opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
