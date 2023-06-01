<script lang="ts" setup>
defineProps({
  title: String,
  secondary: Boolean,
  aos: String
})

const { navBottomLink } = useContentHelpers()

const { navigation } = useContent()

const docs = computed(() => {
  const res = navigation.value.find((item) => item._path === "/resources")?.children || []
  const doc = res.find((item) => item._path === "/resources/documents")?.children || []
  return doc
})
</script>

<template>
  <section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4 place-content-stretch">
      <Feature v-for="(doc, index) in docs" :key="index" :icon="doc.icon" :description="doc.title"
        :href="doc.redirect ? doc.redirect : navBottomLink(doc)">
      </Feature>
    </div>
  </section>
</template>
