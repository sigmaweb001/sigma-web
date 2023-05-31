<script setup lang="ts">
import ModulesBar from '~/components/docs/ModulesBar.vue'
const { page } = useContent()


</script>

<template>
  <div>
    <ModulesBar :current-page-id="page._id" />
    <ClientOnly>
      <div class="max-h-[calc(100vh-200px)] relative w-full">
        <div class="absolute inset-0">
          <slot />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
