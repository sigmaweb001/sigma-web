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

const demoItems = ref<DemoItem[]>([
  {
    value: '0',
    path: 'ssai-manual',
    label: 'Manual Ads Insert',
    description: 'Easily insert ads into a live stream playlist and customize content flow with real-time updates',
  },
  {
    value: '1',
    path: 'ssai-ai',
    label: 'AI Ads Marker',
    description: 'Automatically detect and mark ad insertion points in live or on-demand content, ensuring seamless and precise ad placements',
  },
  {
    value: '2',
    path: 'ssai',
    label: 'SSAI',
    description: 'Uses SSAI to inject ads seamlessly into the content stream, reducing ad-blocking issues for a smooth viewing experience.',
  },
  {
    value: '3',
    path: 'cspm',
    label: 'CSPM',
    description: 'Inserts ads directly on the client side, offering greater flexibility, cross-platform integration, and personalized ad optimization.',
  },
])

watchImmediate(selectedTab, (newVal) => {
  const path = demoItems.value.find(item => item.value === newVal)?.path
  if (path) {
    router.push(localePath(`/demo/${path}`))
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

    <SectionCta
      title="Ready to Get Started?"
      description="Try our product for Free and start streaming today"
    >
      <ButtonLink
        data-appointlet-modal
        data-appointlet-modal-title="View demo"
        href="https://appt.link/meet-with-sigma-team"
      >
        View demo
      </ButtonLink>
      <ButtonLink
        white
        href="/contact"
      >
        Contact Us
      </ButtonLink>
    </SectionCta>
  </main>
</template>
