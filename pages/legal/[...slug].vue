<script setup lang="ts">
const route = useRoute()
const slug = computed(() => `/legal/${route.params.slug}`)
const { data: item } = await useAsyncData(`legal-content-item${slug.value}`, () => queryContent('legal').where({
  _path: {
    $eq: slug.value,
  },
}).findOne(), { watch: [slug] })
const links = computed(() => item.value?.body.toc.links)
const legelLinks = useLegalLinks()
syncRef(links, legelLinks, { direction: 'ltr' })
</script>

<template>
  <ContentDoc />
</template>
