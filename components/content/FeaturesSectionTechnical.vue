<script lang="ts" setup>
defineProps({
  title: String,
  secondary: Boolean,
  aos: String
})
</script>

<template>
  <section>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-4 place-content-stretch">
      <div :data-aos="aos" class="row-span-2 flex items-start pt-32px justify-center text-32px font-medium">
        <GradientText :secondary="secondary">
          {{ title }}
        </GradientText>
      </div>
      <ContentSlot :use="$slots.default" unwrap="div" />
    </div>
  </section>
</template>
