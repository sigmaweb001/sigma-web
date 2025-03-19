<script setup lang="ts">
import mediumZoom from 'medium-zoom'
import type { TableColumn } from '@nuxt/ui'

const UIcon = resolveComponent('UIcon')

definePageMeta({
  layout: 'products',
  primary: 'orange',
  heroBackground: 'opacity-30',
})

const { seo } = useAppConfig()

const { data: page } = await useAsyncData('pricings-premise', () => queryCollection('pricings').path('/pricings/premise').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  titleTemplate: `%s · ${seo?.siteName}`,
  title: page.value.title,
  ogTitle: `${page.value.title} · ${seo?.siteName}`,
  description: page.value.description,
  ogDescription: page.value.description,
})

defineOgImageComponent('Pricing', {
  category: 'Pricing',
})

onMounted(() => {
  mediumZoom('[data-zoom-src]', {
    margin: 5,
  })
})

type Feature = {
  title: string
  description?: string
  main?: boolean
  free: boolean | string
  pro: boolean | string
  enterprise: boolean | string
}

const active = ref('1')

const data = computed(() => {
  const features: Feature[] = []
  Object.values(page.value?.features.includes || {}).map((mainFeature) => {
    if ('includes' in mainFeature) {
      features.push({
        title: mainFeature.title,
        description: mainFeature.description,
        main: true,
        free: '',
        pro: '',
        enterprise: '',
        feature: mainFeature.feature,
      })

      Object.values(mainFeature.includes).forEach((feature) => {
        const free = feature.soon ? 'Coming soon' : feature.plans ? feature.plans.includes('free') : feature.value![0] as string
        const pro = feature.soon ? 'Coming soon' : feature.plans ? feature.plans.includes('pro') : feature.value![1] as string
        const enterprise = feature.soon ? 'Coming soon' : feature.plans ? feature.plans.includes('enterprise') : feature.value![2] as string

        features.push({
          title: feature.title,
          free,
          pro,
          enterprise,
          feature: feature.feature,
        })
      })
    }
    else {
      const free = mainFeature.plans ? mainFeature.plans.includes('free') : mainFeature.value![0] as string
      const pro = mainFeature.plans ? mainFeature.plans.includes('pro') : mainFeature.value![1] as string
      const enterprise = mainFeature.plans ? mainFeature.plans.includes('enterprise') : mainFeature.value![2] as string
      features.push({
        title: mainFeature.title,
        main: true,
        free,
        pro,
        enterprise,
        feature: mainFeature.feature,
      })
    }
  })

  return features.filter(feature => active.value === '0' ? feature.feature : true)
})

// Should be non exported Row type from ui
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cell = (type: 'free' | 'pro' | 'enterprise', row: any) => {
  const value = row.original[type]
  const color = value === 'Coming soon'
    ? '!text-[var(--ui-text-muted)]'
    : type === 'pro' ? 'text-[var(--ui-primary)]' : 'text-[var(--ui-text-highlighted)]'
  const background = type === 'pro' ? 'bg-gray-300/10 dark:bg-gray-800/50' : ''
  const borderBottom = row.original.main ? 'border-b border-[var(--ui-color-neutral-100)] dark:border-[var(--ui-color-neutral-800)]' : ''
  const borderSide = type === 'pro' ? 'border-l border-r !border-r-[var(--ui-primary)] !border-l-[var(--ui-primary)]' : ''
  const borderClosed = type === 'pro' && row.original.title?.includes('Commit') ? 'border-b border-b-[var(--ui-primary)] rounded-b-lg' : ''

  const isMain = row.original.main
  return isMain
    ? h('div', { class: `justify-center border-primary p-3 text-[var(--ui-text-highlighted)] ${color} ${background} ${borderBottom} ${borderSide} ${borderClosed}` },
        [
          h('p', { class: 'font-medium text-(--ui-primary) invisible' }, row.original.title),
          h('p', { class: 'text-sm text-(--ui-text-muted) mt-1 invisible' }, row.original.description),
        ],
      )
    : h('div', { class: `flex justify-center border-primary p-3 text-[var(--ui-text-highlighted)] ${color} ${background} ${borderBottom} ${borderSide} ${borderClosed}` },
        typeof value === 'string'
          ? h('span', { class: 'h-5' }, value)
          : value === true
            ? h(UIcon, { name: 'i-lucide-circle-check', class: `${color} size-5` })
            : h('span', { class: 'h-5 flex items-center justify-center text-lg' }, '-'),
      )
}

