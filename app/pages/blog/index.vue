<script setup lang="ts">
// @ts-expect-error yaml is not typed
import page from '.blog.yml'

const { data: posts } = await useAsyncData('posts', async () => {
  return queryCollection('blog')
    .where('extension', '=', 'md')
    .select('title', 'date', 'image', 'description', 'path', 'authors', 'category')
    .order('date', 'DESC')
    .all()
})

useHead({
  link: [
    { rel: 'alternate', type: 'application/rss+xml', title: 'SigmaStreaming Blog', href: '/blog/feed.xml' },
  ],
})
useSeoMeta({
  titleTemplate: '%s',
  title: page.title,
  description: page.description,
  ogDescription: page.description,
  ogTitle: `${page.title} · SigmaStreaming`,
})
defineOgImageComponent('Docs', {
  title: 'Blog',
})
</script>

<template>
  <UContainer>
    <UPageHero
      v-bind="page?.hero"
      :ui="{ root: 'z-10' }"
    >
      <template #description>
        {{ page.description }}
      </template>
    </UPageHero>
    <UBlogPosts
      orientation="vertical"
      class="mb-12"
    >
      <UBlogPost
        v-for="post in posts"
        :key="post.path"
        :to="post.path"
        :title="post.title"
        :description="post.description"
        :image="{ src: post.image, width: 592, height: 333, placeholder: [59, 33, 50, 4], format: 'webp' }"
        :date="formatDateByLocale('en', post.date)"
        :authors="post.authors"
        :badge="{ label: post.category, color: 'neutral', variant: 'subtle' }"
        orientation="horizontal"
      />
    </UBlogPosts>
  </UContainer>
</template>
