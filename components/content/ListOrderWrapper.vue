<script lang="ts" setup>

</script>

<template>
  <div class="flex flex-col justify-center gap-12px mx-auto max-w-470px text-16px">
    <ContentSlot :use="$slots.default" unwrap="p">
    </ContentSlot>
  </div>
</template>
