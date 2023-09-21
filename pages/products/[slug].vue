<script lang="ts" setup>
useHead({
  title: 'Home',
})
const slug = eagerComputed(() => useRoute().params.slug)

const { data } = await useSanityData(getPageQuery(), { slug })
</script>

<template>
  <SModules :modules="data?.modules" />
</template>
