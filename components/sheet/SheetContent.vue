<script lang="ts" setup>
import {
  DialogClose as SheetClose,
  DialogContent as SheetContent,
  DialogOverlay as SheetOverlay,
  DialogPortal as SheetPortal,
} from 'radix-vue'
import type { SheetContentProps } from '@/utils/cva'

const props = withDefaults(defineProps<{
  side?: SheetContentProps['side']
}>(), {
  side: 'right',
})
</script>

<template>
  <SheetPortal>
    <SheetOverlay
      class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animated data-[state=closed]:animated-fade-out data-[state=open]:animated-fade-in"
    />
    <SheetContent :class="sheetVariants({ side, component: 'content' })">
      <slot />

      <!--   -->
      <SheetClose
        class="absolute rounded-sm opacity-70 transition-opacity disabled:pointer-events-none data-[state=open]:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
        :class="sheetVariants({ side, component: 'close' })"
      >
        <div i-carbon:close h-4 w-4 />
        <span class="sr-only">Close</span>
      </SheetClose>
    </SheetContent>
  </SheetPortal>
</template>
