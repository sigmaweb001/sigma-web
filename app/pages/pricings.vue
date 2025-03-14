<script setup lang="ts">
const router = useRouter()
const localePath = useLocalePath()

const items = ref([
  {
    label: 'Premise',
    value: '0',
  },
  {
    label: 'Cloud',
    value: '1',
  },
])

const pricingModel = ref('0')

watch(pricingModel, (value) => {
  router.push(localePath(`/pricings/${value === '0' ? 'premise' : 'cloud'}`))
})
</script>

<template>
  <UContainer class="relative">
    <PricingHero>
      <template #title>
        Sigma Pricing
      </template>
      <template #subtitle>
        Choose the VOD and live streaming pricing plan that's right for you
      </template>
      <template #image>
        <img
          src="/MediaLive/slide5.png"
          alt="Sigma Pricing"
        >
      </template>
    </PricingHero>
    <div class="absolute bottom-0 left-1/2 flex -translate-x-1/2">
      <UTabs
        v-model="pricingModel"
        :items="items"
        size="xl"
        class="pb-4 w-full min-w-sm"
        :ui="{
          list: 'rounded-full bg-(--ui-bg) border border-(--ui-border-accented)',
          indicator: 'rounded-full',
        }"
      />
    </div>
  </UContainer>
  <NuxtPage />
</template>
