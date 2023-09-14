<script lang="ts" setup>
import {
  DialogDescription as SheetDescription,
} from 'radix-vue'
</script>

<template>
  <SheetDescription class="text-muted-foreground text-sm">
    <slot />
  </SheetDescription>
</template>
