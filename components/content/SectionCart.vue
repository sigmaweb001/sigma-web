<script lang="ts" setup>

const carts = useLocalStorage('carts', [])

const isEmpty = computed(() => carts.value.length === 0)
</script>

<template>
  <section>
    <div v-if="isEmpty" class="flex flex-col items-center gap-5">
      <div class="i-ri:shopping-cart-2-line text-primary h-20 w-20" />
      <div class="text-2xl font-semibold">
        <ContentSlot :use="$slots.empty" unwrap="p" />
      </div>
      <ButtonLink href="/pricing" rounded>
        Go to shopping
      </ButtonLink>
    </div>
  </section>
</template>
