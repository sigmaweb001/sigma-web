<script lang="ts" setup>
import type { AListItemEvents, aListItemSlots } from './meta'
import { aListItemProps } from './meta'
import { AAvatar } from '@/components/base/avatar'
import { ATypography } from '@/components/base/typography'
import { type ConfigurableValue, useConfigurable } from '@/composables/useConfigurable'
import { useLayer } from '@/composables/useLayer'

const props = defineProps(aListItemProps)
defineEmits<AListItemEvents>()
defineSlots<typeof aListItemSlots>()

defineOptions({
  name: 'AListItem',
})

const { getLayerClasses } = useLayer()

// TODO: Might need to handle `undefined` as value of `_titleProp`
// ℹ️ Reduce the size of title to 1rem. We did the same in ACard as well.
const _titleProp = useConfigurable(props.title)
if (Array.isArray(_titleProp.value.classes))
  _titleProp.value.classes = [..._titleProp.value.classes, 'text-base']
else
  _titleProp.value.classes += ' text-base'

// useLayer
const { styles, classes } = getLayerClasses(
  computed(() => props.isActive ? (props.color || 'primary') : undefined),
  computed(() => props.isActive ? (props.variant || 'light') : 'text'),
  toRef(props, 'states'),
  { statesClass: 'states:10' },
)
</script>

<template>
  <li :style="styles" class="a-list-item flex items-center" :class="[
    { 'opacity-50 pointer-events-none': props.disabled },
    props.value !== undefined || $attrs.onClick
      ? [...classes, 'cursor-pointer']
      : '',
  ]">
    <slot :item="props">
      <!-- 👉 Slot: prepend -->
      <slot name="prepend" :item="props">
        <i v-if="props.icon && !props.iconAppend" class="text-xl" :class="props.icon" @click="$emit('click:icon')" />
        <AAvatar v-if="props.avatarProps && !props.avatarAppend" v-bind="props.avatarProps"
          @click="$emit('click:avatar')" />
      </slot>
      <!-- 👉 Slot: default slot -->
      <slot name="content" :item="props">
        <ATypography class="flex-grow" :subtitle="props.subtitle" :text="props.text"
          :title="props.title ? Object.values(_titleProp) as ConfigurableValue : undefined" />
      </slot>
      <!-- 👉 Slot: append -->
      <slot name="append" :item="props">
        <i v-if="props.icon && props.iconAppend" class="text-xl" :class="props.icon" @click="$emit('click:iconAppend')" />
        <AAvatar v-if="props.avatarProps && props.avatarAppend" v-bind="props.avatarProps"
          @click="$emit('click:avatarAppend')" />
      </slot>
    </slot>
  </li>
</template>
