<script lang="ts" setup>
const { data: products, refresh } = useSanityQuery(productsQuery)
</script>

<template>
  <header
    class="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-3"
  >
    <div class="flex items-center gap-2">
      <!-- <div class="flex items-center md:hidden">
        <MobileMenu :sidebar="props.sidebar" :active="props.active" />
      </div> -->
      <NuxtLink href="/">
        <a class="flex">
          <NuxtImg src="/logo_sigma.png" width="36" height="36" alt="Sandocs" />
        </a>
      </NuxtLink>
    </div>
    <nav class="flex items-center gap-5">
      <NuxtLink v-for="(prod, i) in products" :key="i" :to="`/docs/${prod.slug.current}/${prod.cat.slug.current}/${prod.cat.doc.slug.current}`">
        <a
          class="hidden items-center gap-1 border-b text-sm text-slate-900 sm:inline-flex focus-visible:border-violet-100 hover:border-violet-200 focus-visible:bg-violet-100 hover:text-violet-500 focus-visible:outline-4 focus-visible:outline-violet-100"
        >
          {{ prod.title }}
        </a>
      </NuxtLink>
    </nav>
    <DarkSwitch />
  </header>
</template>
