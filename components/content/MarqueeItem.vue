<script lang="ts" setup>
const { img } = definePropsRefs<{
  img: string
}>()
</script>

<template>
  <img v-if="img" :src="img" class="mx-24px my-24px max-h-64px object-scale-down">
</template>
