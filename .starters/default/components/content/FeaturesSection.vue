<script lang="ts" setup>
</script>

<template>
  <!-- grid-cols-3 grid-cols-2 gap-8 -->
  <section>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 place-content-stretch">
      <div class="row-span-3">
        <img src="/testimonial-cover.png"/>
      </div>
      <ContentSlot :use="$slots.default" unwrap="div">
      </ContentSlot>
    </div>
  </section>
</template>
