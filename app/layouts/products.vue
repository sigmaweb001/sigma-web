<script setup lang="ts">
const { isLoading } = useLoadingIndicator()
const appear = ref(false)
const appeared = ref(false)
const route = useRoute()

onMounted(() => {
  setTimeout(() => {
    appear.value = true
    setTimeout(() => {
      appeared.value = true
    }, 1000)
  }, 0)
})
const heroBackgroundClass = computed(() => route.meta?.heroBackground || '')
</script>

<template>
  <AppHeader />
  <UMain class="relative">
    <HeroBackground
      class="absolute w-full -top-px transition-all text-(--ui-primary) shrink-0 -z-10 print:hidden"
      :class="[
        isLoading ? 'animate-pulse' : (appear ? heroBackgroundClass : 'opacity-0'),
        appeared ? 'duration-[400ms]' : 'duration-1000',
      ]"
    />
    <slot />
  </UMain>

  <AppFooter />
</template>
