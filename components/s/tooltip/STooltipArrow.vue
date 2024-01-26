<script setup lang="ts">
import type { TooltipArrowProps } from 'radix-vue'
import { useForwardProps } from 'radix-vue'

const props = defineProps<TooltipArrowProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <TooltipArrow v-bind="forwarded">
    <slot />
  </TooltipArrow>
</template>
