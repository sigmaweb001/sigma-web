<script lang="ts" setup>
import { joinURL } from 'ufo'

useHead({
  title: 'Resources',
})
const localPath = useLocalePath()
const _categories = computed(() => [
  {
    title: 'All resources',
    icon: 'i-ri:article-line',
    to: localPath({
      path: '/resources',
      query: useRoute().query,
    }),

  },
  {
    title: 'Blog articles',
    icon: 'i-ri:file-list-3-line',
    to: localPath({
      path: '/resources/blog',
      query: useRoute().query,
    }),
  },
  {
    title: 'eBooks & download',
    icon: 'i-ri:book-open-line',
    to: localPath({
      path: '/resources/resource',
      query: useRoute().query,
    }),
  },
])

const { data: categories } = await useSanityData(allCategoryQuery)

function toSlug(slug: string) {
  return localPath({
    path: joinURL('/resources', 'tags', slug),
    query: useRoute().query,
  })
}

function getIcon(data: any) {
  const encodedSvg = encodeURIComponent(data.svg)
  const imgSrc = `url(data:image/svg+xml;utf8,${encodedSvg})`
  return imgSrc
}
</script>

<template>
  <div class="">
    <h1 class="py-5 text-center text-4xl font-bold dark:text-white">
      All Resources
    </h1>
    <div class="flex">
      <div class="min-w-3 flex-shrink-0 px-10 py-5">
        <h3 class="text-lg font-600">
          Categories
        </h3>
        <div class="grid mx--2 mt-4 gap-2">
          <NuxtLink
            v-for="item in categories" :key="item.to" exact-active-class="text-primary" :to="item.to"
            class="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 hover:bg-primary/10 hover:text-primary"
          >
            <div class="flex items-center gap-2">
              <div class="i-ri:arrow-right-line" :style="{ '--un-icon': getIcon(item.icon) }" />
              <!-- <p v-html="getIcon(item.icon)" /> -->
              <p>{{ item.title }}</p>
            </div>
            <div class="i-ri:arrow-right-line" />
          </NuxtLink>
        </div>

        <hr class="my-5">

        <template v-if="categories?.length">
          <h3 class="text-lg font-600">
            Tags
          </h3>

          <div v-if="categories?.length" class="mt-4 flex flex-wrap gap-2">
            <template v-for="(category, index) in tags" :key="index">
              <BlogsLabel class="text-12px !px-2 !py-1" :color="category.color" :to="toSlug(category.slug.current)">
                {{ category.title }}
              </BlogsLabel>
            </template>
          </div>
        </template>
      </div>
      <div class="grid mt-10 gap-6 px-6 md:grid-cols-3 lg:gap-6">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
