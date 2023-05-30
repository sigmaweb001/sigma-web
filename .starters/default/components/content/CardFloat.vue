<script setup lang="ts">
import { cardProps, cardSlots } from './card/meta';

const props = defineProps(cardProps)

</script>

<template>
  <Card v-bind="props">
    <template #icon-float>
      <span
        class="absolute top--30px z-10 left-32px inline-flex items-center justify-center rounded-xl bg-$color-primary-200 text-$color-primary-500 dark:bg-$color-primary-700 dark:text-$color-primary-200 p-2.5 shadow-lg text-white">
        <Icon :name="iconFloat" size="40" />
      </span>
    </template>

    <template v-for="(_, name) in cardSlots" #[name]="slotProps">
      <ContentSlot :use="$slots[name]" unwrap="p" v-bind="slotProps" />
    </template>
  </Card>
</template>
