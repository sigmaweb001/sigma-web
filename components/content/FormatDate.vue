<script setup lang="ts">
defineProps({
  date: {
    type: Date,
    required: true
  },
})
</script>

<template>
  <time :title="date.toDateString()">
    {{ date.toLocaleDateString() }}
  </time>
</template>
