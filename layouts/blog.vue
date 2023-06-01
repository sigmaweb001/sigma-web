<script setup lang="ts">
const contentQuery = await queryContent('blog/posts').sort({ timestamp: -1 }).find()
</script>
<!-- ::glow
---
top: calc(0px - var(--docus-app-header-height))
height: calc(var(--hero-height) + var(--docus-app-header-height) + 20rem)
maskGradient:
  light:
    initial: radial-gradient(circle at 51% 64%, rgba(0,0,0, 1) -7%, rgba(0,0,0, 0) 70%)
    xl: radial-gradient(at 70% 45%, red, rgba(255, 0, 0, 0) 85%)
  dark:
    initial: radial-gradient(circle at 51% 64%, rgba(0,0,0, 1) -7%, rgba(0,0,0, 0) 70%)
    xl: radial-gradient(at 70% 45%, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 85%)
gradient:
  light:
    initial: radial-gradient(circle at 10% 50%, {color.secondary.500} 4%, {color.primary.200} 25%, {color.primary.500} 65%)
    xl: radial-gradient(circle at 10% 50%, {color.secondary.200} 15%, {color.primary.500} 60%, {color.primary.400} 55%, {color.primary.400} 75%, {color.secondary.500} 90%)
  dark:
    initial: radial-gradient(circle at 10% 50%, {color.secondary.500}, {color.primary.500} 45%, {color.primary.200} 82%)
    xl: radial-gradient(circle at 10% 50%, {color.secondary.700} 15%, {color.primary.500} 60%, {color.primary.600} 55%, {color.primary.600} 75%, {color.secondary.500} 90%)
noise: true
backgroundImage: linear-gradient(transparent 75%, {docus.body.backgroundColor})
---
:: -->

<template>
  <div class="relative min-h-[89vh]">
    <Glow />

    <section class="BlogContainer max-w-77rem relative mx-4 xl:mx-auto mb-5rem">
      <div class="pt-12">
        <div class="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div class="mb-20 space-y-2 text-center">
            <h2 class="text-3xl font-bold text-gray-800 md:text-7xl dark:text-white">
              Sigma Blog
            </h2>
            <p class="lg:mx-auto lg:w-7/12 text-gray-600 dark:text-gray-300 text-2xl">
              The newest updates, tutorials and insights into the development of Sigma and its products!
            </p>
          </div>
        </div>
        <div class="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 mx-4 pb-12">
          <BlogCard v-for="post in contentQuery" :post="post" :key="post._id" />
        </div>
      </div>
    </section>
  </div>
</template>