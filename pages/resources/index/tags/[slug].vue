<script lang="ts" setup>
const slug = eagerComputed(() => useRoute().params.slug)

const { data } = await useSanityData(resourceByTagQuery, { slug: slug.value })
</script>

<template>
  <ResourceBlogList :data="data" />
</template>
