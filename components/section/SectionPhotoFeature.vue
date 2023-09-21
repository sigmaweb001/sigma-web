<script lang="ts" setup>
const { data } = definePropsRefs<{
  data: {
    items: {
      photo: any
      description: string
      title: string
      bgPos: 'left' | 'right'
    }[]
  }
}>()
</script>

<template>
  <div class="my-10 container">
    <div class="grid w-full gap-10">
      <div
        v-for="(item, i) in data.items" :key="i"
        class="flex items-center gap-10 of-hidden rounded-xl bg-gray-100 dark:bg-trueGray-800"
        :class="[item.bgPos === 'right' ? 'flex-row-reverse' : 'flex-row']"
      >
        <div class="relative h-270px w-400px flex-shrink-0">
          <SNuxtImg :image="item.photo" alt="Customer" class="object-cover" />
        </div>

        <div>
          <p v-if="item.title" class="mt-1 text-balance text-xl font-700 text-gray-600 dark:text-gray-400">
            {{ item.title }}
          </p>
          <p v-if="item.description" class="mt-1 text-balance">
            <SSanityContent :blocks="item.description" class="text-start text-base prose-gray" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
