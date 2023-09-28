<script setup lang="ts">
const props = defineProps<{
  title: string
  to: string
  icon: any
}>()
</script>

<template>
  <li>
    <NavigationMenuLink as-child>
      <NuxtLink
        :to="to" v-bind="$attrs"
        class="block select-none rounded-[6px] p-12px text-gray-800 no-underline outline-none transition-colors hover:bg-primary/20 dark:text-trueGray-200 hover:text-primary"
      >
        <div class="flex items-center gap-2">
          <div class="i-ri:article-line" :style="icon && { '--un-icon': getIcon(icon) }" />
          <div class="text-base font-400">
            {{ title }}
          </div>
        </div>
        <p class="text-sm font-400 text-#808080">
          <slot />
        </p>
      </NuxtLink>
    </NavigationMenuLink>
  </li>
</template>
