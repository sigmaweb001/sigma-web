<script lang="ts" setup>
const { data, refresh, pending } = await useSanityData(allResourceListQuery)
</script>

<template>
  <ResourceBlogList title="All resources" :data="data" :loading="pending" />
</template>
