<script lang="ts" setup>
definePropsRefs<{
  column: 1 | 2
  items: {
    icon: string
    title: string
    description: string
    link: {
      href: string
      text: string
    }
  }[]

}>()
</script>

<template>
  <div class="grid gap-5" :class="[column === 1 ? '' : 'md:grid-cols-2']">
    <template v-for="(item) in items" :key="item._key">
      <div class="flex flex-col items-start gap-3 border border-slate-200 rounded-lg p-6">
        <template v-if="item.icon">
          <div class="relative flex overflow-hidden rounded-full bg-violet-100 p-3 text-violet-600">
            <div class="absolute inset-0 z-10 bg-violet-600 mix-blend-screen" />
            <div class="i-ri:article-line h-16px w-16px text-indigo-50" :style="icon && { '--un-icon': getIcon(item.icon) }" />
          </div>
        </template>
        <div class="flex flex-col">
          <span class="text-xl font-semibold">{{ item.title }}</span>
          <span class="mt-1 text-gray-500">{{ item.description }}</span>
        </div>
        <template v-if="item.link">
          <a :href="item.link.href" class="text-sm text-violet-500 hover:text-violet-600" rel="noopener">
            {{ item.link.text }}
          </a>
        </template>
      </div>
    </template>
  </div>
</template>
