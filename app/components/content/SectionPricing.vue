<script lang="ts" setup>
type PricingPlan = {
  title: string
  description: string
  price: string
  billingCycle: string
  highlight: boolean
  button: {
    label: string
    color: string
    variant: string
    to: string
    target: string
  }
}

const props = defineProps<{
  col?: number
  title: string
  description: string
  plans: PricingPlan[]
}>()

const { col, padding } = toRefs(props)

const targetRef = ref(null)
const full = ref(true)
const appConfig = useAppConfig()
const { top } = useElementBounding(targetRef)

watch(top, () => {
  const offset = appConfig.banner.enabled ? 104 : 64
  full.value = top.value > offset
})

provide('full', full)

const stop = usePricingStop()
const hPricing = useHeightPricing()
const targetRef2 = ref()
const { height } = useElementBounding(targetRef2)

watchOnce(height, () => {
  if (height.value === 0)
    hPricing.value = 0
  else
    hPricing.value = height.value
})

const keyFeature = useKeyFeature()

const active = ref('0')

const { t: $t } = useI18n()
const items = ref([
  { label: $t('key_features') },
  { label: $t('all_features') },
])

watch(active, () => {
  keyFeature.value = active.value === '0'
})
</script>

<template>
  <div
    class="pb-2"
    :class="[full ? '' : 'opacity-0']"
  >
    <div
      ref="targetRef"
      :style="{ '--col': col ?? 4 }"
      class="grid xl:grid-cols-[repeat(var(--col),minmax(0,1fr))]"
    >
      <div class="mt-10 pr-4 w-full flex flex-col">
        <h2
          class="mt-3 max-w-2xl text-3xl text-gray-800 font-bold leading-snug tracking-tight lg:text-4xl lg:leading-tight"
        >
          <MDC
            :value="title"
            unwrap="p"
          />
        </h2>
        <div class="py-2 text-start text-base prose prose-trueGray lg:text-base xl:text-base dark:prose-invert">
          <MDC
            :value="description"
            unwrap="p"
          />
        </div>
        <UTabs
          v-model="active"
          color="primary"
          :content="false"
          :items="items"
          class="w-full mt-2"
        />
      </div>
      <div
        :style="{
          '--col': (col ?? 4) - 1,
          '--padding': '0px',
        }"
        class="grid col-span-3 grid-cols-[repeat(var(--col),minmax(0,1fr))] p-[var(--padding)]"
      >
        <template
          v-for="item in plans"
          :key="item.title"
        >
          <UPricingPlan
            :ui="{
              description: full ? 'text-sm' : 'text-sm hidden',
            }"
            :title="item.title"
            :description="item.subtitle"
            :price="item.price"
            :billing-cycle="item.billingCycle"
            :highlight="item.highlight"
            :badge="item.highlight ? 'Recommended' : undefined"
            :button="{
              label: item.button.label,
              color: item.button.color,
              variant: item.button.variant,
              to: item.button.to,
              target: item.button.target,
              class: 'rounded-full',
            }"
          />
        </template>
      </div>
    </div>
  </div>

  <div
    ref="targetRef2"
    :class="[full || stop ? 'hidden' : 'block z-100 fixed pt-5 pb-3 max-w-[var(--ui-container)] mx-auto top-[48px] bg-(--ui-bg) pr-8 sm:pr-12 lg:pr-16']"
  >
    <div class="">
      <div
        :style="{ '--col': col ?? 4 }"
        class="grid xl:grid-cols-[repeat(var(--col),minmax(0,1fr))]"
      >
        <div class="mt-10 pr-4 w-full flex flex-col">
          <h2
            class="mt-3 max-w-2xl text-3xl text-gray-800 font-bold leading-snug tracking-tight lg:text-4xl lg:leading-tight"
          >
            <MDC
              :value="title"
              unwrap="p"
            />
          </h2>
          <UTabs
            v-model="active"
            color="primary"
            :content="false"
            :items="items"
            class="w-full mt-2"
          />
        </div>
        <div
          :style="{
            '--col': (col ?? 4) - 1,
            '--padding': '0px',
          }"
          class="grid col-span-3 grid-cols-[repeat(var(--col),minmax(0,1fr))] p-[var(--padding)]"
        >
          <template
            v-for="item in plans"
            :key="item.title"
          >
            <UPricingPlan
              :ui="{
                description: 'text-sm',
              }"
              :title="item.title"
              :price="item.price"
              :billing-cycle="item.billingCycle"
              :highlight="item.highlight"
              :badge="item.highlight ? 'Recommended' : undefined"
              :button="{
                label: item.button.label,
                color: item.button.color,
                variant: item.button.variant,
                to: item.button.to,
                target: item.button.target,
                class: 'rounded-full',
              }"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
