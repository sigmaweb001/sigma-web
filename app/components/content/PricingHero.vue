<script lang="ts" setup>

</script>

<template>
  <div class="w-full py-5">
    <div class="grid mx-auto justify-items-center container lg:flex lg:flex-wrap">
      <div class="w-full flex items-start lg:w-3/5">
        <div class="grid justify-items-center lg:max-w-2xl lg:justify-items-start">
          <h1
            v-if="$slots.title"
            class="pt-5 text-[34px] text-gray-800 font-bold leading-snug tracking-tight lg:text-[34px] lg:leading-tight"
          >
            <slot
              name="title"
              mdc-unwrap="p"
            />
          </h1>
          <div
            v-if="$slots.subtitle"
            class="pt-2 text-pretty text-[20px] text-gray-500 leading-normal lg:text-[20px] xl:text-[20px]"
          >
            <slot
              name="subtitle"
              mdc-unwrap="p"
            />
          </div>
          <slot />
          <div
            v-if="$slots.cta"
            class="mt-4 flex gap-2"
          >
            <slot
              name="cta"
              mdc-unwrap="p"
            />
          </div>
          <Slot
            v-if="$slots.extra"
            class="text-sm text-gray-500 dark:text-gray-300"
          >
            <slot name="extra" />
          </Slot>
        </div>
      </div>
      <div class="relative min-h-[230px] w-full flex items-center justify-center lg:w-2/5">
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
  </div>
</template>
