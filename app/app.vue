<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
const { seo } = useAppConfig()
const { isLoading } = useLoadingIndicator()
const colorMode = useColorMode()
colorMode.forced = true

const primary = (route.meta?.primary as string) || 'orange'
appConfig.ui.colors.primary = primary
watch(() => route.meta?.primary, (primary: string) => {
  setTimeout(() => {
    appConfig.ui.colors.primary = primary || 'orange'
  }, 40)
})
const heroBackgroundClass = computed(() => route.meta?.heroBackground || '')

const appear = ref(false)
const appeared = ref(false)

const { data: navigation } = await useAsyncData('navigation', () => {
  return Promise.all([
    queryCollectionNavigation('products', ['description', 'icon', 'path']),
    queryCollectionNavigation('engines', ['description', 'icon', 'path']),
    queryCollectionNavigation('solutions', ['description', 'icon', 'path']),
    queryCollectionNavigation('resources', ['description', 'icon', 'path']),
    queryCollectionNavigation('legal', ['description', 'icon', 'path']),
    queryCollectionNavigation('blog'),
  ])
}, {
  transform: data => data.flat(),
})
const { data: files } = useLazyAsyncData('search', () => {
  return Promise.all([
    queryCollectionSearchSections('products'),
    queryCollectionSearchSections('engines'),
    queryCollectionSearchSections('solutions'),
    queryCollectionSearchSections('resources'),
    queryCollectionSearchSections('legal'),
    queryCollectionSearchSections('blog'),
  ])
}, {
  server: false,
  transform: data => data.flat(),
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

useSeoMeta({
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image',
  titleTemplate(title) {
    return title?.includes('SigmaStreaming') ? title : `${title} · SigmaStreaming`
  },
})

provide('navigation', navigation)

onMounted(() => {
  setTimeout(() => {
    appear.value = true
    setTimeout(() => {
      appeared.value = true
    }, 1000)
  }, 0)
})
</script>

<template>
  <UApp>
    <AppHeader />
    <UMain class="relative">
      <HeroBackground
        class="absolute w-full -top-px transition-all text-(--ui-primary) shrink-0 -z-10 print:hidden"
        :class="[
          isLoading ? 'animate-pulse' : (appear ? heroBackgroundClass : 'opacity-0'),
          appeared ? 'duration-[400ms]' : 'duration-1000',
        ]"
      />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        :links="[]"
      />
    </ClientOnly>
  </UApp>
</template>

<style>
h1,
h2,
h3,
h4,
h5,
h6,
.text-h1,
.text-h2,
.text-h3,
.text-h4,
.text-h5,
.text-h6 {
  @apply scroll-mt-[calc(var(--header-height)+48px)] text-balance leading-[1.25];
}

p {
  @apply text-pretty;
}

h1 > a,
h2 > a,
h3 > a,
h4 > a,
h5 > a,
h6 > a {
  @apply block;
  text-decoration: none !important;
}

em {
  @apply text-(--ui-primary) not-italic;
}

/*
h1 {
  @apply text-4xl lg:text-5xl xl:text-6xl;
}

h2 {
  @apply text-4xl lg:text-5xl;
}

h3 {
  @apply text-3xl lg:text-4xl;
}

h4 {
  @apply text-2xl lg:text-3xl;
}

h5 {
  @apply text-xl lg:text-2xl;
}

h6 {
  @apply text-lg lg:text-xl;
}

p,
pre {
  @apply my-1em mx-0 leading-[1.75];
}

b,
strong {
  @apply font-600;
}

section {
  @apply mx-auto container my-6 xl:my-8;
}

[center='true'] {
  @apply block text-center;
}

[left='true'] {
  @apply block text-left;
}

[right='true'] {
  @apply block text-right;
} */

.fc_frame {
  @print:hidden;
}
</style>
