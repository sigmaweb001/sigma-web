<script lang="ts" setup>
import { Slot } from 'reka-ui'

const props = defineProps<{
  title?: string
  description?: string
  left?: boolean
  tabs?: {
    label: string
    icon: string
    slot: string
  }[]
}>()
</script>

<template>
  <UPageSection
    :ui="{
      container: 'py-4! gap-4 sm:gap-y-4',
      root: left ? 'text-left': '',
    }"
  >
    <SectionTitle
      v-if="$slots.title || $slots.subtitle || title || description"
      :left="left"
    >
      <template #title>
        <slot
          name="title"
          mdc-unwrap="p"
        >
          {{ title }}
        </slot>
      </template>
      <template #subtitle>
        <slot
          name="subtitle"
          mdc-unwrap="p"
        >
          {{ description }}
        </slot>
      </template>
    </SectionTitle>

    <UTabs
      :items="tabs"
      size="xl"
      :unmount-on-hide="false"
      :ui="{
        list: 'rounded-full bg-(--ui-bg) border border-(--ui-border-accented) w-[unset] min-w-sm',
        indicator: 'rounded-full',
        content: 'w-[unset] mx-auto',
      }"
    >
      <template
        v-for="tab in tabs"
        :key="tab.label"
        #[tab.slot]
      >
        <p
          v-if="tab.description"
          class="mb-4 mt-2 text-center px-10 mx-auto text-pretty"
        >
          <MDC
            :value="tab.description"
            unwrap="p"
          />
        </p>
        <Slot class="max-h-[50vh] pt-1 mx-auto">
          <slot
            :name="tab.slot"
            mdc-unwrap="p"
          />
        </Slot>
      </template>
    </UTabs>
  </UPageSection>
</template>
