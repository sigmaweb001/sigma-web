<script setup lang="ts">
defineProps({ article: Object, slug: String })
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    v-editable="article"
    :to="localePath(`/${slug}`)"
    class="h-full w-full overflow-hidden rounded-[5px] bg-[#f7f6fd] text-center"
  >
    <img
      :src="`${article.image.filename}/m/600x0`"
      :alt="article.image.alt"
      class="pointer-events-none h-48 w-full object-cover xl:h-72"
    >
    <div class="p-4">
      <h3 class="mb-3 text-xl font-bold text-[#1d243d]">
        {{ article.title }}
      </h3>
      <div class="line-clamp-4">
        {{ article.teaser }}
      </div>
    </div>
  </NuxtLink>
</template>
