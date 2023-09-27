<script lang="ts" setup>
useHead({
  title: 'Resources',
})
const localPath = useLocalePath()
const categories = computed(() => [
  {
    title: 'All resources',
    icon: 'i-ri:article-line',
    to: localPath('/resources'),
  },
  {
    title: 'Blog articles',
    icon: 'i-ri:file-list-3-line',
    to: localPath('/resources/blogs'),
  },
  {
    title: 'eBooks & download',
    icon: 'i-ri:book-open-line',
    to: localPath('/resources/resource'),
  },
])
</script>

<template>
  <div class="">
    <h1 class="py-5 text-center text-4xl font-bold dark:text-white">
      All Resources
    </h1>
    <div class="flex">
      <div class="flex-shrink-0 p-5">
        <h3 class="text-lg font-600">
          Categories
        </h3>
        <div class="grid mx--2 mt-4 gap-2">
          <NuxtLink v-for="item in categories" :key="item.to" :to="item.to" class="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 hover:bg-primary/10 hover:text-primary">
            <div class="flex items-center gap-2">
              <div :class="item.icon" />
              <p>{{ item.title }}</p>
            </div>
            <div class="i-ri:arrow-right-line" />
          </NuxtLink>
        </div>
      </div>
      <div class="grid mt-10 gap-6 px-6 md:grid-cols-3 lg:gap-6">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
