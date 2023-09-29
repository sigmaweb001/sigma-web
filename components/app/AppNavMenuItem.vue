<script setup lang="ts">
const props = defineProps<{
  title: string
  to: string
  icon: any
  description?: string
  new?: boolean
}>()
</script>

<template>
  <li>
    <NavigationMenuLink as-child>
      <NuxtLink
        :to="to" v-bind="$attrs"
        class="group block select-none rounded-[6px] p-8px text-gray-800 no-underline outline-none transition-colors hover:bg-primary/10 dark:text-trueGray-200 hover:text-primary"
      >
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 flex-center rounded-full bg-primary/20 text-primary">
            <div class="i-ri:article-line" :style="icon && { '--un-icon': getIcon(icon) }" />
          </div>
          <div>
            <div class="flex items-center text-base font-500">
              {{ title }}
              <span v-if="props.new" class="ml-1 rounded-lg bg-primary px-1 text-xs text-trueGray-100">
                New
              </span>
            </div>
            <div v-if="description" class="text-sm font-400">
              {{ description }}
            </div>
          </div>
        </div>
      </NuxtLink>
    </NavigationMenuLink>
  </li>
</template>
