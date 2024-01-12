<script lang="ts" setup>
defineProps<{
  span?: number
  icon: string
  left?: boolean
}>()
</script>

<template>
  <div class="col-span-[var(--span)] rounded-2xl bg-gray-100 dark:bg-trueGray-800 px-10 py-10"
    :style="{ '--span': span ?? 1 }">
    <div :class="[left ? '' : 'flex-center']">
      <div v-if="$slots.image" class="size-100px relative flex flex-shrink-0">
        <Slot class="absolute inset-0 h-full w-full object-scale-down">
          <ContentSlot :use="$slots.image" unwrap="p" />
        </Slot>
      </div>
      <div v-else-if="icon" class="size-70px flex flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
        <Icon :name="icon ?? 'i-ri:article-line'" class="h-48px w-48px text-primary" />
      </div>
    </div>
    <div class="mt-4 font-medium text-gray-800 dark:text-gray-200" :class="[left ? '' : 'text-center']">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </div>
    <div class="mt-2" :class="[left ? '' : 'text-balance text-center']">
      <ContentSlot :use="$slots.subtitle" unwrap="p" />
    </div>
    <div class="mt-2">
      <ContentSlot :use="$slots.default" unwrap="p" />
    </div>
  </div>
</template>
