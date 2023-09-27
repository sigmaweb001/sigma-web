<script lang="ts" setup>
const slug = eagerComputed(() => useRoute().params.resourceSlug)

const resourceMap = {
  blog: blogResourceQuery,
  resource: resourceResourceQuery,
}
const { data } = await useSanityData(resourceMap[slug.value])
</script>

<template>
  <template v-for="item in data" :key="item._id">
    <ResourceItem v-if="item._type === 'resource'" :item="item" />
    <BlogsItem v-if="item._type === 'blog'" :post="item" aspect="landscape" />
  </template>
</template>
