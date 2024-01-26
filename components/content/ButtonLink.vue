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
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <DefineTemplate>
    <SButton
      v-bind="$attrs" :external="external" class="underline-transparent hover:underline-current"
      :to="external ? href : localPath(href)" :as="NuxtLink" :size="size"
      :variant="link ? 'link' : outline ? 'outline' : white ? 'white' : 'gradient'" :class="[
        rounded ? 'rounded-full!' : '',
        block && link ? 'px-0!' : '',
      ]"
    >
      <slot />
    </SButton>
  </DefineTemplate>
  <ReuseTemplate v-if="!block" />
  <div v-else>
    <ReuseTemplate />
  </div>
</template>
