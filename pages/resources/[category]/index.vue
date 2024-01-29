<script lang="ts" setup>
import type { QueryBuilderWhere } from '@nuxt/content/dist/runtime/types'
import { joinURL } from 'ufo'

const route = useRoute()

const slug = computed(() => {
  const path = joinURL(`/resources`, route.params.category)
  return path || ''
})

const tag = computed(() => useRoute().query.tag)

const query = computed<QueryBuilderWhere>(() => {
  if (tag.value) {
    return {
      tags: { $contains: [tag.value] },
    }
  }
  else {
    return {
      $and: [
        { _dir: { $ne: 'resources' } },
        { _dir: { $ne: '' } },
      ],
    }
  }
})
const { data: dataDir } = await useAsyncData('resources-dir', () => queryContent('resources').where({
  $or: [
    {
      _path: {
        $eq: slug.value,
      },
    },
  ],
}).findOne(), { watch: [slug] })

const { data: dataResources } = await useAsyncData(`resources-list-content:${route.params.slug || 'root'}`, () => queryContent(slug.value)
  .where(query.value).find(), { watch: [tag, () => route.params.slug] })
</script>

<template>
  <div>
    <NuxtLayout name="resources">
      <h1 class="py-10 text-center text-4xl font-bold dark:text-white">
        {{ dataDir?.title }} <span v-if="tag">({{ tag }})</span>
      </h1>
      <template v-if="!dataResources?.length">
        <div class="col-span-3 flex-center flex-col py-10">
          <div class="i-ri:box-1-line text-30px" />
          <h2 class="mt-4 text-center text-2xl font-bold dark:text-white">
            No data
          </h2>
        </div>
      </template>
      <div v-else class="mt-5 gap-6 px-6 lg:columns-2 xl:columns-3 lg:gap-4 xl:gap-6">
        <template v-for=" item in dataResources " :key="item._path">
          <ResourceItemImp v-if="item.type === 'resource'" class="mb-6" :item="item" />
          <BlogItem v-else class="mb-6" :item="item" />
        </template>
      </div>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
