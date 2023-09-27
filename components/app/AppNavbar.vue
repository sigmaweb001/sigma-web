<script lang="ts" setup>
const currentTrigger = ref('')

const menus = [
  {
    catalog: 'Products',
    children: products,
  },
]
</script>

<template>
  <div class="sticky top-0 z-10 h-64px w-full bg-white shadow" dark="bg-trueGray-900">
    <NavigationMenuRoot
      v-model="currentTrigger" class="relative z-100 hidden w-full"
      md="grid w-full grid-cols-3 items-center container h-full xl:px-5 mx-auto"
    >
      <div class="w-full flex flex-wrap items-center justify-between lg:w-auto">
        <NuxtLink to="/" class="flex items-center text-lg font-medium text-primary space-x-2" dark="text-primary">
          <span>
            <img src="/logo_sigma.png" alt="LS" class="h-10 w-10">
          </span>
          <span class="hidden font-600" lg="inline-block">Sigma Streaming</span>
        </NuxtLink>
      </div>
      <div class="flex justify-center">
        <NavigationMenuList class="m-0 flex list-none">
          <NavigationMenuItem value="1">
            <NavigationMenuTrigger
              class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 outline-none hover:text-primary"
            >
              Products
              <div
                class="i-ri:arrow-down-s-line relative top-[1px] transition-transform duration-[250] ease-in ui-open:rotate-180"
                aria-hidden
              />
            </NavigationMenuTrigger>
            <NavigationMenuContent
              class="shadow-item absolute left-0 top-0 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft"
              md="w-auto"
            >
              <ul class="one grid m-0 list-none gap-x-[10px] p-12px" md="grid-cols-1 w-280px">
                <AppNavMenuItem v-for="item in products" :key="item.key" :to="item.path" :title="item.title" />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem value="2">
            <NavigationMenuTrigger
              class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 outline-none hover:text-primary"
            >
              Resources
              <div
                class="i-ri:arrow-down-s-line relative top-[1px] transition-transform duration-[250] ease-in ui-open:rotate-180"
                aria-hidden
              />
            </NavigationMenuTrigger>
            <NavigationMenuContent class="shadow-item absolute left-0 top-0 w-full" md="w-auto">
              <ul class="grid m-0 list-none gap-12px p-12px" md="grid-cols-2 w-684px">
                <AppNavMenuItem title="All Resources" to="/resources" />
                <AppNavMenuItem title="Blog articles" to="/resources/blog" />
                <AppNavMenuItem title="eBooks & download" to="/resources/blog" />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <!-- <NavigationMenuIndicator
            class="transition-[all,transform_250ms_ease] top-full z-[1] h-[10px] flex items-end justify-center overflow-hidden data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn data-[state=hidden]:opacity-0">
            <div class="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
          </NavigationMenuIndicator> -->
        </NavigationMenuList>

        <div class="absolute left-0 top-full w-full flex perspective-[2000px] justify-center">
          <NavigationMenuViewport
            class="relative h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden border-1px border-gray-200 rounded-8px bg-white shadow-xl transition-width,height duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn dark:border-trueGray-700"
            md="w-[var(--radix-navigation-menu-viewport-width)]" dark="bg-trueGray-800"
          />
        </div>
      </div>

      <div class="hidden justify-self-end gap-3 lg:flex">
        <NuxtLink to="https://portal.sigmaott.com/" external>
          <SButton>
            Login
          </SButton>
        </NuxtLink>

        <DarkSwitch />
      </div>
    </NavigationMenuRoot>
  </div>
</template>
