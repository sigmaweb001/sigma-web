<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue'
import { Icon } from '@iconify/vue'

defineProps<{
  checked: boolean
}>()

const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void
}>()

const checkboxOne = ref(false)
</script>

<template>
  <div class="flex flex-col gap-2.5">
    <label class="flex flex-row items-center gap-4 [&>.checkbox]:hover:bg-neutral-100">
      <CheckboxRoot
        v-model:checked="checkboxOne"
        class="peer data-[state=checked]:text-primary-foreground' h-4 w-4 shrink-0 border border-primary rounded-sm ring-offset-background disabled:cursor-not-allowed data-[state=checked]:bg-primary disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
        @update:checked="(val) => emit('update:checked', val)"
      >
        <CheckboxIndicator class="h-full w-full flex items-center justify-center rounded bg-primary">
          <Icon icon="radix-icons:check" class="text-grass11 h-3.5 w-3.5" />
        </CheckboxIndicator>
      </CheckboxRoot>
    </label>
  </div>
</template>
