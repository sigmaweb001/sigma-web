<script lang="ts" setup>
import AOS from "aos";

onMounted(() => {
  AOS.init()
})
</script>

<template>
  <BasicLayout>
    <slot />
  </BasicLayout>
</template>
