<script lang="ts" setup>
import { ensurePrefix } from '@antfu/utils'

const { categories, pathPrefix } = definePropsRefs<{
  categories: any[]
  nomargin?: boolean
  pathPrefix?: string
}>()

const toSlug = (slug: string) => `${pathPrefix.value || '/'}${ensurePrefix('/', slug)}`
</script>

<template>
  <div v-if="categories?.length" class="flex gap-3">
    <template v-for="(category, index) in categories.slice(0)" :key="index">
      <NuxtLink :to="toSlug(category.slug.current)">
        <BlogsLabel :nomargin="nomargin" :color="category.color">
          {{ category.title }}
        </BlogsLabel>
      </NuxtLink>
    </template>
  </div>
</template>
