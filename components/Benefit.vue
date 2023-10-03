<script lang="ts" setup>
definePropsRefs<{
  title: string
  icon: any
}>()
</script>

<template>
  <div class="mt-8 flex items-start space-x-3">
    <div class="mt-1 h-11 w-11 flex flex-shrink-0 items-center justify-center rounded-md bg-primary">
      <div class="i-ri:article-line h-7 w-7 text-indigo-50" :style="icon && { '--un-icon': getIcon(icon) }" />
    </div>
    <div>
      <h4 class="text-xl font-medium text-gray-800 dark:text-gray-200">
        {{ title }}
      </h4>
      <p class="mt-1 text-gray-500 dark:text-gray-400">
        <slot />
      </p>
    </div>
  </div>
</template>
