<script lang="ts" setup>
useHead({
  titleTemplate: '%s · Sigma Streaming',
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})

const { data: dataResourcesDir } = await useAsyncData('resources-list-dir', () => queryContent('resources').where({
  $or: [
    {
      _dir: {
        $eq: 'resources',
      },
    },
    {
      _dir: {
        $eq: '',
      },
    },
  ],
}).find())

const appConfig = useAppConfig()
const tags = computed(() => appConfig.tags)
const localePath = useLocalePath()

const tag = computed(() => useRoute().query.tag)
</script>

<template>
  <main>
    <div class="flex container">
      <div class="sticky top-[calc(var(--header-height))] mt-120px w-240px py-5 pr-10">
        <h3 class="text-lg font-600">
          Categories
        </h3>
        <div class="grid mx--2 mt-4 gap-2">
          <NuxtLink
            v-for="item in dataResourcesDir" :key="item.to" exact-active-class="text-primary font-bold"
            :to="item.redirect || localePath(item._path)" v-bind="$attrs"
            :target="item.redirect?.startsWith('https://') ? '_blank' : '_self'"
            class="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 hover:bg-primary/10 hover:text-primary"
          >
            <div class="flex items-center gap-2">
              <Icon :name="item.icon" class="size-5" />
              <div>{{ item.title }}</div>
            </div>
            <div class="i-ri:arrow-right-line" />
          </NuxtLink>
        </div>

        <hr class="my-5 h-px border-0 bg-gray-200 dark:bg-gray-700">

        <template v-if="tags?.length">
          <h3 class="text-lg font-600">
            Tags
          </h3>

          <div v-if="tags?.length" class="mt-4 flex flex-wrap gap-2">
            <TagItem
              v-for="(item, index) in tags"
              :key="index" :active="tag === item.slug" :color="item.color"
              :to="localePath(`/resources?tag=${item.slug}`)"
            >
              {{ item.name }}
            </TagItem>
          </div>
        </template>
      </div>

      <div class="flex-1">
        <LayoutResource />
        <slot />
      </div>
    </div>
  </main>
</template>
