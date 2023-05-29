<script lang="ts" setup>

</script>

<template>
  <div class="bg-$color-gray-300 p-24px flex justify-center rounded-10px">
    <ContentSlot :use="$slots.default" unwrap="p">
    </ContentSlot>
  </div>
</template>
