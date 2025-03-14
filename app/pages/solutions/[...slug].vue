<script setup lang="ts">
import mediumZoom from 'medium-zoom'

definePageMeta({
  layout: 'products',
  primary: 'orange',
  heroBackground: 'opacity-30',
})

const route = useRoute()
const { toc, seo } = useAppConfig()

const { data: page } = await useAsyncData(route.path, () => queryCollection('solutions').path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('products', route.path, {
    fields: ['description'],
  })
})

useSeoMeta({
  titleTemplate: `%s · ${seo?.siteName}`,
  title: page.value.title,
  ogTitle: `${page.value.title} · ${seo?.siteName}`,
  description: page.value.description,
  ogDescription: page.value.description,
})

defineOgImageComponent('Docs', {
  category: 'Docs',
})

onMounted(() => {
  mediumZoom('[data-zoom-src]', {
    margin: 5,
  })
})
</script>

<template>
  <UPage v-if="page">
    <UPageBody
      prose
      class="dark:text-gray-300 dark:prose-pre:!bg-gray-800/60 pb-0"
    >
      <ContentRenderer
        v-if="page.body"
        :value="page"
      />
    </UPageBody>
  </UPage>
</template>
