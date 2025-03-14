<script lang="ts" setup>
const props = defineProps<{
  title: string
  price: string
  features: string[]
  recommended?: boolean
  subtitle?: string
  button?: {
    label: string
    color: string
    variant: string
    to: string
    target: string
  }
}>()

const { recommended } = toRefs(props)

const full = inject('full')
</script>

<template>
  <div
    class="z-1 grid grid-rows-subgrid gap-4 rounded-[12px] p-[24px] shadow-black/25 shadow-md"
    :class="[
      recommended ? 'from-primary-400 to-primary-500 bg-gradient-to-lt text-(--ui-primary)' : '',
      full ? 'grid-row-[span_4]' : 'grid-row-[span_2]',
    ]"
  >
    <div class="flex items-center gap-3">
      <div class="text-lg font-bold">
        <MDC
          :value="title"
          unwrap="p"
        />
      </div>
      <div
        v-if="recommended && full"
        class="rounded-full bg-(--ui-primary) px-2 py-1 text-sm text-(--ui-primary) font-medium"
      >
        {{ $t('recommended') }}
      </div>
      <div
        v-if="!full"
        class="flex items-end gap-1"
      >
        <div class="text-lg font-600">
          <MDC
            :value="price"
            unwrap="p"
          />
        </div>
        <div
          class="text-base font-medium"
          :class="[!recommended ? 'text-secondary' : 'text-(--ui-primary)-foreground']"
        >
          <MDC
            :value="subprice"
            unwrap="p"
          />
        </div>
      </div>
    </div>
    <div
      v-if="full"
      class="flex items-end gap-3"
    >
      <div class="text-5xl font-bold">
        <MDC
          :value="price"
          unwrap="p"
        />
      </div>
      <div
        class="text-base font-bold"
        :class="[!recommended ? 'text-secondary' : 'text-(--ui-primary)-foreground']"
      >
        <slot
          :value="subprice"
          unwrap="p"
        />
      </div>
    </div>
    <div
      v-if="full"
      class="text-pretty text-sm leading-snug"
    >
      <slot
        :value="subtitle"
        unwrap="p"
      />
    </div>
    <div
      class="flex flex-col gap-2"
      :class="[full ? '' : 'max-h-[46px] overflow-hidden']"
    >
      <slot
        :value="cta"
        unwrap="p"
      />
    </div>
  </div>
</template>
