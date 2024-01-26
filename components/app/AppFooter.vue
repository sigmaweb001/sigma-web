<script lang="ts" setup>
const { locale } = useI18n()

const { data: products } = await useAsyncData(withLocale('products'), () => queryContent(withLocale('products')).find())
const { data: engines } = await useAsyncData(withLocale('engines'), () => queryContent(withLocale('engines')).find())
const { data: solutions } = await useAsyncData(withLocale('solutions'), () => queryContent(withLocale('solutions')).find())
const { data: companies } = await useAsyncData(withLocale('companies'), () => queryContent(withLocale('companies')).find())
const { data: legal } = await useAsyncData(withLocale('legal'), () => queryContent(withLocale('legal')).find())

const { data: resources } = await useAsyncData(withLocale('resources'), () => queryContent(withLocale('resources')).where({
  $or: [
    { _dir: { $eq: withLocale('resources') } },
    { _dir: { $eq: '' } },
  ],
}).find())

const options = [{ value: 'en', label: 'English' }, { value: 'vi', label: 'Tiếng Việt' }]
const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ items: any[] }>()

const localPath = useLocalePath()
</script>

<template>
  <DefineTemplate v-slot="{ items }">
    <NuxtLink
      v-for="item in items" :key="item._path" hover="underline underline-primary text-primary"
      :to="localPath(item._path)"
    >
      {{ item.title }}
    </NuxtLink>
  </DefineTemplate>
  <div class="mt-20 border-b border-t border-gray-200 print:hidden dark:border-trueGray-700">
    <footer class="grid grid-cols-3 gap-10 px-10 py-10 text-15px container lg:grid-cols-5">
      <div class="flex flex-col gap-8px">
        <div class="mb-8px cursor-default text-primary font-500">
          Products
        </div>
        <ReuseTemplate :items="products" />
      </div>

      <div class="flex flex-col gap-8px">
        <div class="mb-8px cursor-default text-primary font-500">
          Engines
        </div>
        <ReuseTemplate :items="engines" />
      </div>

      <div class="flex flex-col gap-8px">
        <div class="mb-8px cursor-default text-primary font-500">
          Solutions
        </div>
        <ReuseTemplate :items="solutions" />
      </div>

      <div class="flex flex-col gap-8px">
        <div class="mb-8px cursor-default text-primary font-500">
          Resources
        </div>
        <ReuseTemplate :items="resources" />
      </div>

      <div class="flex flex-col gap-8px">
        <div class="mb-8px cursor-default text-primary font-500">
          Company
        </div>
        <ReuseTemplate :items="companies" />
        <ReuseTemplate :items="legal" />
      </div>
    </footer>
  </div>
  <div class="py-10 print:hidden">
    <footer class="grid grid-cols-2 items-end gap-10 container">
      <div class="left">
        <div>
          <a rel="noopener" target="_blank" class="max-w-250px flex">
            <img src="/thudo_logo.png" alt="logo" class="mr-8px h-50px w-100px">
            <div class="select-none text-13px text-gray-400 font-600 hover:text-primary">
              Thu Do Multimedia Communications Joint Stock Company
            </div>
          </a>

          <div class="mt-8px text-13px text-gray-500">
            <div>
              10th floor, No 48 Le Van Luong
            </div>
            <div>
              N1 New Urban, Nhan Chinh Ward, Thanh Xuan District, Hanoi, Vietnam
            </div>
          </div>
        </div>
      </div>

      <div class="justify-self-end">
        <div class="flex items-center justify-between py-3">
          <div class="flex gap-3">
            <AppSocialIcons />
          </div>
          <LangSelect v-model="locale" :options="options" class="h-36px w-140px!" />
          <!-- <AppDarkSwitch class="hidden!" /> -->
        </div>

        <div class="mt-8px text-13px text-gray-500">
          <div>
            Tel: (+84) 4 3668 7038
          </div>
          <div>
            Email: thudojsc@gviet.vn
          </div>
          <div>
            2023 by Thu Do Multimedia. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
