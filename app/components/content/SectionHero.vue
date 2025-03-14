<script lang="ts" setup>
import { Slot } from 'reka-ui'
</script>

<template>
  <UPageSection
    :ui="{
      container: 'py-4! gap-4 sm:gap-y-4',
    }"
  >
    <div
      class="grid justify-items-center lg:flex lg:flex-wrap"
    >
      <div class="w-full flex items-center lg:w-3/5 xl:w-1/2 marker:text-(--ui-primary) marker:font-bold">
        <div class="grid mx-auto mb-8 justify-items-center lg:max-w-2xl lg:justify-items-start">
          <h1
            v-if="$slots.title"
            class="pt-5 text-center text-[40px] text-gray-800 font-bold leading-snug tracking-tight lg:text-left lg:text-[50px] lg:leading-tight xl:text-[50px] xl:leading-tight"
          >
            <slot
              name="title"
              mdc-unwrap="p"
            />
          </h1>
          <div
            v-if="$slots.subtitle"
            class="pt-5 text-pretty text-[20px] text-gray-500 leading-normal lg:text-[20px] xl:text-[20px]"
          >
            <slot
              name="subtitle"
              mdc-unwrap="p"
            />
          </div>
          <div class="pt-5">
            <slot />
          </div>
          <div
            v-if="$slots.cta"
            class="mt-4 flex gap-2 items-center"
          >
            <slot
              name="cta"
              mdc-unwrap="p"
            />
          </div>
          <Slot
            v-if="$slots.extra"
            class="text-sm text-gray-500"
          >
            <slot name="extra" />
          </Slot>
        </div>
      </div>

      <div class="relative min-h-[270px] w-full flex items-center justify-center lg:block lg:w-2/5 xl:w-1/2">
        <Slot
          v-if="$slots.image"
          class="absolute inset-0 h-full w-full object-scale-down"
        >
          <slot
            name="image"
            mdc-unwrap="p"
          />
        </Slot>
      </div>
    </div>
  </UPageSection>
</template>
