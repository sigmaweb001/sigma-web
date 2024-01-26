<script setup lang="ts">
import { TooltipContent, type TooltipContentEmits, type TooltipContentProps, TooltipPortal, useForwardPropsEmits } from 'radix-vue'

defineOptions({
  inheritAttrs: false,
})
const props = withDefaults(defineProps<TooltipContentProps>(), {
  sideOffset: 4,
})
const emits = defineEmits<TooltipContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      v-bind="{ ...forwarded, ...$attrs }" class="z-100 overflow-hidden border border-border rounded-8px bg-background px-12px py-6px text-sm text-secondary shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:(animate-out fade-out-0 zoom-out-95) data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=right]:slide-in-from-left-2 data-[side=left]:slide-in-from-right-2"
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
