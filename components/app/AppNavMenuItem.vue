<script setup lang="ts">
const props = defineProps<{
  title: string
  to: string
}>()
</script>

<template>
  <li>
    <NavigationMenuLink as-child>
      <NuxtLink :to="to" v-bind="$attrs"
        class="block select-none rounded-[6px] p-12px no-underline outline-none transition-colors hover:bg-primary/20 hover:text-primary text-gray-800 dark:text-trueGray-200">
        <div class="text-base font-400">
          {{ title }}
        </div>
        <p class="text-sm font-400 text-#808080">
          <slot />
        </p>
      </NuxtLink>
    </NavigationMenuLink>
  </li>
</template>
