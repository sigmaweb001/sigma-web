<script lang="ts" setup>
import type { Category, Docs } from '@/types'

const route = useRoute()
const activeSlug = eagerComputed(() => route.params.slug?.slice(-1).pop())

const { data: dataPost } = await useSanityQuery<Docs>(singlequery, { slug: activeSlug })

const { data: dataSidebar } = await useSanityQuery<Category[]>(catByProductQuery, { product: route.params.product })

// for prev, next post links in the footer
const docslist = computed(() => dataSidebar.value?.map(a => a.items).flat())
const currentPage = computed(() => docslist.value?.findIndex(
  a => a.slug.current === activeSlug.value,
))

const prevPost = computed(() => docslist.value?.[currentPage.value - 1])
const nextPost = computed(() => docslist.value?.[currentPage.value + 1])

const { sidebar, post, productSlug } = useDocsStore()
syncRef(dataSidebar, sidebar)
syncRef(dataPost, post)

const serializers = {
  types: {
    box: resolveComponent('CustomBox'),
    code: resolveComponent('CustomCode'),
  },
  styles: {
    h1: resolveComponent('CustomH1'),
    h2: resolveComponent('CustomH2'),
  },
  // marks: {
  //   internalLink: 'a',
  // },
}
</script>

<template>
  <div class="mx-auto px-5 container">
    <h1 class="text-4xl font-bold text-gray-800 dark:text-white">
      {{ dataPost.title }}
    </h1>
    <SSanityContent :blocks="dataPost.body" class="prose-a:text-violet-500 prose-pre:bg-slate-100 prose-pre:text-slate-700 prose-headings:scroll-m-20 mt-4 max-w-none" />
    <div class="mt-10 flex justify-between border-t py-5">
      <div>
        <template v-if="prevPost">
          <NuxtLink :to="`/docs/${productSlug}/${prevPost?.category.slug.current}/${prevPost?.slug.current}`">
            <a class="flex flex-col items-start">
              <span class="text-sm text-slate-400">
                Previous
              </span>
              <span class="text-violet-500">
                {{ prevPost.title }}
              </span>
            </a>
          </NuxtLink>
        </template>
      </div>
      <div>
        <template v-if="nextPost">
          <NuxtLink :to="`/docs/${productSlug}/${nextPost?.category.slug.current}/${nextPost?.slug.current}`">
            <a class="flex flex-col items-end">
              <span class="text-sm text-slate-400">
                Next
              </span>
              <span class="text-violet-500">
                {{ nextPost.title }}
              </span>
            </a>
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>
