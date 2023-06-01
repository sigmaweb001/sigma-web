<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
})


</script>

<template>
  <div class="w-full">
    <ButtonLink class="!w-full" :href="href" ghost :icon="icon" :class="[active ? 'active' : '']">
      {{ title }}
    </ButtonLink>
  </div>
</template>
