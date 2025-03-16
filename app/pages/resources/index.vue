<script setup lang="ts">
// @ts-expect-error yaml is not typed
import page from './resources.yml'

const { data: resourcesDir } = await useAsyncData('resourcesDir', async () => {
  return queryCollection('resources')
    .where('extension', '=', 'yml')
    .select('title', 'icon', 'meta', 'path')
    .all()
})

const resourcesCategories = computed(() => {
  return resourcesDir.value.map((item: any) => {
    const category = item.path.replace('/.navigation', '').replace('/resources', '').replace('/', '')
    return {
      ...item,
      category,
    }
  })
})

const route = useRoute()
const router = useRouter()
const filter = ref(route.query.categoryId || '')
const tag = ref(route.query.tagId || '')

const { ignoreUpdates } = watchIgnorable(filter, (value) => {
  router.push({ query: { categoryId: value || undefined } })
})

watch(() => route.query.categoryId, (value) => {
  ignoreUpdates(() => {
    filter.value = value || ''
  })
})

const { ignoreUpdates: ignoreTagUpdates } = watchIgnorable(tag, (value) => {
  router.push({ query: { tagId: value || undefined } })
})

watch(() => route.query.tagId, (value) => {
  ignoreTagUpdates(() => {
    tag.value = value || ''
  })
})

const appConfig = useAppConfig()
const tags = computed(() => appConfig.tags)

const { data: _resources } = await useAsyncData('resources', async () => {
  return queryCollection('resources')
    .where('extension', '=', 'md')
    .where('path', 'LIKE', `%${filter.value ? '/' + filter.value + '/' : ''}%`)
    .select('title', 'date', 'image', 'description', 'path', 'authors', 'tag', 'media')
    .order('date', 'DESC')
    .all()
}, {
  watch: [filter, tag],
  immediate: true,
})

const resources = computed(() => {
  return _resources.value.map((item: any) => {
    const category = item.path.split('/')[2]
    const categoryItem = resourcesCategories.value.find((item: any) => item.category === category)
    return {
      ...item,
      isDatasheet: item.path.includes('/datasheets/'),
      category: categoryItem?.title,
    }
  })
})

useHead({
  link: [
    { rel: 'alternate', type: 'application/rss+xml', title: 'SigmaStreaming Blog', href: '/blog/feed.xml' },
  ],
})
useSeoMeta({
  titleTemplate: '%s',
  title: page.title,
  description: page.description,
  ogDescription: page.description,
  ogTitle: `${page.title} · Sigma Streaming`,
})
defineOgImageComponent('Resources', {
  title: 'Resources',
})

const localePath = useLocalePath()

function handleClick(item: any) {
  if (!item.meta?.redirect) {
    filter.value = item.category
  }
}
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UPageAside>
          <div class="pt-12">
            <h3 class="text-lg font-semibold">
              Categories
            </h3>

            <div class="grid mt-4 gap-2">
              <UButton
                v-for="item in resourcesCategories"
                :key="item.path"
                variant="soft"
                :color="filter === item.category ? 'primary' : 'neutral'"
                :to="item.meta?.redirect"
                v-bind="$attrs"
                :target="item.meta.redirect?.startsWith('https://') ? '_blank' : '_self'"
                class="rounded-xl px-3 py-2 hover:bg-(--ui-primary)/10 hover:text-(--ui-primary)"
                @click="handleClick(item)"
              >
                <div class="flex items-center gap-2">
                  <UIcon
                    :name="item.icon"
                    class="size-5"
                  />
                  <div>{{ item.title === 'Resources' ? 'All Resources' : item.title }}</div>
                </div>
              </UButton>
            </div>

            <hr class="my-5 h-[1px] border-0 bg-gray-200 dark:bg-gray-700">

            <!-- <template v-if="tags?.length">
              <h3 class="text-lg font-600">
                Tags
              </h3>

              <div
                v-if="tags?.length"
                class="mt-4 flex flex-wrap gap-2"
              >
                <TagItem
                  v-for="(item, index) in tags"
                  :key="index"
                  :active="tag === item.slug"
                  :color="item.color"
                  :to="localePath(`/resources?tag=${item.slug}`)"
                >
                  {{ item.name }}
                </TagItem>
              </div>
            </template> -->
          </div>
        </UPageAside>
      </template>
      <UPageHeader
        :title="page.title"
        :description="page.description"
        class="mt-12"
        :ui="{ root: 'z-10' }"
      />

      <template v-if="resources?.length">
        <UBlogPosts class="mb-12">
          <UBlogPost
            v-for="item in resources"
            :key="item.path"
            :description="item.description"
            :to="item.isDatasheet ? item.media : item.path"
            :title="item.title"
            :target="item.isDatasheet ? '_blank' : '_self'"
            :image="{ src: item.image, width: 592, height: 333, placeholder: [59, 33, 50, 4], format: 'webp' }"
            :date="formatDateByLocale('en', item.date)"
            :authors="item.authors"
            :badge="{ label: item.category, color: 'neutral', variant: 'subtle' }"
          >
            <template
              v-if="item.isDatasheet"
              #authors
            >
              <a
                variant="link"
                class="relative z-10 text-sm flex items-center text-(--ui-primary) font-medium hover:underline"
                :download="item.media"
                :href="item.media"
                target="_self"
              >
                Download
                <UIcon
                  name="i-ri:arrow-right-line"
                  class="ml-1 size-[16px]"
                />
              </a>
            </template>
          </UBlogPost>
        </UBlogPosts>
      </template>
      <template v-else>
        <div class="flex flex-col items-center justify-center py-16 text-center">
          <UIcon
            name="i-heroicons-document-magnifying-glass"
            class="mb-4 text-gray-400 dark:text-gray-600 size-16"
          />
          <h3 class="text-xl font-semibold mb-2">
            No resources found
          </h3>
          <p class="text-gray-500 dark:text-gray-400 max-w-md mb-6">
            There are no resources matching your current filters. Try changing your category or removing filters.
          </p>
          <UButton
            v-if="filter || tag"
            color="primary"
            variant="soft"
            @click="() => { filter = ''; tag = ''; }"
          >
            Clear filters
          </UButton>
        </div>
      </template>
    </UPage>
  </UContainer>
</template>
