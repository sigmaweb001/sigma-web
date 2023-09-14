<script lang="ts" setup>

</script>

<template>
  <DocsNavbar />
  <div class="flex flex-col md:flex-row">
    <DocsSidebar />
    <div class="mx-auto max-w-3xl w-full flex-1">
      <slot />
    </div>
    <DocsAside />
  </div>
</template>
