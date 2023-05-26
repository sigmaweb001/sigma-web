<script lang="ts" setup>

</script>

<template>
  <div class="flex items-center justify-center">
    <ContentSlot :use="$slots.default" unwrap="p">
    </ContentSlot>
  </div>
</template>
