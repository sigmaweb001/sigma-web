<script lang="ts" setup>
import { ATypography } from '../typography'
import type { aCardSlots } from './meta'
import { aCardProps, aCardTypographySlots } from './meta'
import { ALoader } from '@/components/base/loader'
import { isTypographyUsed } from '@/components/base/typography/utils'
import { type ConfigurableValue, useConfigurable } from '@/composables/useConfigurable'
import { useLayer } from '@/composables/useLayer'

const props = defineProps(aCardProps)
defineSlots<typeof aCardSlots>()

defineOptions({
  name: 'ACard',
})

const slots = useSlots()
console.log('[LOG] ~ file: ACard.vue:18 ~ slots:', slots)

const { getLayerClasses } = useLayer()
const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  toRef(props, 'states'),
)

const _isTypographyUsed = isTypographyUsed(toRefs(props), slots)

// Modify text prop to have `text-sm`
const _textProp = useConfigurable(toRef(props, 'text'))
if (_textProp.value.classes === undefined)
  _textProp.value.classes = 'text-sm'
else if (Array.isArray(_textProp.value.classes))
  _textProp.value.classes = [..._textProp.value.classes, 'text-sm']
else
  _textProp.value.classes = ' text-sm'
</script>

<template>
  <div
    class="a-card relative overflow-hidden bg-[hsla(var(--a-surface-c),var(--un-bg-opacity,1))]"
    :class="classes"
    :style="styles"
  >
    <!-- 👉 Loader  -->
    <!--
        ℹ️ We have intentionally placed loader on top.
        Because we have card content style based on last child pseudo selector.
    -->
    <ALoader
      v-if="typeof props.loading !== 'undefined'"
      v-bind="typeof props.loading === 'boolean' ? { loading: props.loading } : props.loading"
    />

    <!-- 👉 Image -->
    <img
      v-if="props.img"
      :src="props.img"
      :alt="props.imgAlt"
    >

    <!-- 👉 Typography -->
    <!-- <div
      v-if="_isTypographyUsed"
      class="a-card-typography-wrapper"
    >
      <ATypography
        :title="props.title"
        :subtitle="props.subtitle"
        :text="Object.values(_textProp) as ConfigurableValue"
      >
        <template
          v-for="(_, name) in aCardTypographySlots"
          #[name]="slotProps"
        >
          <slot
            :name="name"
            v-bind="slotProps"
          />
        </template>
      </ATypography>
    </div> -->

    <slot />
  </div>
</template>
