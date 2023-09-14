<script lang="ts" setup>
const { data: posts, refresh } = await useSanityQuery(blogPostQuery)

</script>

<template>
  <div class="container py-5 lg:py-8">
    <div>
      <h1 class="text-4xl font-bold text-center dark:text-white">Sigma Blogs</h1>
    </div>
    <div class="grid gap-10 md:grid-cols-2 lg:gap-10 mt-10">
      <template v-for="post in posts?.slice(0, 2)" :key="post._id">
        <BlogsPostList
          :post="post"
          aspect="landscape"
          :preloadImage="true"
        />
      </template>
    </div>
    <div class="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
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
