<script setup lang="ts">
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'

const { locale, setLocale } = useI18n()

const options = [{ value: 'en', label: 'English' }, { value: 'vi', label: 'Tiếng Việt' }]
</script>

<template>
  <SelectRoot :model-value="locale" @update:model-value="setLocale">
    <SelectTrigger
      class="h-36px w-140px flex items-center justify-between whitespace-nowrap border border-input rounded-md bg-background px-3 py-2 text-sm ring-offset-background [&>span]:min-w-0 disabled:cursor-not-allowed [&>span]:truncate placeholder:text-muted-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      <SelectValue placeholder="" />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] min-w-[160px] rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        :side-offset="2"
      >
        <SelectScrollUpButton class="h-[25px] flex cursor-default items-center justify-center bg-white">
          <Icon name="radix-icons:chevron-up" />
        </SelectScrollUpButton>

        <SelectViewport class="p-4px">
          <SelectGroup>
            <SelectItem
              v-for="(option, index) in options" :key="index" as-child
              class="relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-sm leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-primary data-[highlighted]:text-green1 data-[highlighted]:outline-none"
              :value="option.value"
            >
              <SelectItemText>
                {{ option.label }}
              </SelectItemText>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>

        <SelectScrollDownButton class="h-[25px] flex cursor-default items-center justify-center bg-white">
          <Icon name="radix-icons:chevron-down" />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
