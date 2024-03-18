<script lang="ts" setup>
const props = defineProps<{
  options: []
}>()

const modelValue = defineModel<string>()
</script>

<template>
  <SSelect v-model="modelValue">
    <SSelectTrigger class="w-150px!">
      <SSelectValue placeholder="Phone" />
    </SSelectTrigger>
    <SSelectContent>
      <SSelectItem v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </SSelectItem>
    </SSelectContent>
  </SSelect>
</template>
