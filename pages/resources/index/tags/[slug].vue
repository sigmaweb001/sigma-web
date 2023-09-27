<script lang="ts" setup>
const slug = eagerComputed(() => useRoute().params.slug)

const { data } = await useSanityData(allResourceListByTagQuery, { slug: slug.value })
</script>

<template>
  <ResourceBlogList :data="data" />
</template>
