<script lang="ts" setup>
defineProps<{
  left?: boolean
}>()
</script>

<template>
  <UPageSection
    :ui="{
      container: 'py-4! gap-4 sm:gap-y-4',
    }"
  >
    <div
      class=""
      :class="`flex w-full flex-col my-5 ${left ? '' : 'items-center justify-center text-center'}`"
    >
      <div
        v-if="$slots.subtitle"
        class="text-xl text-(--ui-primary) font-bold tracking-wider uppercase"
      >
        <slot
          name="subtitle"
          mdc-unwrap="p"
        />
      </div>

      <h2
        v-if="$slots.title"
        class="mt-1 max-w-2xl text-3xl text-gray-800 font-bold leading-snug tracking-tight lg:text-4xl lg:leading-tight"
      >
        <slot
          name="title"
          mdc-unwrap="p"
        />
      </h2>
      <div
        v-if="$slots.default"
        class="max-w-2xl py-2 text-start text-lg prose prose-trueGray lg:text-xl xl:text-xl dark:prose-invert"
      >
        <slot />
      </div>
    </div>
  </UPageSection>
</template>
