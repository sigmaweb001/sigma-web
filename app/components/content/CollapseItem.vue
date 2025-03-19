<script lang="ts" setup>
import { randomStr } from '@antfu/utils'

const value = randomStr()
</script>

<template>
  <SAccordionItem :value="value">
    <SAccordionTrigger>
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </SAccordionTrigger>
    <SAccordionContent>
      <slot
        name="subtitle"
        mdc-unwrap="p"
      />
    </SAccordionContent>
  </SAccordionItem>
</template>
