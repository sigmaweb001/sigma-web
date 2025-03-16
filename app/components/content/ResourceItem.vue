<script lang="ts" setup>
const props = defineProps<{
  path: string
}>()

const { path } = toRefs(props)
const { data } = await useAsyncData(
  `resources:${path.value}`,
  () => queryCollection('resources').where('path', '=', path.value).first(),
)

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

const item = computed(() => {
  const category = data.value?.path.split('/')[2]
  const categoryItem = resourcesCategories.value.find((item: any) => item.category === category)
  return {
    ...data.value,
    isDatasheet: data.value?.path.includes('/datasheets/'),
    category: categoryItem?.title,
  }
})
</script>

<template>
  <UBlogPost
    v-if="item"
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
  <div v-else>
    Not found: {{ path }}
  </div>
</template>
