<script lang="ts" setup>
import { Slot } from 'reka-ui'

const props = defineProps<{
  left?: boolean
  tabs?: {
    label: string
    icon: string
    slot: string
  }[]
}>()
console.log('[LOG] ~ props:', props)
</script>

<template>
  <UPageSection
    :ui="{
      container: 'py-4! gap-4 sm:gap-y-4',
      root: left ? 'text-left': '',
    }"
  >
    <template #title>
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </template>

    <template #description>
      <slot
        v-if="$slots.subtitle"
        name="description"
        mdc-unwrap="p"
      />
      <slot
        v-else-if="$slots.description"
        name="description"
        mdc-unwrap="p"
      />
    </template>
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
          class="text-(--ui-text-toned) mb-4 mt-2 text-center"
        >
          {{ tab.description }}
        </p>
        <Slot class="max-h-[50vh] pt-10 ">
          <slot
            :name="tab.slot"
            mdc-unwrap="p"
          />
        </Slot>
      </template>
    </UTabs>
  </UPageSection>
</template>