const header = (type: 'free' | 'pro' | 'enterprise') => {
  const border = type === 'pro' ? 'border-l border-r  border-t border-[var(--ui-primary)] rounded-t-lg' : ''
  const gradient = type === 'pro' ? 'bg-gradient-to-b from-[var(--ui-primary)]/10 to-gray-300/10 dark:from-[var(--ui-primary)]/20 dark:to-gray-800/50' : ''
  return h('div', { class: `flex flex-col items-center p-3 ${border} ${gradient}` }, [
    h('span', { class: 'text-lg font-semibold' }, page.value?.plans?.[type]?.title),
    h('span', { class: 'text-sm text-[var(--ui-text-muted)]' }, `${page.value?.plans?.[type]?.price}${page.value?.plans?.[type]?.cycle}`),
  ])
}

const columns: TableColumn<Feature>[] = [
  {
    accessorKey: 'feature',
    header: '',
    cell: ({ row }) => {
      return row.original.main
        ? h('div', { class: 'border-b border-[var(--ui-color-neutral-100)] dark:border-[var(--ui-color-neutral-800)] p-3 w-full' }, [
            h('p', { class: 'font-medium text-(--ui-primary) text-base' }, row.original.title),
            h('p', { class: 'text-sm text-(--ui-text-muted) mt-1' }, row.original.description),
          ])
        : h('span', { class: 'font-medium text-[var(--ui-text)] p-3' }, row.original.title)
    },
  },
  {
    accessorKey: 'free',
    header: '',
    cell: ({ row }) => cell('free', row),
  },
  {
    accessorKey: 'pro',
    header: '',
    cell: ({ row }) => cell('pro', row),
  },
  {
    accessorKey: 'enterprise',
    header: '',
    cell: ({ row }) => cell('enterprise', row),
  },
]
</script>

<template>
  <div v-if="page">
    <UPageSection
      :ui="{
        container: 'py-4! gap-4 sm:gap-y-4',
      }"
    >
      <SectionPricing
        v-model:active="active"
        title="_Pricing_ for Application"
        description="Transparency and loyalty are key values at The Sigma Streaming. We offer a variety of pricing options to access our technology."
        :plans="page.plans"
      />

      <UTable
        :data="data"
        :columns="columns"
        :ui="{
          tbody: 'divide-none',
          td: 'p-0',
          th: 'p-0 w-1/4',
        }"
      />
    </UPageSection>
    <SectionPricingEnd />

    <UPageSection
      :title="page.faq.title"
      :description="page.faq.description"
    >
      <UPageAccordion
        :items="page?.faq.items"
        :ui="{
          body: 'text-sm',
        }"
      >
        <template #body="{ item }">
          <MDC
            :value="item.content"
            unwrap="p"
            class="text-sm"
          />
          <ul
            v-if="item.items"
            class="list-disc list-inside mt-2"
          >
            <MDC
              v-for="_item in item.items"
              :key="_item"
              tag="li"
              :value="_item"
              unwrap="p"
              class="text-sm"
            />
          </ul>
        </template>
      </UPageAccordion>
    </UPageSection>

    <SectionCta
      title="More information about pricing"
      description="We're more than happy to help you and answer your questions."
      :button="{
        label: 'Contact us',
        to: '/contact',
      }"
    />
  </div>
</template>
