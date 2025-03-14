<script setup lang="ts">
import { NavigationMenuLink } from 'reka-ui'

const props = withDefaults(defineProps<{
  label?: string
  to?: string
  icon?: string
  description?: string
  new?: boolean
  comingsoon?: boolean
  redirect?: string
  navigation?: boolean
}>(), {
  navigation: true,
})

const localePath = useLocalePath()
const target = computed(() => props.redirect?.startsWith('https://') ? '_blank' : '_self')
const _redirect = computed(() => props.redirect?.startsWith('https://') ? props.redirect : localePath(props.redirect))
</script>

<template>
  <NavigationMenuLink
    v-if="props.navigation"
    as-child
  >
    <NuxtLink
      :to="redirect ? _redirect : localePath(to)"
      :external="!!redirect"
      v-bind="$attrs"
      :target="target"
      class="group block select-none rounded-[6px] p-[8px] text-gray-800 no-underline outline-none transition-colors hover:bg-(--ui-primary)/10 hover:text-(--ui-primary)"
    >
      <div
        class="flex gap-3"
        :class="[description ? 'items-start' : 'items-center']"
      >
        <div class="mt-1 size-8 flex items-center justify-center flex-shrink-0 rounded-full bg-(--ui-primary)/20 p-1 text-(--ui-primary)">
          <UIcon
            :name="icon ?? 'i-ri:article-line'"
            class="size-5"
          />
        </div>

        <div>
          <div class="flex items-center text-sm font-medium">
            {{ label }}
            <span
              v-if="props.new"
              class="ml-1 rounded-lg bg-(--ui-primary) px-2 text-xs text-trueGray-100"
            >
              New
            </span>
            <span
              v-if="props.comingsoon"
              class="ml-1 rounded-lg bg-trueGray-200 px-2 text-xs"
            >
              Coming soon
            </span>
          </div>
          <div
            v-if="description"
            class="line-clamp-2 mt-[2px] text-sm text-gray-500"
          >
            {{ description }}
          </div>
        </div>
      </div>
    </NuxtLink>
  </NavigationMenuLink>
</template>
