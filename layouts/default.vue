<script setup lang="ts">
useHead({
  titleTemplate: `%s · ${appName}`,
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
</script>

<template>
  <AppNavbar/>
  <slot />
  <SectionFooter />

</template>
