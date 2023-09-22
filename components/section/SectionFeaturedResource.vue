<script lang="ts" setup>
const { data } = definePropsRefs<{
  data: {
    items: {
      icon: any
      image: any
      description: string
      title: string
    }[]
  }
}>()
</script>

<template>
  <div class="my-10 gap-24px container">
    <div
      class="grid grid-cols-[repeat(var(--size),minmax(0,1fr))] mx-auto gap-24px" :style="{
        '--size': 3,
      }"
    >
      <ResourceItem v-for="(item, i) in data.items" :key="i" :item="item" />
    </div>
  </div>
</template>
