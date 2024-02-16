<script lang="ts" setup>
import { ensurePrefix } from '@antfu/utils'

const { item } = definePropsRefs<{
  item: any
  hideDir?: boolean
}>()
const media = computed(() => ensurePrefix('/', item.value.media))
const dirPath = computed(() => {
  const pathArr = item.value._path.split('/')
  return pathArr.slice(0, pathArr.length - 1).join('/')
})

const { locale } = useI18n()

const { data: dataDir } = await useAsyncData(`resources-dir-${dirPath.value}`, () => queryContentLocale('resources').where({
  $or: [
    {
      _path: {
        $eq: dirPath.value,
      },
    },
  ],
}).findOne(), { watch: [dirPath, locale] })
</script>

<template>
  <div class="flex flex-col gap-2 of-hidden rounded-12px bg-resource">
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

    <div v-if="!hideDir" class="px-3">
      <span class="inline rounded-xl bg-gray-200 px-2 py-1 text-xs font-500">
        {{ dataDir?.title }}
      </span>
    </div>
    <div class="h-50px px-3">
      <NuxtLink
        :to="media" external target="_blank"
        class="flex-1 text-lg font-semibold leading-snug tracking-tight dark:text-white"
      >
        <span
          class="transition-[background_size] line-clamp-2 cursor-pointer bg-[length:0px_10px] bg-gradient-to-r bg-left-bottom bg-no-repeat duration-500 hover:(text-primary underline)"
        >
          {{ item.title }}
        </span>
      </NuxtLink>
    </div>
    <div v-if="item.description" class="h-40px px-3">
      <span class="line-clamp-2 text-sm">
        {{ item.description }}
      </span>
    </div>

    <div class="flex flex-1 flex-col justify-end">
      <div class="mb-2 mt--2 px-3">
        <SButton as="a" variant="link" class="text-sm p-0!" :download="media" :href="`${media}`">
          Download
          <div class="i-ri:arrow-right-line ml-1 size-16px!" />
        </SButton>
      </div>
    </div>
  </div>
</template>
