<script setup lang="ts">
import ModulesBar from '~/components/docs/ModulesBar.vue'
const { page } = useContent()


</script>

<template>
  <div>
    <ModulesBar :current-page-id="page._id" />
    <div class="max-h-[calc(100vh-200px)]">
      <slot />

    </div>
  </div>
</template>
