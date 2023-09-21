<script lang="ts" setup>
useHead({
  title: 'Home',
})

const { data } = await useSanityData(getPageQuery(), { slug: '/' })
</script>

<template>
  <SModules :modules="data?.modules" />
  <!-- <SectionVideo /> -->
  <!-- <SectionTestimonials /> -->
  <!-- <SectionFaq /> -->
</template>
