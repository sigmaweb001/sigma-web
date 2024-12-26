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
      <ContentRenderer :value="demo">
        <ContentRendererMarkdown :value="demo" />
      </ContentRenderer>
    </div>
    <div class="mx-16 my-8 flex items-center justify-end gap-4">
      <div class="relative">
        <SInputText
          v-model="searchQuery"
          placeholder="Search"
          class="min-w-64"
        />
        <div class="absolute right-0 top-0 h-full flex items-center justify-center px-4">
          <div class="i-heroicons-magnifying-glass size-4" />
        </div>
      </div>
    </div>

    <div class="mx-16 min-h-30vh flex gap-8">
      <div class="w-64 flex-shrink-0">
        <h2 class="mb-4 text-lg font-semibold">
          Categories
        </h2>
        <div class="space-y-2">
          <div v-for="category in categories" :key="category.id">
            <button
              class="w-full flex items-center gap-2 rounded-lg px-4 py-2 transition-colors"
              :class="{
                'bg-primary-50 text-primary-500 dark:bg-primary-900/50': selectedCategory === category.id,
                'hover:bg-gray-100 dark:hover:bg-gray-800': selectedCategory !== category.id,
              }"
              @click="selectedCategory = category.id"
            >
              <div v-if="category.icon" :class="category.icon" class="flex-shrink-0" />
              <span>{{ category.name }}</span>
              <UIcon
                name="i-heroicons-chevron-right"
                class="ml-auto flex-shrink-0"
                :class="{ 'text-primary-500': selectedCategory === category.id }"
              />
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 flex-1 items-start gap-4 lg:grid-cols-3 sm:grid-cols-2">
        <NuxtLink
          v-for="item in filteredItems"
          :key="item.path"
          :to="localePath(`/demo/${item.path}`)"
          class="group cursor-pointer overflow-hidden rounded-lg shadow transition-transform hover:-translate-y-1"
          :ui="{ body: { padding: 'p-0' } }"
        >
          <div class="flex flex-col">
            <div class="bg-primary-500 p-4 text-white">
              {{ item.type }}
            </div>
            <div class="p-4">
              <h3 class="text-xl font-semibold">
                {{ item.title }}
              </h3>
              <p v-if="item.subtitle" class="mt-1 text-gray-600 dark:text-gray-400">
                {{ item.subtitle }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
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
