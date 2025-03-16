<script setup lang="ts">
definePageMeta({
  layout: 'products',
  primary: 'orange',
  heroBackground: 'opacity-30',
})

const { seo } = useAppConfig()

const { data: page } = await useAsyncData('pricings-cloud', () => queryCollection('pricings').path('/pricings/cloud').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  titleTemplate: `%s · ${seo?.siteName}`,
  title: page.value.title,
  ogTitle: `${page.value.title} · ${seo?.siteName}`,
  description: page.value.description,
  ogDescription: page.value.description,
})

defineOgImageComponent('Pricing', {
  category: 'Pricing',
})
</script>

<template>
  <UPage v-if="page">
    <ContentRenderer
      v-if="page.body"
      :value="page"
    />
  </UPage>
</template>
