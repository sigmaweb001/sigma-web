<script setup lang="ts">
import mediumZoom from 'medium-zoom'

definePageMeta({
  layout: 'products',
  primary: 'orange',
  heroBackground: 'opacity-30',
})

const { seo } = useAppConfig()

useSeoMeta({
  titleTemplate: `%s · ${seo?.siteName}`,
  title: 'Contact us',
  ogTitle: `Contact us · ${seo?.siteName}`,
  description: 'Contact us for inquiries, support, or collaboration.',
  ogDescription: 'Contact us for inquiries, support, or collaboration.',
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
  <UPage>
    <UPageBody
      prose
      class="pb-0"
    >
      <SectionContact>
        <template #title>
          WHY SIGMA STREAMING
        </template>
        <template #subtitle>
          Sigma Streaming gives you complete end-to-end assistance and the best solution for your OTT platform.
        </template>
        <template #image>
          <img
            src="/Group_1321314848.png"
            alt="Sigma Streaming"
          >
        </template>

        <template #default>
          <ListItem
            icon="carbon:radio"
            size="small"
          >
            <template #title>
              Empower your stream
            </template>
            <template #subtitle>
              Transcode, Interact, Monetize. Experience the future.
            </template>
          </ListItem>

          <ListItem
            icon="carbon:flow-stream"
            size="small"
          >
            <template #title>
              Stream seamlessly
            </template>
            <template #subtitle>
              Reliable, flawless live event streaming with top-tier CDNs.
            </template>
          </ListItem>

          <ListItem
            icon="carbon:document-video"
            size="small"
          >
            <template #title>
              Interact and Monetize
            </template>
            <template #subtitle>
              Boost your revenue by monetizing video with us.
            </template>
          </ListItem>

          <ListItem
            icon="carbon:content-view"
            size="small"
          >
            <template #title>
              Elevate your content
            </template>
            <template #subtitle>
              Elevate your content effortlessly and leave a lasting impression
            </template>
          </ListItem>
        </template>
      </SectionContact>
    </UPageBody>
  </UPage>
</template>
