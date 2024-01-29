<script lang="ts" setup>
const { data: legal } = await useAsyncData(withLocale('legal'), () => queryContent('legal').find())

function printContent() {
  window.print()
}

const localPath = useLocalePath()
const legelLinks = useLegalLinks()
</script>

<template>
  <div class="mx-auto container">
    <h2 class="pb-6 pt-10 font-700">
      Terms & Policies
    </h2>
    <div class="flex gap-5" xl="gap-10">
      <div class="w-256px py-10 print:hidden">
        <div class="flex flex-col gap-2">
          <NuxtLink
            v-for="itemL in legal" :key="localPath(itemL._path)" exact-active-class="text-primary underline"
            class="text-base font-500 hover:(text-primary underline)" :to="itemL._path"
          >
            {{ itemL.title }}
          </NuxtLink>
        </div>
        <div class="mx-1 mt-3 h-1px bg-gray-200 dark:bg-trueGray-700" />
        <div class="sticky top-[calc(var(--header-height))] w-full self-start">
          <div class="pt-3 font-sans">
            <Toc class="border-border rounded-xl bg-background text-sm">
              <template #title>
                <div class="text-base font-semibold">
                  Table of Contents
                </div>
              </template>

              <TocLinks v-slot="{ link }" class="ml-4" :links="legelLinks">
                <div class="my-2 block hover:underline">
                  {{ link.text }}
                </div>
              </TocLinks>
            </Toc>
          </div>
        </div>
      </div>
      <div class="relative mx-3 mx-auto my-3 max-w-85ch flex-1 pt-6 prose prose-trueGray dark:prose-invert">
        <slot />
        <SButton variant="outline" class="absolute right-0 top-0 print:hidden rounded-full!" @click="printContent">
          <Icon name="material-symbols:print-outline-rounded" class="mr-2 size-5" />
          Print page
        </SButton>
      </div>
    </div>
  </div>
</template>
