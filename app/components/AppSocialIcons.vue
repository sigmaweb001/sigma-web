<script setup lang="ts">
const icons = computed(() => [
  {
    name: 'facebook',
    href: 'https://www.facebook.com/sigma-streaming',
    label: 'Facebook',
    icon: 'i-simple-icons-facebook',
  },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/in/sigma-streaming',
    label: 'LinkedIn',
    icon: 'i-simple-icons-linkedin',
  },
  {
    name: 'github',
    href: 'https://www.github.com/sigma-streaming',
    label: 'GitHub',
    icon: 'i-simple-icons-github',
  },
])
</script>

<template>
  <UButton
    v-for="icon in icons"
    :key="icon.label"
    :icon="icon.icon"
    variant="link"
    color="neutral"
    rel="noopener noreferrer"
    :title="icon.label"
    :aria-label="icon.label"
    :to="icon.href"
    target="_blank"
  />
</template>
