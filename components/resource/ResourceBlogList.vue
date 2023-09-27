<script lang="ts" setup>
const { data } = definePropsRefs<{
  data: any[]
}>()
</script>

<template>
  <template v-for="item in data" :key="item._id">
    <ResourceItem v-if="item._type === 'resource'" :item="item" />
    <BlogsItem v-if="item._type === 'blog'" :post="item" aspect="landscape" />
  </template>
</template>
