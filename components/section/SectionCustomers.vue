<script lang="ts" setup>
const { data } = definePropsRefs<{
  data: {
    items: {
      icon: any
      description: any
      title: string
    }[]
    photos: {
      photo: {
        asset: any
      }
    }
    bgType: 'photo'
    align: 'left' | 'right'
    size: number
  }
}>()
</script>

<template>
  <div class="my-10 container">
    <div class="flex items-center justify-around gap-10" :class="[data.align === 'right' ? 'flex-row-reverse' : 'flex-row']">
      <div v-if="data.photos?.photo" class="px-10">
        <div class="relative h-482px w-521px flex-shrink-0">
          <SNuxtImg :image="data.photos?.photo" alt="Customer" />
        </div>
      </div>
      <div class="rounded-lg bg-gray-200 p-5 dark:bg-trueGray-800">
        <div
          class="grid grid-cols-[repeat(var(--size),minmax(0,1fr))] gap-5" :style="{
            '--size': data.size || 2,
          }"
        >
          <div v-for="(item, i) in data.items" :key="i" class="flex items-center gap-4 p-5">
            <div
              v-if="item.icon"
              class="h-60px w-60px flex-center flex-shrink-0 rounded-full bg-gray-100 text-primary dark:bg-trueGray-700"
            >
              <i :class="item.icon" class="text-24px text-primary" />
            </div>
            <p v-if="item.title" class="mt-1 text-balance text-base text-gray-600 dark:text-gray-400">
              {{ item.title }}
            </p>
            <p v-if="item.description" class="mt-1 text-balance">
              <SSanityContent :blocks="item.description" class="text-start text-base prose-gray" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
