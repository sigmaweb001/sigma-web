<script lang="ts" setup>
import { ensurePrefix } from '@antfu/utils'

const { item } = definePropsRefs<{
  item: any
}>()
const media = computed(() => ensurePrefix('/', item.value.media))
const dirPath = computed(() => {
  const pathArr = item.value._path.split('/')
  return pathArr.slice(0, pathArr.length - 1).join('/')
})

const { data: dataDir } = await useAsyncData(`resources-dir-${dirPath.value}`, () => queryContent('resources').where({
  $or: [
    {
      _path: {
        $eq: dirPath.value,
      },
    },
  ],
}).findOne(), { watch: [dirPath] })
</script>

<template>
  <div class="grid gap-2 of-hidden rounded-12px bg-gray-100/75 dark:bg-gray-900/75">
    <NuxtLink :to="media" target="_blank" class="relative block aspect-16/9 of-hidden rounded-12px bg-gray-200 transition-all duration-300 hover:scale-105">
      <template v-if="item?.thumbnail">
        <img :src="item.thumbnail" class="absolute inset-0 size-full object-cover">
      </template>
      <template v-else>
        <div class="absolute inset-0 size-full flex-center">
          <Icon :name="item.icon ?? 'i-ri:image-fill'" class="h-50% w-50% text-primary/75" />
        </div>
      </template>
    </NuxtLink>

    <div class="px-3">
      <span class="inline rounded-xl bg-gray-200 px-2 py-1 text-xs font-500">
        {{ dataDir?.title }}
      </span>
    </div>
    <div class="px-3">
      <NuxtLink
        :to="media" external target="_blank"
        class="flex-1 text-lg font-semibold leading-snug tracking-tight dark:text-white"
      >
        <span
          class="transition-[background_size] line-clamp-1 cursor-pointer bg-[length:0px_10px] bg-gradient-to-r bg-left-bottom bg-no-repeat duration-500 hover:(text-primary underline)"
        >
          {{ item.title }}
        </span>
      </NuxtLink>
    </div>
    <div v-if="item.description" class="px-3">
      <span class="line-clamp-3 text-sm">
        {{ item.description }}
      </span>
    </div>
    <div class="mb-2 px-3">
      <SButton as="a" variant="link" class="text-sm p-0!" :download="media" :href="`${media}`">
        Download
        <div class="i-ri:arrow-right-line ml-1 size-16px!" />
      </SButton>
    </div>
  </div>
</template>
