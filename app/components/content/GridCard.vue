<script lang="ts" setup>
import { Slot } from 'reka-ui'

const props = defineProps<{
  span?: number
  icon?: string
  left?: boolean
  padding?: number
}>()

const slot = useSlots()
const rowSpan = computed(() => {
  let rowSpan = 1
  if (slot.title)
    rowSpan++
  if (slot.subtitle)
    rowSpan++
  if (slot.default)
    rowSpan++
  if (slot.cta)
    rowSpan++
  return rowSpan
})
</script>

<template>
  <UPageCard
    v-bind="props"
    :ui="{
      root: left ? 'text-left rounded-2xl' : 'text-center rounded-2xl',
      leadingIcon: 'size-17 p-1',
    }"
    spotlight
    variant="subtle"
  >
    <template
      v-if="$slots.image"
      #header
    >
      <Slot class="size-18 mx-auto">
        <slot
          name="image"
          mdc-unwrap="p"
        />
      </Slot>
    </template>

    <template #title>
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </template>

    <template #description>
      <slot
        v-if="$slots.description"
        name="description"
        mdc-unwrap="p"
      />
      <slot
        v-if="$slots.subtitle"
        name="subtitle"
        mdc-unwrap="p"
      />
      <slot
        v-else
        name="default"
        mdc-unwrap="p"
      />
    </template>

    <template #default>
      <div
        v-if="$slots.cta"
        class="mx-auto text-[15px/22px]"
      >
        <slot
          name="cta"
          mdc-unwrap="p"
        />
      </div>
    </template>
  </UPageCard>
</template>
