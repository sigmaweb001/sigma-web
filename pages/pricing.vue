<script lang="ts" setup>
const { data: pricing } = await useAsyncData(withLocale('pricing'), () => queryContent(withLocale('pricing')).findOne())

const { data: pricings } = await useAsyncData(withLocale('pricings'), () => queryContent(withLocale('pricing')).where({
  _dir: { $eq: withLocale('pricing') },
}).find())

const localePath = useLocalePath()
</script>

<template>
  <div>
    <div class="relative mb-10">
      <ContentRenderer :value="pricing">
        <ContentRendererMarkdown :value="pricing" />
        <div class="absolute bottom-0 left-1/2 flex translate-x--1/2">
          <NuxtLink
            v-for="item in pricings" :key="item._id" :to="localePath(item._path)"
            class="group min-h-68px min-w-300px flex items-end rounded-t-40px text-white" exact-active-class="bg-primary"
          >
            <div
              class="min-h-65px min-w-300px flex flex-col cursor-pointer items-center justify-center rounded-t-40px bg-gray-400 group-[.router-link-active]:bg-white"
            >
              <div class="line-clamp-1 text-20px/22px font-700 group-[.router-link-active]:text-primary">
                {{ item.title }}
              </div>
              <div class="line-clamp-1 font-500 group-[.router-link-active]:text-secondary">
                {{ item.description }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </ContentRenderer>
    </div>
    <NuxtPage />
  </div>
</template>
