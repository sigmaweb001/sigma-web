<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  href: any
  rounded?: boolean
  size?: string
  white?: boolean
  outline?: boolean
  link?: boolean
  block?: boolean
}>(), {
  size: 'lg',
  rounded: true,
})

const NuxtLink = resolveComponent('NuxtLink')
const localPath = useLocalePath()

const external = computed(() => props.href.startsWith('http'))
</script>

<template>
  <SButton
    v-if="!block"
    v-bind="$attrs"
    :external="external" class="underline-transparent hover:underline-current"
    :to="external ? href : localPath(href)" :as="NuxtLink" :size="size"
    :variant="link ? 'link' : outline ? 'outline' : white ? 'white' : 'gradient'" :class="[
      rounded ? 'rounded-full!' : '',
    ]"
  >
    <slot />
  </SButton>
  <div v-else>
    <SButton
      v-bind="$attrs"
      :external="external" class="underline-transparent hover:underline-current"
      :to="external ? href : localPath(href)" :as="NuxtLink" :size="size"
      :variant="link ? 'link' : outline ? 'outline' : white ? 'white' : 'gradient'"
      :class="[
        rounded ? 'rounded-full!' : '',
        block && link ? 'px-0!' : '',
      ]"
    >
      <slot />
    </SButton>
  </div>
</template>
