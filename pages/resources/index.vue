<script lang="ts" setup>
useHead({
  title: 'Resources',
})

const { data: categories, pending } = await useSanityData(allCategoryQuery)
const { data: tags, pending: pendingTag } = await useSanityData(allTagQuery)

const currentCat = computed(() => categories.value?.find(item => item.slug.current === useRoute().params.category))
const currentTag = computed(() => tags.value?.find(item => item.slug.current === useRoute().params.tag))
</script>

<template>
  <div class="flex">
    <div class="mt-120px w-1/4 flex-shrink-0 px-8 py-5">
      <h3 class="text-lg font-600">
        Categories
      </h3>
      <div class="grid mx--2 mt-4 gap-2">
        <NuxtLink
          v-if="!pending"
          exact-active-class="text-primary" :to="getPath('/resources')"
          class="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 hover:bg-primary/10 hover:text-primary"
        >
          <div class="flex items-center gap-2">
            <div class="i-ri:article-line" />
            <p>All resources </p>
          </div>
          <div class="i-ri:arrow-right-line" />
        </NuxtLink>

        <NuxtLink
          v-for="item in categories" :key="item.to" exact-active-class="text-primary" :to="getPath('/resources', item.slug.current)"
          class="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 hover:bg-primary/10 hover:text-primary"
        >
          <div class="flex items-center gap-2">
            <div class="i-ri:arrow-right-line" :style="{ '--un-icon': getIcon(item.icon) }" />
            <p>{{ item.title }}</p>
          </div>
          <div class="i-ri:arrow-right-line" />
        </NuxtLink>
      </div>

      <hr class="my-5 h-px border-0 bg-gray-200 dark:bg-gray-700">

      <template v-if="tags?.length">
        <h3 class="text-lg font-600">
          Tags
        </h3>

        <div v-if="categories?.length" class="mt-4 flex flex-wrap gap-2">
          <template v-for="(category, index) in tags" :key="index">
            <BlogsLabel class="text-12px !px-2 !py-1" :color="category.color" :to="getPath('/resources', '/tag', category.slug.current)">
              {{ category.title }}
            </BlogsLabel>
          </template>
        </div>
      </template>
    </div>
    <div class="flex-1">
      <NuxtPage :category="currentCat" :tag="currentTag" />
    </div>
  </div>
</template>
