<script lang="ts" setup>
useHead({
  title: 'Demo Center',
})

const localePath = useLocalePath()

interface DemoItem {
  value: string
  path: string
  label: string
  description: string
}

const router = useRouter()
const selectedTab = ref('0')
//

const { data } = await useAsyncData('demoItems',
  () => queryCollectionNavigation('demo', ['title', 'description', 'path']),
)
console.log(data.value)

const demoItems = computed(() => {
  return data.value[0].children.map((item: any, index: number) => {
    return {
      value: index.toString(),
      label: item.title,
      description: item.description,
      path: item.path,
    }
  })
})

watchImmediate(selectedTab, (newVal) => {
  const path = demoItems.value.find(item => item.value === newVal)?.path || ''
  if (path) {
    router.push(localePath(`${path}`))
  }
})

const selectedDemoItem = computed(() => {
  return demoItems.value.find(item => item.value === selectedTab.value)
})
</script>

<template>
  <main>
    <div class="relative mb-10">
      <PricingHero>
        <template #title>
          Demo Center
        </template>
        <template #subtitle>
          See how our system ensures low latency, high availability and superior viewer experience
        </template>
        <template #image>
          <img
            src="/MediaLive/slide5.png"
            alt="SSAI Manual Ads Insert"
          >
        </template>
      </PricingHero>
    </div>

    <div class="">
      <UTabs
        v-model="selectedTab"
        :items="demoItems"
        size="xl"
        class="pb-4 w-full min-w-sm max-w-md mx-auto"
        :ui="{
          list: 'rounded-full bg-(--ui-bg) border border-(--ui-border-accented)',
          indicator: 'rounded-full bg-gradient-to-tr from-primary to-(--ui-color-primary-300)',
        }"
      />

      <!-- Description section -->
      <div
        v-if="selectedDemoItem"
        class="text-center mx-auto"
      >
        <p class="text-gray-600 dark:text-gray-300 text-balance text-base">
          {{ selectedDemoItem.description }}
        </p>
      </div>
    </div>

    <NuxtPage />
  </main>
</template>
