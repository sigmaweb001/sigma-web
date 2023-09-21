<script lang="ts" setup>
useHead({
  title: 'Home',
})

const { data } = await useSanityQuery(getHomeQuery(), undefined, { server: false })
</script>

<template>
  <div>
    <DevOnly>
      <div class="fixed right-0 top-0 z-100 max-h-1/2 max-w-1/2 of-auto bg-white">
        <details>
          <VueJsonPretty :data="data?.modules" />
        </details>
      </div>
    </DevOnly>
    <template v-for="item in data?.modules" :key="item.id">
      <SectionHero v-if="item._type === 'hero'" :item="item" />
      <SectionTitleS v-if="item._type === 'title'" :item="item" />
      <SectionBenefits v-else-if="item._type === 'feature'" :data="item" />
      <SectionGridFeature v-else-if="item._type === 'gridFeature'" :data="item" />
      <SectionCustomers v-else-if="item._type === 'gridCustomer'" :data="item" />
      <SectionCta v-else-if="item._type === 'cta'" :data="item" />
    </template>

    <!-- <SectionVideo /> -->
    <!-- <SectionTestimonials /> -->
    <!-- <SectionFaq /> -->
  </div>
</template>
