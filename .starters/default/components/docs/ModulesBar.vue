<script setup lang="ts">
import ModulesBarLink from "~/components/docs/ModulesBarLink.vue";

const props = defineProps({
  currentPageId: {
    type: String,
    required: true,
  },
})
const route = useRoute()
const isActive = (link: any) => (link.exact ? route.fullPath === link._path : route.fullPath.startsWith(link._path))

const { navBottomLink } = useContentHelpers()
const { navigation } = useContent()

</script>

<template>
  <div class="sticky top-[64px] z-10">

    <div class="hidden md:grid dark:bg-$color-primary-900 w-full py-17px place-items-center"
      style="backdrop-filter: var(--elements-backdrop-filter)">
      <div class="grid max-w-screen-xl mx-auto justify-items-stretch">
        <DocumentNav  />
        <!-- <ModulesBarLink v-for="doc in documents" :key="doc._path" :title="doc.title" :icon="doc.icon" :href="doc._path"
          :active="doc.active"  /> -->

      </div>
    </div>
  </div>
</template>
