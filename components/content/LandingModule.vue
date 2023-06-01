<script setup lang="ts">
import BaseCard from './BaseCard.vue';

defineProps({
  name: String,
  icon: String,
  description: String,
  link: String,
})
</script>

<template>
  <NuxtLink :href="link">
    <BaseCard class="w-full flow-root rounded-lg px-8 pb-8 xl:h-[300px] relative">
      <div class="-mt-6 z-1 relative">
        <div>
          <span
            class="inline-flex items-center justify-center rounded-xl bg-$color-primary-200 text-$color-primary-500 dark:bg-$color-primary-700 dark:text-$color-primary-200 p-4 shadow-lg text-white">
            <Icon :name="icon" size="25" />
          </span>
        </div>
        <h3 class="mt-8 text-xl font-semibold leading-8 tracking-tight dark:text-gray-100">{{ name }}</h3>
        <p class="mt-2 text-sm leading-$lead5 text-$color-gray-400 font-medium">
          {{ description }}
        </p>
      </div>
    </BaseCard>
  </NuxtLink>
</template>

<style scoped>
.card {
  position: relative;
  border-radius: 15px;
  transition: 0.5s;
  box-shadow: inset 5px 5px 5px #0000000d,
    inset -5px -5px 15px #ffffff0d,
    5px 5px 15px #0000001a, -5px -5px 15px #ffffff0d;
}

.card:hover {
  @apply bg-#FD9A4733 dark: bg-#AA4E0233;
}

@media (prefers-color-scheme: dark) {
  .card {
    box-shadow: inset 5px 5px 5px #00000033,
      inset -5px -5px 15px #ffffff1a,
      5px 5px 15px #0000004d, -5px -5px 15px #ffffff1a;
    transition: 0.5s;
  }

  .card:hover {
    box-shadow: inset 5px 5px 5px #00000033,
      inset -5px -5px 15px #ffffff4d,
      5px 5px 15px #00000080, -5px -5px 15px #ffffff66;
  }
}
</style>
