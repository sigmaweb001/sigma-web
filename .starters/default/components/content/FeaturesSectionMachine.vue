<script lang="ts" setup>
</script>

<template>
  <section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 place-content-stretch">
      <div class="row-span-5 flex items-center justify-center">
        <img src="/why-choose.png"/>
      </div>
      <ContentSlot :use="$slots.default" unwrap="div">
      </ContentSlot>
    </div>
  </section>
</template>
