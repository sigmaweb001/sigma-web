<script lang="ts" setup>
const { data, refresh } = await useSanityData(resourceListQuery)

useHead({
  title: 'Sigma Resources',
})
</script>

<template>
  <div class="py-5 container lg:py-10">
    <div>
      <h1 class="text-center text-4xl font-bold dark:text-white">
        Sigma Resources
      </h1>
    </div>

    <div class="grid mt-10 gap-10 md:grid-cols-3 lg:gap-10">
      <template v-for="item in data" :key="item._id">
        <ResourceItem :item="item" />
      </template>
    </div>

    <!-- <div class="mt-10 flex justify-center">
      <SButton
        :as="NuxtLink"
        to="/archive"
        variant="outline"
      >
        <span>View all Posts</span>
      </SButton>
    </div> -->
  </div>
</template>
