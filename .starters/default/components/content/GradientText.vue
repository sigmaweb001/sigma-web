
<script lang="ts" setup>

</script>

<template>
  <span class="GradientText inline-block">
    <ContentSlot :use="$slots.default" unwrap="p">
      GradientText
    </ContentSlot>
  </span>
</template>

<style scoped>
.GradientText {
  background: linear-gradient(to right, #FEDDC1 10%, #FD9A47 40%, #E26802 60%, #FEDDC1 90%);
  background-size: 200% auto;

  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: shine 1s linear infinite;

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
}
</style>
