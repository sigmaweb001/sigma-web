<script lang="ts" setup>
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
  <div class="w-full flex-center" xl="justify-start">
    <template v-if="linkType === 'internal'">
      <NuxtLink :to="useLocalePath()(page.slug)">
        <SButton v-if="isButton" size="lg" variant="gradient">
          <slot />
        </SButton>
        <slot v-else />
      </NuxtLink>
    </template>
  </div>
</template>
