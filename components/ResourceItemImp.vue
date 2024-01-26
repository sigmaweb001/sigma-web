<script lang="ts" setup>
import { ensurePrefix } from '@antfu/utils'

const { item } = definePropsRefs<{
  item: any
}>()
const media = computed(() => ensurePrefix('/', item.value.media))

const appConfig = useAppConfig()
const tags = computed(() => {
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
</script>

<template>
  <div class="group flex flex-col gap-2 bg-gray-100/75 dark:bg-gray-900/75">
    <NuxtLink :to="media" target="_blank" class="relative block aspect-16/9 of-hidden rounded-md transition-all duration-300 hover:scale-105">
      <template v-if="item?.thumbnail">
        <img :src="item.thumbnail" class="absolute inset-0 size-full object-cover">
      </template>
      <template v-else>
        <div class="absolute inset-0 size-full flex-center">
          <Icon :name="item.icon ?? 'i-ri:image-fill'" class="h-50% w-50% text-primary/75" />
        </div>
      </template>
    </NuxtLink>

    <div class="mt-2 px-3">
      <div v-if="tags?.length" class="mb-1 mt-1 flex flex-wrap gap-2">
        <TagItem v-for="(item, index) in tags" :key="index" :color="item.color">
          {{ item.name }}
        </TagItem>
      </div>
      <div class="flex justify-between">
        <NuxtLink
          :to="media" external target="_blank"
          class="mt-2 flex-1 text-lg font-semibold leading-snug tracking-tight dark:text-white"
        >
          <span
            class="transition-[background_size] line-clamp-2 cursor-pointer bg-[length:0px_10px] from-primary-300 to-primary-200 bg-gradient-to-r bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_10px] hover:bg-[length:100%_3px] dark:from-primary-600 dark:to-primary-700"
          >
            {{ item.title }}
          </span>
        </NuxtLink>
        <SButton class="flex-shrink-0" variant="outline" size="icon">
          <a class="i-ri:download-line text-14px" :download="media" :href="`${media}`" />
        </SButton>
      </div>
      <p v-if="item.description">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>
