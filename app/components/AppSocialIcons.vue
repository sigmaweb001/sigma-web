<script setup lang="ts">
import general from '~~/content/general.yml'
</script>

<template>
  <UButton
    v-for="icon in general.socials"
    :key="icon.label"
    :icon="icon.icon"
    variant="link"
    color="neutral"
    rel="noopener noreferrer"
    :title="icon.label"
    :aria-label="icon.label"
    :to="icon.to"
    target="_blank"
  />
</template>
