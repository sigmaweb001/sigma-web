<script lang="ts" setup>
const route = useRoute()

const slug = computed(() => route.params.slug)
const { locale } = useI18n()
const { data: demo } = await useAsyncData(
  'demo',
  () => queryContent(withLocale('demo', locale)).findOne(),
  { watch: [locale] },
)

const { data: pricings } = await useAsyncData(`pricings_${slug.value}`, () => queryContent(withLocale('pricing', locale)).where({
  _dir: { $eq: 'pricing' },
}).find(), { watch: [locale] })

const localePath = useLocalePath()

interface DemoItem {
  id: string
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
    icon: 'i-heroicons-play',
  },
  // Add more categories as needed
])

const selectedCategory = ref(categories.value[0].id)

const demoItems = ref<DemoItem[]>([
  {
    id: 'ssai-manual',
    title: 'SSAI',
    subtitle: 'Manual Ads Insert',
    type: 'Demo',
    category: 'ssai',
  },
  {
    id: 'ssai-ai',
    title: 'SSAI',
    subtitle: 'AI Ads Marker',
    type: 'Demo',
    category: 'ssai',
  },
  {
    id: 'ssai-periodic',
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
</script>

<template>
  <main>
    <div class="relative mb-10">
      <ContentRenderer :value="demo">
        <ContentRendererMarkdown :value="demo" />
      </ContentRenderer>
    </div>
    <div class="flex items-center gap-4">
      <input
        v-model="searchQuery"
        placeholder="Search"
        icon="i-heroicons-magnifying-glass"
        class="max-w-sm"
      >
    </div>

    <div class="mx-16 flex gap-8">
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
              <UIcon v-if="category.icon" :name="category.icon" class="flex-shrink-0" />
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

      <div class="grid grid-cols-1 flex-1 gap-4 lg:grid-cols-3 sm:grid-cols-2">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="group cursor-pointer transition-transform hover:-translate-y-1"
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
        </div>
      </div>
    </div>
  </main>
</template>
