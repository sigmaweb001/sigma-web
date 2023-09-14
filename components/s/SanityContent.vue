<script lang="ts" setup>
const { blocks } = definePropsRefs<{
  blocks?: any
}>()

const serializers = {
  types: {
    box: resolveComponent('CustomBox'),
    code: resolveComponent('CustomCode'),
    image: resolveComponent('CustomImage'),
  },
  styles: {
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
  <SanityContent v-if="blocks" :blocks="blocks" :serializers="serializers" />
</template>
