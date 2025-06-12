<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  href: string
  rounded?: boolean
  size?: 'xl' | 'xs' | 'sm' | 'md' | 'lg'
  white?: boolean
  outline?: boolean
  link?: boolean
}>(), {
  size: 'xl',
  rounded: true,
})

const localPath = useLocalePath()

const external = computed(() => props.href.startsWith('http'))

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <DefineTemplate>
    <UButton
      :size="size"
      v-bind="$attrs"
      :to="external ? href : localPath(href)"
      :target="external ? '_blank' : undefined"
      :class="[
        rounded ? 'rounded-full!' : '',
        block && link ? 'px-0!' : '',
      ]"
      :variant="link ? 'link'
        : outline || white ? 'outline' : 'solid'"
      :color="white ? 'neutral' : 'primary'"
      :ui="{
        base: 'h-[44px] rounded-md px-8',
      }"
    >
      <slot mdc-unwrap="p" />
    </UButton>
  </DefineTemplate>

  <ReuseTemplate v-if="!block" />
  <div v-else>
    <ReuseTemplate />
  </div>
</template>
