<script lang="ts" setup>
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const route = useRoute()

const items = computed(() => {
  const products = navigation.value.find(item => item.path === '/products')
  const engines = navigation.value.find(item => item.path === '/engines')

  const solutions = navigation.value.find(item => item.path === '/solutions')

  const resources = navigation.value.find(item => item.path === '/resources')
  return [
    {
      label: products?.title,
      icon: products?.icon,
      active: route.path.startsWith('/products'),
      children: products.children.map(child => ({
        label: child.title,
        description: child.description,
        icon: child.icon,
        path: child.path,
      })),
    },
    {
      label: engines?.title,
      icon: engines?.icon,
      active: route.path.startsWith('/engines'),
      children: engines?.children.map(child => ({
        label: child.title,
        description: child.description,
        icon: child.icon,
        path: child.path,
      })),
    },
    {
      label: solutions?.title,
      icon: solutions?.icon,
      active: route.path.startsWith('/solutions'),
      children: solutions.children.map(child => ({
        label: child.title,
        description: child.description,
        icon: child.icon,
        path: child.path,
      })),
    },
    {
      label: resources?.title,
      icon: resources?.icon,
      to: '/resources',
      active: route.path.startsWith('/resources'),
      children: resources.children.map(child => ({
        label: child.title,
        description: child.description,
        icon: child.icon,
        path: child.path,
      })),
    },
    {
      label: 'Company',
      icon: 'i-lucide-building-2',
      to: '/company',
      active: route.path.startsWith('/company'),
      children: [
        {
          label: 'About us',
          icon: 'i-fluent-mdl2:team-favorite',
          description: 'Learn our story and mission in brief.',
          path: 'https://thudomultimedia.com/',
          target: '_blank',
        },
        {
          label: 'Contact us',
          icon: 'i-mdi-account-circle',
          description: 'Reach out for inquiries, support, or collaboration.',
          path: '/contact',
        },
        {
          label: 'Terms & Policies',
          icon: 'i-mdi-book-open-page-variant-outline',
          description: 'Guidelines and legal information for our services.',
          path: '/legal/terms-of-service',
        },
      ],
    },
  ]
})

const legals = computed(() => {
  return navigation.value.find(item => item.path === '/legal')?.children
})

const localePath = useLocalePath()

function getTarget(item: any) {
  const target = item.redirect?.startsWith('https://') ? '_blank' : '_self'
  return target
}
function getPath(item: any) {
  if (item.redirect) {
    const path = item.redirect?.startsWith('https://') ? item.redirect : localePath(item.redirect)
    return path
  }
  return localePath(item.path)
}
</script>

<template>
  <div class="print:hidden">
    <UFooter class="border-b border-t border-gray-200 ">
      <div class="mt-20 print:hidden">
        <footer class="grid grid-cols-3 gap-10 px-10 py-10 text-[15px] lg:grid-cols-5">
          <div
            v-for="item in items"
            :key="item.label"
            class="flex flex-col gap-[8px]"
          >
            <div class="mb-[8px] cursor-default text-(--ui-primary) font-semibold">
              {{ item.label }}
            </div>

            <ULink
              v-for="child in item.children"
              :key="child.path"
              exact-active-class="text-(--ui-primary)"
              class="hover:underline hover:underline-(--ui-primary) hover:text-(--ui-primary)"
              :to="getPath(child)"
              :target="getTarget(child)"
            >
              {{ child.label }}
            </ULink>
          </div>
        </footer>
      </div>
    </UFooter>

    <div class="bg-gray-100 py-10">
      <UFooter>
        <div class="grid grid-cols-3 mb-6 gap-2 px-10 lg:grid-cols-5 text-center font-medium">
          <ULink
            v-for="child in legals"
            :key="child.path"
            exact-active-class="text-(--ui-primary)"
            class="hover:underline hover:underline-(--ui-primary) hover:text-(--ui-primary) text-sm"
            :to="getPath(child)"
            :target="getTarget(child)"
          >
            {{ child.title }}
          </ULink>
        </div>
      </UFooter>
      <UFooter>
        <footer class="grid grid-cols-2 items-end gap-10">
          <div class="left">
            <div>
              <a
                rel="noopener"
                target="_blank"
                class="max-w-[320px] flex"
              >
                <img
                  src="/thudo_logo.png"
                  alt="logo"
                  class="mr-[8px] h-[50px] w-[100px]"
                >
                <div class="select-none text-[13px] font-600 ">
                  {{ $t('thu_do_multimedia_communications_joint_stock_company') }}
                </div>
              </a>

              <div class="mt-[8px] text-[13px] text-gray-500">
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
            <div class="flex items-center justify-between">
              <a
                href="http://online.gov.vn/Home/WebDetails/113816"
                target="_blank"
              >
                <img
                  class="h-[50px]"
                  alt=""
                  title=""
                  src="/logoSaleNoti.png"
                >
              </a>
              <div class="flex gap-1">
                <AppSocialIcons />
              </div>
            </div>

            <div class="mt-[8px] text-[13px] text-gray-500">
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
      </UFooter>
    </div>
  </div>
</template>
