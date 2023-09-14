<script lang="ts" setup>
import type { BlogAuthor } from '~/types'

const { author } = definePropsRefs<{
  author: BlogAuthor
}>()
</script>

<template>
  <div class="mt-3 rounded-2xl bg-gray-50 px-8 py-8 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
    <div class="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6">
      <div class="relative mt-1 h-24 w-24 flex-shrink-0">
        <template v-if="author.image">
          <!-- <NuxtLink :href="`/author/${author.slug.current}`"> -->
          <NuxtImg
            provider="sanity"
            :src="author.image.asset._ref"
            :alt="author.name"
            class="rounded-full object-cover"
            fit="cover"
            sizes="xs:96px"
          />
          <!-- </NuxtLink> -->
        </template>
      </div>
      <div>
        <div class="mb-3">
          <h3 class="text-lg font-medium text-gray-800 dark:text-gray-300">
            About {{ author.name }}
          </h3>
        </div>
        <div>
          <template v-if="author.bio">
            <SSanityContent :blocks="author.bio" />
          </template>
        </div>
        <!-- <div class="mt-3">
          <NutxLink
            :href="`/author/${author.slug.current}`"
            class="bg-brand-secondary/20 rounded-full py-2 text-sm text-blue-600 dark:text-blue-500"
          >
            View Profile
          </NutxLink>
        </div> -->
      </div>
    </div>
  </div>
</template>
