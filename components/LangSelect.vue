<script setup lang="ts">
const { locale, setLocale } = useI18n()

const options = [{ value: 'en', label: 'EN' }, { value: 'vi', label: 'VI' }]
</script>

<template>
  <SSelect :model-value="locale" @update:model-value="setLocale">
    <SelectTrigger
      class="h-36px flex items-center justify-between rounded-md bg-background px-3 py-2 text-sm ring-offset-background [&>span]:line-clamp-1 disabled:cursor-not-allowed placeholder:text-muted-foreground disabled:opacity-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-ring"
    >
      <SSelectValue placeholder="Lang" />
      <SelectIcon as-child>
        <div i-lucide:chevron-down class="h-4 w-4 text-foreground opacity-50" />
      </SelectIcon>
    </SelectTrigger>
    <SSelectContent class="min-w-16">
      <SelectItem
        v-for="item in options" :key="item.value" :value="item.value" :class="cn(
          'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-6 pl-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',

        )
        "
      >
        <SelectItemText>
          {{ item.label }}
        </SelectItemText>

        <span class="absolute right-2 h-3.5 w-3.5 flex items-center justify-center">
          <SelectItemIndicator>
            <div i-lucide:check class="h-4 w-4" />
          </SelectItemIndicator>
        </span>
      </SelectItem>
    </SSelectContent>
  </SSelect>
</template>
