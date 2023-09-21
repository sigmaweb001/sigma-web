<script lang="ts" setup>
const { blocks } = definePropsRefs<{
  blocks?: any
}>()

const serializers = {
  types: {
    box: resolveComponent('CustomBox'),
    code: resolveComponent('CustomCode'),
    image: resolveComponent('CustomImage'),
    link: resolveComponent('CustomLink'),
  },
  // listItem: resolveComponent('CustomLi'),
  styles: {
    h1: resolveComponent('CustomH1'),
    h2: resolveComponent('CustomH2'),
    h3: resolveComponent('CustomH3'),
    h4: resolveComponent('CustomH4'),
  },
  marks: {
    internalLink: 'a',
  },
}
</script>

<template>
  <div class="prose dark:prose-invert">
    <SanityContent v-if="blocks" :blocks="blocks" :serializers="serializers" />
  </div>
</template>
