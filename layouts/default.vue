<script setup lang="ts">
useHead({
  titleTemplate: '%s · Sigma Streaming',
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
</script>

<template>
  <main>
    <AppNavbar />
    <slot />
    <AppFooter />
  </main>
</template>
