<script lang="ts" setup>
const { item } = definePropsRefs<{
  item: any
  pathPrefix?: string
  preloadImage?: boolean
  fontWeight?: 'normal' | 'bold'
  fontSize?: 'small' | 'large'
}>()
</script>

<template>
  <div class="grid cursor-pointer gap-2 of-hidden rounded-md bg-gray-100 transition-all dark:bg-gray-800">
    <div
      class="relative block aspect-16/9"
    >
      <template v-if="item?.mainImage">
        <SNuxtImg :image="item?.mainImage" sizes="md:30vw lg:33vw" :preload="!!preloadImage" loading="lazy" />
      </template>
      <template v-else>
        <span class="absolute left-1/2 top-1/2 h-16 w-16 text-gray-200 -translate-x-1/2 -translate-y-1/2">
          <i class="i-ri:image-fill text-24px" />
        </span>
      </template>
    </div>

    <div class="flex items-center px-3">
      <div>
        <BlogsCategoryLabel :categories="item.categories" :nomargin="true" path-prefix="/resources/category" />
        <h2
          :class="{
            'text-2xl': fontSize === 'large',
            'text-lg': fontSize !== 'large',
            'font-medium': fontWeight === 'normal',
            'font-semibold leading-snug tracking-tight': fontWeight !== 'normal',
          }" class="mt-2 dark:text-white"
        >
          <span
            class="transition-[background-size] bg-[length:0px_10px] from-primary-300 to-primary-200 bg-gradient-to-r bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_10px] hover:bg-[length:100%_3px] dark:from-primary-600 dark:to-primary-700"
          >
            {{ item.title }}
          </span>
        </h2>
      </div>
    </div>

    <SButton>
      <a :href="`${item.assetUrl}?dl=`">Download</a>
    </SButton>
  </div>
</template>
