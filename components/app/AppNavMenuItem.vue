<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  _path?: string
  icon?: string
  description?: string
  new?: boolean
  comingsoon?: boolean
  redirect?: string
  navigation?: boolean
}>(), {
  navigation: true,
})

const target = computed(() => props.redirect?.startsWith('https://') ? '_blank' : '_self')
const _redirect = computed(() => props.redirect?.startsWith('https://') ? props.redirect : ensureLocalePath(props.redirect))
</script>

<template>
  <NavigationMenuLink v-if="props.navigation" as-child>
    <NuxtLink
      :to="redirect ? _redirect : _path" :external="!!redirect" v-bind="$attrs" :target="target"
      class="group block select-none rounded-[6px] p-8px text-gray-800 no-underline outline-none transition-colors hover:bg-primary/10 dark:text-trueGray-200 hover:text-primary"
    >
      <div class="flex gap-3" :class="[description ? 'items-start' : 'items-center']">
        <Icon
          :name="icon ?? 'i-ri:article-line'"
          class="mt-1 h-8 w-8 flex-center flex-shrink-0 rounded-full bg-primary/20 p-1 text-primary"
        />
        <div>
          <div class="flex items-center text-sm font-600">
            {{ title }}
            <span v-if="props.new" class="ml-1 rounded-lg bg-primary px-2 text-xs text-trueGray-100">
              New
            </span>
            <span v-if="props.comingsoon" class="ml-1 rounded-lg bg-trueGray-200 px-2 text-xs">
              Coming soon
            </span>
          </div>
          <div v-if="description" class="line-clamp-2 mt-2px text-sm text-gray-500 dark:text-gray-400">
            {{ description }}
          </div>
        </div>
      </div>
    </NuxtLink>
  </NavigationMenuLink>
</template>
