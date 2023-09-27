<script lang="ts" setup>
import type { BlogPost } from '~/types'

const { minimal, post } = definePropsRefs<{
  post: BlogPost
  minimal?: boolean
  aspect?: 'landscape' | 'custom' | 'square'
  pathPrefix?: string
  preloadImage?: boolean
  fontWeight?: 'normal' | 'bold'
  fontSize?: 'small' | 'large'
}>()
</script>

<template>
  <div class="group bg-gray-100/75 dark:bg-gray-900/75" :class="{ 'grid gap-10 md:grid-cols-2': minimal }">
    <div class="overflow-hidden rounded-md transition-all duration-300 hover:scale-105 dark:bg-gray-800">
      <NuxtLink
        class="relative block" :class="{
          'aspect-video': aspect === 'landscape',
          'aspect-[5/4]': aspect === 'custom',
          'aspect-square': aspect !== 'landscape' && aspect !== 'custom',
        }" :to="`/blogs/${pathPrefix ? `${pathPrefix}/` : ''}${post.slug.current}`"
      >
        <template v-if="post?.mainImage">
          <NuxtImg
            provider="sanity" :src="post?.mainImage.asset._ref" :placeholder="post.mainImage.blurDataURL"
            :alt="post.mainImage.alt || 'Thumbnail'" sizes="md:30vw lg:33vw"
            class="absolute inset-0 h-full w-full object-cover transition-all" fit="cover" :preload="!!preloadImage"
            loading="lazy"
          />
        </template>
        <template v-else>
          <span class="absolute left-1/2 top-1/2 h-16 w-16 text-gray-200 -translate-x-1/2 -translate-y-1/2">
            <i class="i-ri:image-fill text-24px" />
          </span>
        </template>
      </NuxtLink>
    </div>

    <div :class="[minimal ? 'flex items-center' : '']">
      <div>
        <BlogsCategoryLabel :categories="post.categories" :nomargin="minimal" />
        <h2
          :class="{
            'text-2xl': fontSize === 'large',
            'text-3xl': minimal,
            'text-lg': fontSize !== 'large',
            'font-medium': fontWeight === 'normal',
            'font-semibold leading-snug tracking-tight': fontWeight !== 'normal',
          }" class="mt-2 dark:text-white"
        >
          <NuxtLink :to="`/blogs/${pathPrefix ? `${pathPrefix}/` : ''}${post.slug.current}`">
            <span
              class="transition-[background-size] bg-[length:0px_10px] from-primary-300 to-primary-200 bg-gradient-to-r bg-left-bottom bg-no-repeat duration-500 group-hover:bg-[length:100%_10px] hover:bg-[length:100%_3px] dark:from-primary-600 dark:to-primary-700"
            >
              {{ post.title }}
            </span>
          </NuxtLink>
        </h2>

        <div class="hidden">
          <p v-if="post.excerpt" class="line-clamp-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <NuxtLink :to="`/blogs/${pathPrefix ? `${pathPrefix}/` : ''}${post.slug.current}`" legacy-behavior>
              {{ post.excerpt }}
            </NuxtLink>
          </p>
        </div>
        <div class="mb-2 mt-3 flex items-center text-gray-500 space-x-3 dark:text-gray-400">
          <NuxtLink to="#">
            <div class="flex items-center gap-3">
              <div class="relative h-32px w-32px flex-shrink-0">
                <NuxtImg
                  v-if="post.author.image" provider="sanity"
                  class="absolute inset-0 h-full w-full rounded-full object-cover" :src="post.author.image.asset._ref" :alt="post?.author?.name" sizes="xs:32px"
                  fit="cover"
                />
              </div>
              <div>
                <span class="truncate text-sm">
                  {{ post.author.name }}

                </span>
                <template v-if="post.author.bio">
                  <SSanityContent class="text-xs [&_p]:!my-0" :blocks="post.author.bio" />
                </template>
              </div>
            </div>
          </NuxtLink>
          <!-- <span class="text-xs text-gray-300 dark:text-gray-600">
            &bull;
          </span>
          <time class="truncate text-sm" :datetime="post?.publishedAt || post._createdAt">
            {{ useDateFormat(post?.publishedAt || post._createdAt, 'MMMM D, YYYY').value }}
          </time> -->
        </div>
      </div>
    </div>
  </div>
</template>
