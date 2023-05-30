<script lang="ts" setup>
defineProps({
  title: String,
  secondary: Boolean
})
</script>

<template>
  <section>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-4 place-content-stretch">
      <div class="row-span-2 flex items-center justify-center text-32px font-medium">
        <GradientText :secondary="secondary">
          {{ title }}
        </GradientText>
      </div>
      <ContentSlot :use="$slots.default" unwrap="div">
      </ContentSlot>
    </div>
  </section>
</template>
