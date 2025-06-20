<script lang="ts" setup>

</script>

<template>
  <UPageSection
    :ui="{
      container: 'py-4! gap-4 sm:gap-y-4',
      title: 'lg:text-4xl!',
    }"
  >
    <template #title>
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </template>
    <iframe
      src="/censorship"
      class="aspect-video w-full rounded-lg"
    />
  </UPageSection>
</template>
