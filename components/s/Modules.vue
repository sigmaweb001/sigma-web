<script lang="ts" setup>
defineProps<{
  modules: any[]
}>()
</script>

<template>
  <div xl="px-5">
    <template v-for="item in modules" :key="item.id">
      <SectionHero v-if="item._type === 'hero'" :item="item" />
      <SectionTitleS v-if="item._type === 'title'" :item="item" />
      <SectionBenefits v-else-if="item._type === 'feature'" :data="item" />
      <SectionGridFeature v-else-if="item._type === 'gridFeature'" :data="item" />
      <SectionCustomers v-else-if="item._type === 'gridCustomer'" :data="item" />
      <SectionCta v-else-if="item._type === 'cta'" :data="item" />
      <SectionPhotoFeature v-else-if="item._type === 'photoFeature'" :data="item" />
    </template>
  </div>
</template>
