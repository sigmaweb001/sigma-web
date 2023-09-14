<script lang="ts" setup>
const { data } = useSanityQuery(configQuery)
</script>

<template>
  <div class="py-5 container lg:py-8">
    <div class="mx-auto my-3 prose prose-trueGray dark:prose-invert">
      <SSanityContent :blocks="data.terms" />
    </div>
  </div>
</template>
