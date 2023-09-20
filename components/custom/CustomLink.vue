<script lang="ts" setup>
import SSanityContent from '@/components/s/SanityContent.vue'

const { isButton, linkType, page, url, children } = definePropsRefs<{
  linkType: 'internal' | 'external'
  page: {
    type: 'page'
    slug: string
    isHome: false
  }
  isButton: true
  url: null
  children: any
}>()
</script>

<template>
  <template v-if="linkType === 'internal'">
    <DevOnly>
      <div class="fixed right-0 top-0 z-100 max-h-200px max-w-1/2 of-auto bg-white">
        <VueJsonPretty :data="children" />
      </div>
    </DevOnly>
    <NuxtLink :to="useLocalePath()(page.slug)">
      <SButton v-if="isButton" size="lg">
        <slot />
      </SButton>
      <slot v-else />
    </NuxtLink>
  </template>
</template>
