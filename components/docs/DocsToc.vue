<script lang="ts" setup>
const { outline, subheading } = definePropsRefs<{
  outline: any[]
  subheading?: boolean
  subheadings?: any[]
}>()
</script>

<template>
  <ol class="text-sm" :class="[subheading && 'mt-1 ml-6']">
    <li v-for="heading in outline" :key="heading._key">
      <a class="inline-flex py-1 text-slate-600 focus:text-violet-500 hover:text-violet-500" :href="`#${heading.slug}`">
        <template v-for="item in heading.children" :key="item">
          <span v-if="typeof item === 'string'">{{ item }}</span>
          <span v-else>{{ item.text }}</span>
        </template>
      </a>
      <template v-if="heading.subheadings.length > 0">
        <DocsToc :outline="heading.subheadings" :subheading="true" />
      </template>
    </li>
  </ol>
</template>
