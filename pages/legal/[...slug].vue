<script setup lang="ts">
const route = useRoute()
const slug = computed(() => `/legal/${route.params.slug}`)
const { locale } = useI18n()

const { data: item } = await useAsyncData(`legal-content-item${slug.value}`, () => queryContentLocale('legal').where({
  _path: {
    $eq: slug.value,
  },
}).findOne(), { watch: [slug, locale] })
const links = computed(() => item.value?.body.toc.links)
const legelLinks = useLegalLinks()
syncRef(links, legelLinks, { direction: 'ltr' })
</script>

<template>
  <ContentDoc />
</template>
