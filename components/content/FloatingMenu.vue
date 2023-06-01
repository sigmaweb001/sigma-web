<script lang="ts" setup>
const props = defineProps<{
  links: any[]
}>()

const { config } = useDocus()
const route = useRoute()
const isActive = (link: any) => (link.exact ? route.fullPath === link._path : route.fullPath.startsWith(link._path))
const { navBottomLink } = useContentHelpers()

</script>

<template>
  <div class="subnav">
    <div class="h-16px" />
    <ul class="dark:bg-$color-gray-800 rounded-4px py-6px bg-$color-gray-100 shadow-xl shadow-$color-gray-500">
      <li v-for="(_link, idx) in links" :key="_link._path"
        class="font-500 flex flex-col text-14px hover:text-$color-primary-500">
        <ButtonLink :class="[isActive(_link) ? '!text-$color-primary-500': '']" class="!w-full !text-14px active" ghost :icon="_link.icon"
          :href="_link.redirect ? _link.redirect : navBottomLink(_link)">
          {{ _link.title }}
        </ButtonLink>
      </li>
    </ul>
  </div>
</template>
