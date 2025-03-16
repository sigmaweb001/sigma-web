<script setup lang="ts">
import mediumZoom from 'medium-zoom'

definePageMeta({
  layout: 'products',
  primary: 'orange',
  heroBackground: 'opacity-30',
})

const route = useRoute()
const { seo } = useAppConfig()
const { locale } = useI18n()

const { data: page } = await useAsyncData(route.path,
  () => queryCollection(withLocaleCollection('products', locale)).path(route.path).first(),
  { watch: [locale] },
)
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

defineOgImageComponent('Products', {
  category: 'Products',
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
