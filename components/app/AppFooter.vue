<script lang="ts" setup>
const { locale } = useI18n()
const { data: products } = await useAsyncData('products', () => queryContentLocale('products').find(), { watch: [locale] })
const { data: engines } = await useAsyncData('engines', () => queryContentLocale('engines').find(), { watch: [locale] })
const { data: solutions } = await useAsyncData('solutions', () => queryContentLocale('solutions').find(), { watch: [locale] })
const { data: companies } = await useAsyncData('companies', () => queryContentLocale('companies').find(), { watch: [locale] })
const { data: legal } = await useAsyncData('legal', () => queryContentLocale('legal').find(), { watch: [locale] })

const { data: resources } = await useAsyncData('resources', () => queryContentLocale('resources').where({
  $or: [
    { _dir: { $eq: 'resources' } },
    { _dir: { $eq: '' } },
  ],
}).find(), { watch: [locale] })

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ items: any[] }>()

function getTarget(item: any) {
  const target = item.redirect?.startsWith('https://') ? '_blank' : '_self'
  return target
}
function getPath(item: any) {
  if (item.redirect) {
    const path = item.redirect?.startsWith('https://') ? item.redirect : ensureLocalePath(item.redirect)
    return path
  }
  return item._path
}
</script>

<template>
  <DefineTemplate v-slot="{ items }">
    <NuxtLink
      v-for="item in items.filter(item => item.navigation !== false)" :key="item._path" exact-active-class="text-primary"
      hover="underline underline-primary text-primary" :to="getPath(item)" :target="getTarget(item)"
    >
      {{ item.title }}
    </NuxtLink>
  </DefineTemplate>
  <div class="mt-20 border-b border-t border-gray-200 print:hidden dark:border-trueGray-700">
    <footer class="grid grid-cols-3 gap-10 px-10 py-10 text-15px container lg:grid-cols-5">
      <div class="flex flex-col gap-8px">
        <div class="mb-8px cursor-default text-primary font-600">
          {{ $t('products') }}
        </div>
        <ReuseTemplate :items="products" />
      </div>

      <div class="flex flex-col gap-8px">
        <div class="mb-8px cursor-default text-primary font-600">
          {{ $t('engines') }}
        </div>
        <ReuseTemplate :items="engines" />
      </div>

      <div class="flex flex-col gap-8px">
        <div class="mb-8px cursor-default text-primary font-600">
          {{ $t('solutions') }}
        </div>
        <ReuseTemplate :items="solutions" />
      </div>

      <div class="flex flex-col gap-8px">
        <div class="mb-8px cursor-default text-primary font-600">
          {{ $t('resources') }}
        </div>
        <ReuseTemplate :items="resources" />
      </div>

      <div class="flex flex-col gap-8px">
        <div class="mb-8px cursor-default text-primary font-600">
          {{ $t('cart.company') }}
        </div>
        <ReuseTemplate :items="companies" />
      </div>
    </footer>
  </div>
  <div class="bg-gray-100 py-10 print:hidden dark:bg-trueGray-700">
    <div class="grid grid-cols-3 mb-6 gap-2 px-10 container lg:grid-cols-5">
      <NuxtLink
        v-for="item in legal" :key="item._path" class="text-center text-pretty text-sm font-500"
        exact-active-class="text-primary" hover="underline underline-primary text-primary" :to="getPath(item)"
        :target="getTarget(item)"
      >
        {{ item.title }}
      </NuxtLink>
    </div>
    <footer class="grid grid-cols-2 items-end gap-10 container">
      <div class="left">
        <div>
          <a rel="noopener" target="_blank" class="max-w-320px flex">
            <img src="/thudo_logo.png" alt="logo" class="mr-8px h-50px w-100px">
            <div class="select-none text-13px text-gray-400 font-600 hover:text-primary">
              {{ $t('thu_do_multimedia_communications_joint_stock_company') }}
            </div>
          </a>

          <div class="mt-8px text-13px text-gray-500">
            <div>
              {{ $t('10th_floor_no_48_le_van_luong') }}
            </div>
            <div>
              {{ $t('n1_new_urban_nhan_chinh_ward_thanh_xuan_district_hanoi_vietnam') }}
            </div>

            <div>
              {{ $t('giay_chung_nhan_dang_ky_kinh_doanh_so_0104560888_cap_ngay_29_3_2010_tai_ha_noi') }}
            </div>
          </div>
        </div>
      </div>

      <div class="justify-self-end">
        <div class="flex items-center justify-between py-3">
          <div class="flex gap-3">
            <AppSocialIcons />
          </div>
          <LangSelect />
          <!-- <AppDarkSwitch class="hidden!" /> -->
        </div>

        <div class="mt-8px text-13px text-gray-500">
          <div>
            {{ $t('tel_84_4_3668_7038') }}
          </div>
          <div>
            {{ $t('email_thudojsc_gviet_vn', ['thudojsc@gviet.vn']) }}
          </div>
          <div>
            {{ $t('2023_by_thu_do_multimedia_all_rights_reserved') }}
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
