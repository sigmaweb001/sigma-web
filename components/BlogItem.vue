<script lang="ts" setup>
const { item } = definePropsRefs<{
  item: any
  hideAuthor?: boolean
  hideDir?: boolean
}>()

const appConfig = useAppConfig()

const author = computed(() => appConfig.authors.find(a => a.slug === item.value.author))
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

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <div class="grid gap-2 of-hidden bg-resource">
    <NuxtLink :to="item._path" target="_blank" class="relative block aspect-16/9 of-hidden rounded-12px bg-gray-200 transition-all duration-300 hover:scale-105">
      <template v-if="item?.thumbnail">
        <img :src="item.thumbnail" class="absolute inset-0 size-full object-cover">
      </template>
      <template v-else>
        <div class="absolute inset-0 size-full flex-center">
          <Icon :name="item.icon ?? 'i-ri:image-fill'" class="h-50% w-50% text-primary/75" />
        </div>
      </template>
    </NuxtLink>
    <div v-if="hideDir" class="px-3">
      <span class="inline rounded-xl bg-gray-200 px-2 py-1 text-xs font-500">
        {{ dataDir?.title }}
      </span>
    </div>

    <div class="px-3">
      <NuxtLink
        :to="item._path" external target="_blank"
        class="flex-1 text-lg font-semibold leading-snug tracking-tight dark:text-white"
      >
        <span
          class="transition-[background_size] line-clamp-2 cursor-pointer bg-[length:0px_10px] bg-gradient-to-r bg-left-bottom bg-no-repeat duration-500 hover:(text-primary underline)"
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
    <div v-if="author && !hideAuthor" class="w-full flex items-center justify-between gap-3 px-3">
      <div class="flex flex-grow items-center gap-2">
        <div class="relative h-32px w-32px flex-shrink-0">
          <NuxtImg
            class="absolute inset-0 h-full w-full rounded-full object-cover" :src="author.avatar"
            :alt="author.slug"
          />
        </div>
        <span class="line-clamp-1 max-w-1/2 min-w-0 text-sm">
          {{ author.name }}
        </span>
      </div>
      <p v-if="author.title" class="line-clamp-1 my-0 max-w-1/4 min-w-0 text-xs">
        {{ author.title }}
      </p>
    </div>
    <div class="mb-2 mt--2 flex items-end justify-between px-3">
      <SButton :as="NuxtLink" variant="link" class="text-sm p-0!" :to="item._path">
        Read more
        <div class="i-ri:arrow-right-line ml-1 size-16px!" />
      </SButton>
    </div>
  </div>
</template>
