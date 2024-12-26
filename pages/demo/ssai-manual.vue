<script lang="ts" setup>
const route = useRoute()

const slug = computed(() => route.params.slug)
const { locale } = useI18n()
const { data: demo } = await useAsyncData(
  'demo',
  () => queryContent(withLocale('demo', locale)).findOne(),
  { watch: [locale] },
)

// const { data: pricings } = await useAsyncData(`pricings_${slug.value}`, () => queryContent(withLocale('pricing', locale)).where({
//   _dir: { $eq: 'pricing' },
// }).find(), { watch: [locale] })

const localePath = useLocalePath()

interface DemoItem {
  path: string
  title: string
  subtitle: string
  type: 'Demo'
  category: string
}

interface Category {
  id: string
  name: string
  icon?: string
}

const categories = ref<Category[]>([
  {
    id: 'ssai',
    name: 'SSAI',
    icon: 'i-ri:advertisement-line',
  },
  // Add more categories as needed
])

const selectedCategory = ref(categories.value[0].id)

const demoItems = ref<DemoItem[]>([
  {
    path: 'ssai-manual',
    title: 'SSAI',
    subtitle: 'Manual Ads Insert',
    type: 'Demo',
    category: 'ssai',
  },
  {
    path: 'ssai-ai',
    title: 'SSAI',
    subtitle: 'AI Ads Marker',
    type: 'Demo',
    category: 'ssai',
  },
  {
    path: 'ssai-periodic',
    title: 'SSAI',
    subtitle: 'With Periodic Cue Tones',
    type: 'Demo',
    category: 'ssai',
  },
])

const searchQuery = ref('')

const filteredItems = computed(() => {
  let items = demoItems.value.filter(item => item.category === selectedCategory.value)

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    items = items.filter(
      item =>
        item.title.toLowerCase().includes(query)
        || item.subtitle.toLowerCase().includes(query),
    )
  }

  return items
})

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <main>
    <div class="relative mb-10">
      <PricingHero>
        <template #title>
          SSAI Manual Ads Insert
        </template>
        <template #subtitle>
          Choose the VOD and live streaming pricing plan that’s right for you
        </template>
        <template #image>
          <img src="/Media Live/slide5.png" alt="SSAI Manual Ads Insert">
        </template>
      </PricingHero>
    </div>

    <!-- SECTION CTA -->
    <div class="py-10 container">
      <div
        class="relative mx-auto w-full max-w-screen-lg flex flex-wrap items-center justify-between gap-5 overflow-hidden rounded-xl from-primary-400 to-primary-500 bg-gradient-to-r px-7 py-7 text-white lg:flex-nowrap lg:px-12 lg:py-12"
      >
        <div
          class="absolute bottom-3 left-3 z-1 h-24 w-24 rounded-full bg-white from-white to-primary-600 bg-gradient-to-b opacity-20"
        />
        <div
          class="absolute left-1/2 z-1 h-24 w-24 rounded-full bg-white from-white to-primary-600 bg-gradient-to-b opacity-20 -top-10"
        />
        <div class="relative z-0 flex-grow text-center lg:text-left">
          <div class="text-3xl text-white font-medium lg:text-3xl">
            Explore our Demo Center to experience cutting-edge solutions, low-latency streaming and high availability for superior viewer engagement
          </div>
          <!-- <div class="mt-2 text-white text-opacity-80 lg:text-xl">
            <ContentSlot :use="$slots.subtitle" unwrap="p" />
          </div> -->
        </div>

        <div class="relative w-full flex flex-shrink-0 gap-2 text-center lg:w-auto">
          <SButton
            class="underline-transparent rounded-full! hover:underline-current"
            :to="localePath('/contact')" :as="NuxtLink"
            size="lg"
            variant="white"
          >
            Contact us
          </SButton>
        </div>
      </div>
    </div>
  </main>
</template>
