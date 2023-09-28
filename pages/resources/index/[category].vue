<script lang="ts" setup>
const slug = eagerComputed(() => useRoute().params.category)

const { data } = await useSanityData(resourceByCategoryQuery, { slug: slug.value })
</script>

<template>
  <ResourceBlogList :data="data" />
</template>
