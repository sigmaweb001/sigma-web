<script lang="ts" setup>
import { joinURL } from 'ufo'

const { locale } = useI18n()

const route = useRoute()
const slug = computed(() => joinURL('/resources', route.params.category ?? '', ...route.params.slug))
const { data: item } = await useAsyncData(`resource-content-blog${slug.value}`, () => queryContentLocale('resources').where({
  _path: {
    $eq: slug.value,
  },
}).findOne(), { watch: [locale] })

const appConfig = useAppConfig()
const date = computed(() => item.value.date ? useDateFormat(item.value.date, 'MMMM D, YYYY', { locales: 'en' }).value : '')
const author = computed(() => appConfig.authors.find(a => a.slug === item.value.author))

const links = computed(() => item.value?.body.toc.links)

const tags = computed(() => {
  if (!item.value)
    return []
  const _tags = appConfig.tags
  if (!item.value.tags)
    return []
  const itemTags = item.value.tags.split(',').map(item => item.trim())

  return itemTags.map((tag) => {
    const tagItem = _tags.find(item => item.slug === tag)
    if (tagItem)
      return tagItem

    return undefined
  }).filter(Boolean)
})

const localePath = useLocalePath()
</script>

<template>
  <main>
    <div class="mx-auto container">
      <div class="max-w-screen-xl py-5 container lg:py-8">
        <h1
          class="text-brand-primary mb-3 mt-2 text-3xl font-semibold tracking-tight lg:text-4xl dark:text-white lg:leading-snug"
        >
          {{ item?.title }}
        </h1>

        <div class="flex">
          <div v-if="tags?.length" class="mt-2 flex flex-wrap gap-2">
            <TagItem
              v-for="(item, index) in tags" :key="index" :color="item.color"
              :to="localePath(`/resources?tag=${item.slug}`)"
            >
              {{ item.name }}
            </TagItem>
          </div>
        </div>

        <div class="mt-3 flex text-gray-500 space-x-3">
          <div class="flex items-center gap-3">
            <div class="relative h-10 w-10 flex-shrink-0">
              <template v-if="author.avatar">
                <NuxtImg
                  :src="author.avatar" :alt="author.name"
                  class="absolute inset-0 h-full w-full rounded-full object-cover"
                />
              </template>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <div class="text-gray-800 dark:text-gray-400">
                by {{ author?.name }}
              </div>
              <div class="h-14px w-1px bg-border" />
              <span class="text-sm">{{ item?.readingTime?.text }}</span>
              <template v-if="date">
                <div class="h-14px w-1px bg-border" />
                <div>
                  Update on:
                  <time class="ml-1 text-gray-500 dark:text-gray-400">
                    {{ date }}
                  </time>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="mx-auto mt-14 max-w-screen-xl flex flex-col gap-5 px-5 md:flex-row">
        <article class="flex-1">
          <div class="my-3 max-w-85ch prose prose-trueGray dark:prose-invert">
            <slot />
          </div>
        </article>
        <div class="sticky top-[calc(var(--header-height))] w-full self-start md:w-256px">
          <div class="mt-5">
            <Toc class="border-border rounded-xl bg-background p-4 text-sm">
              <template #title>
                <div class="mx-4 mb-4 text-lg font-semibold">
                  Table of content
                </div>
              </template>

              <TocLinks v-slot="{ link }" class="ml-4" :links="links">
                <div class="my-2 block hover:underline">
                  {{ link.text }}
                </div>
              </TocLinks>
            </Toc>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
