<script lang="ts" setup>
defineProps<{
  span?: number
  icon?: string
}>()
</script>

<template>
  <div class="col-span-[var(--span)]" :style="{ '--span': span ?? 1 }">
    <ListItem v-if="$slots.title || $slots.subtitle" :icon="icon">
      <template #image>
        <slot name="image"/>
      </template>
      <template #title>
        <slot name="title"/>
      </template>
      <template #subtitle>
        <slot name="subtitle"/>
      </template>
    </ListItem>
    <ContentSlot v-else :use="$slots.default" unwrap="p" />
  </div>
</template>
