<script lang="ts" setup>
useHead({
  title: 'Sigma Blogs',
})
const { data: posts, refresh } = await useSanityQuery(blogPostQuery)
</script>

<template>
  <div class="py-5 container lg:py-8">
    <div>
      <h1 class="text-center text-4xl font-bold dark:text-white">
        Sigma Blogs
      </h1>
    </div>
    <div class="grid mt-10 gap-10 md:grid-cols-2 lg:gap-10">
      <template v-for="post in posts?.slice(0, 2)" :key="post._id">
        <BlogsPostList
          :post="post"
          aspect="landscape"
          :preload-image="true"
        />
      </template>
    </div>
    <div class="grid mt-10 gap-10 md:grid-cols-2 xl:grid-cols-3 lg:gap-10">
      <template v-for="post in posts?.slice(2, 14)" :key="post._id">
        <BlogsPostList :post="post" aspect="square" />
      </template>
    </div>
    <div class="mt-10 flex justify-center">
      <SButton
        :as="NuxtLink"
        to="/archive"
        variant="outline"
      >
        <span>View all Posts</span>
      </SButton>
    </div>
  </div>
</template>
