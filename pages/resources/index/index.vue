<script lang="ts" setup>
const { data, refresh } = await useSanityData(allResourceListQuery)
</script>

<template>
  <ResourceBlogList :data="data" />
</template>
