<script lang="ts" setup>
const { item } = definePropsRefs<{
  item: any
}>()
</script>

<template>
  <div class="group flex flex-col gap-2 bg-gray-100/75 dark:bg-gray-900/75">
    <div class="relative aspect-16/9 of-hidden block rounded-md hover:scale-105 transition-all duration-300">
      <template v-if="item?.thumbnail">
        <NuxtImg :src="item.thumbnail" class="absolute size-full inset-0 object-cover" />
      </template>
      <template v-else>
        <div class="flex-center size-full inset-0 absolute">
          <Icon :name="item.icon ?? 'i-ri:image-fill'" class="w-50% h-50% text-primary/75" />
        </div>
      </template>
    </div>

    <div class="px-3 mt-2">
      <!-- TODO: tags -->
      <!-- <BlogsTagsLabel :categories="item.tags" path-prefix="/resources/category" /> -->
      <div class="flex justify-between">
        <NuxtLink :to="item.media" external target="_blank"
          class="flex-1 mt-2 dark:text-white text-lg font-semibold leading-snug tracking-tight">
          <span
            class="line-clamp-2 transition-[background_size] cursor-default bg-[length:0px_10px] from-primary-300 to-primary-200 bg-gradient-to-r bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_10px] hover:bg-[length:100%_3px] dark:from-primary-600 dark:to-primary-700">
            {{ item.title }}
          </span>
        </NuxtLink>
        <SButton class="flex-shrink-0" variant="outline" size="icon">
          <a class="i-ri:download-line text-14px" :download="item.media" :href="`${item.media}`" />
        </SButton>
      </div>
      <p v-if="item.description">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>
