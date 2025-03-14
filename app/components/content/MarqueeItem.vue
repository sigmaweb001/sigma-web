<script lang="ts" setup>
const props = defineProps<{
  img: string
}>()

const { img } = toRefs(props)
</script>

<template>
  <img
    v-if="img"
    :src="img"
    class="mx-[24px] my-[24px] max-h-[64px] object-scale-down"
  >
</template>
