<script lang="ts" setup>
const { data } = definePropsRefs<{
  data: {
    content: string
  }
}>()
</script>

<template>
  <div class="my-10 gap-24px container">
    <SSanityContent :blocks="data.content" class="prose-img-w-full mx-auto max-w-75ch prose-gray" />
  </div>
</template>
