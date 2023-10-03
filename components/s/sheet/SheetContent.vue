<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useEmitAsProps,
} from 'radix-vue'
import { cva } from 'class-variance-authority'

interface SheetContentProps extends DialogContentProps {
  side?: 'left' | 'right' | 'top' | 'bottom'
  class?: string
}

const props = defineProps<SheetContentProps>()

const emits = defineEmits<DialogContentEmits>()

const emitsAsProps = useEmitAsProps(emits)

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out data-[state=closed]:duration-300 data-[state=open]:duration-350',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b border-border data-[state=closed]:animate-slide-out-up data-[state=open]:animate-slide-in-up data-[state=open]:animate-duration-350 data-[state=closed]:animate-duration-350',
        bottom:
          'inset-x-0 bottom-0 border-t border-border data-[state=closed]:animate-slide-out-up data-[state=open]:animate-slide-in-up data-[state=open]:animate-duration-350 data-[state=closed]:animate-duration-350',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r border-border data-[state=closed]:animate-slide-out-right data-[state=open]:animate-slide-in-left sm:max-w-sm data-[state=open]:animate-duration-350 data-[state=closed]:animate-duration-350',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l border-border data-[state=closed]:animate-slide-out-right data-[state=open]:animate-slide-in-right sm:max-w-sm data-[state=open]:animate-duration-350 data-[state=closed]:animate-duration-350',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in data-[state=open]:animate-fade-in"
    />
    <DialogContent
      :class="cn(sheetVariants({ side: props.side }), props.class)"
      v-bind="{ ...props, ...emitsAsProps }"
    >
      <slot />

      <DialogClose
        class="absolute right-4 top-4 rounded-md p-0.5 transition-colors hover:bg-secondary"
      >
        <div class="text-muted-foreground i-ri:close-line h-4 w-4" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
