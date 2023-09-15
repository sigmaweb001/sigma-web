<script lang="ts" setup>
const route = useRoute()
const slug = eagerComputed(() => route.params.slug)

const { data: post, refresh } = await useSanityQuery(singleBlogPostQuery, { slug })

useHead({
  title: post.value?.title,
})
</script>

<template>
  <div class="max-w-screen-md py-5 container lg:py-8">
    <div class="flex justify-center">
      <BlogsCategoryLabel :categories="post?.categories" />
    </div>

    <h1
      class="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight lg:text-4xl lg:leading-snug dark:text-white"
    >
      {{ post?.title }}
    </h1>

    <div class="mt-3 flex justify-center text-gray-500 space-x-3">
      <div class="flex items-center gap-3">
        <div class="relative h-10 w-10 flex-shrink-0">
          <template v-if="post?.author?.image">
            <NuxtLink :href="`/author/${post?.author?.slug.current}`">
              <NuxtImg
                provider="sanity" :src="post?.author?.image.asset._ref" :alt="post?.author?.name"
                class="absolute inset-0 h-full w-full rounded-full object-cover" fit="cover" sizes="xs:40px"
              />
            </NuxtLink>
          </template>
        </div>
        <div>
          <p class="text-gray-800 dark:text-gray-400">
            <NuxtLink :href="`/author/${post?.author?.slug.current}`">
              {{ post?.author?.name }}
            </NuxtLink>
          </p>
          <div class="flex items-center text-sm space-x-2">
            <time class="text-gray-500 dark:text-gray-400" :datetime="post?.publishedAt || post?._createdAt">
              {{ useDateFormat(post?.publishedAt || post?._createdAt, 'MMMM D, YYYY').value }}

            </time>
            <span>· {{ post?.estReadingTime || "5" }} min read</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
    <NuxtImg
      v-if="post?.mainImage" provider="sanity" :src="post?.mainImage?.asset._ref"
      :alt="post?.mainImage?.alt || 'Thumbnail'" loading="eager" fit="cover" sizes="xs:100vw"
      class="absolute inset-0 h-full w-full object-cover"
    />
  </div>

  <div class="py-5 container lg:py-8">
    <article class="mx-auto max-w-screen-md">
      <div class="mx-auto my-3 prose prose-trueGray dark:prose-invert">
        <SSanityContent :blocks="post.body" />
      </div>
      <div class="mb-7 mt-7 flex justify-center">
        <Link href="/" class="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500">
          ← View all posts
        </Link>
      </div>
      <BlogsAuthorCard v-if="post.author" :author="post.author" />
    </article>
  </div>
</template>
