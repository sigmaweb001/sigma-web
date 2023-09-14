<script lang="ts" setup>
const { categories } = definePropsRefs<{
  categories: any[]
  nomargin?: boolean
}>()
</script>

<template>
  <div class="flex gap-3" v-if="categories?.length">
    <template v-for="(category, index) in categories.slice(0)" :key="index">
      <!-- <NuxtLink :to="`/category/${category.slug.current}`"> -->
      <NuxtLink :to="'#'">
        <BlogsLabel :nomargin="nomargin" :color="category.color">
          {{ category.title }}
        </BlogsLabel>
      </NuxtLink>
    </template>
  </div>
</template>
