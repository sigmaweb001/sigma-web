<script lang="ts" setup>
const { outline: items } = useDocsStore()
</script>

<template>
  <div class="sticky top-[55px] hidden h-max lg:block">
    <nav class="w-64 px-5">
      <template v-if="items.length > 0">
        <div>
          <h3 class="mb-2 mt-10 text-sm font-semibold">
            On This Page
          </h3>
          <DocsToc :outline="items" />
        </div>
      </template>
    </nav>
  </div>
</template>
