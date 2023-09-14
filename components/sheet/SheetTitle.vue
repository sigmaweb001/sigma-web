<script lang="ts" setup>
import {
  DialogTitle as SheetTitle,
} from 'radix-vue'
</script>

<template>
  <SheetTitle class="text-foreground text-lg font-semibold">
    <slot />
  </SheetTitle>
</template>
