<script lang="ts" setup>
const props = defineProps<{
  icon?: string
  size?: 'default' | 'small'
}>()

const { icon, size } = toRefs(props)

const small = computed(() => size.value === 'small')
</script>

<template>
  <div
    class="mt-12 flex items-center first:mt-0 space-x-4"
    :class="small && 'mt-[10px] gap-2!'"
  >
    <div
      v-if="$slots.image"
      class="relative mt-1 size-[70px] flex items-center justify-center flex-shrink-0"
    >
      <Slot class="absolute inset-0 h-full w-full object-scale-down">
        <slot
          name="image"
          mdc-unwrap="p"
        />
      </Slot>
    </div>
    <div
      v-else-if="icon"
      class="mt-1 flex flex-shrink-0 items-center justify-center rounded-full bg-(--ui-primary)/20"
      :class="small ? 'size-[45px]' : 'size-[70px]'"
    >
      <UIcon
        :name="icon ?? 'i-ri:article-line'"
        class="text-(--ui-primary)"
        :class="small ? 'size-8 p-1.5' : 'size-12'"
      />
    </div>

    <div>
      <h4
        class="text-xl text-gray-800 font-medium"
        :class="small && 'text-base!'"
      >
        <slot
          name="title"
          mdc-unwrap="p"
        />
      </h4>
      <div
        class="mt-1 text-gray-500"
        :class="small && 'text-sm!'"
      >
        <slot
          name="subtitle"
          mdc-unwrap="p"
        />
      </div>
    </div>
  </div>
</template>
