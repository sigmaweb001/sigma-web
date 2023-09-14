<script lang="ts" setup>
import type { Product } from '@/types'

const route = useRoute()
const { data: sidebar } = await useSanityQuery<Product[]>(catByProductQuery, { product: route.params.product })

useDocsProvider({
  sidebar,
  productSlug: eagerComputed(() => route.params.product as string),
})
</script>

<template>
  <DocsLayout>
    <NuxtPage />
  </DocsLayout>
</template>
