<script setup lang="ts">
const { data: categories, pending } = await useSanityData(allCategoryQuery)
const { data: pages, pending: pendingPage } = await useSanityData(allPageQuery)

const showDrawer = useShowDrawer()
</script>

<template>
  <SSheet v-model:open="showDrawer">
    <SSheetTrigger as-child>
      <img src="/logo_sigma.png" alt="LS" class="h-10 w-10 cursor-pointer">
    </SSheetTrigger>
    <SSheetContent>
      <!-- <SSheetHeader>
        <SSheetTitle>Edit profile</SSheetTitle>
        <SSheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SSheetDescription>
      </SSheetHeader> -->
      <div class="grid gap-4">
        <h1 class="text-base font-600">
          Our products
        </h1>
        <ul class="grid m-0 list-none gap-6px" md="grid-cols-2">
          <AppLinkDrawer
            v-for="item in pages.products" :key="item.key"
            :to="getPath('/products', item.slug.current)"
            v-bind="item"
          />
        </ul>
        <div class="my-1 h-1px bg-gray-200 dark:bg-trueGray-700" />
        <h1 class="text-base font-600">
          Our engines
        </h1>
        <ul class="grid m-0 list-none gap-6px" md="grid-cols-2">
          <AppLinkDrawer
            v-for="item in pages.engines" :key="item.key"
            :to="getPath('/products', item.slug.current)"
            v-bind="item"
          />
        </ul>

        <div class="my-1 h-1px bg-gray-200 dark:bg-trueGray-700" />

        <h1 class="text-base font-600">
          Resources
        </h1>

        <ul class="grid grid-flow-row grid-cols-2 m-0 list-none gap-x-12px" md="w-500px">
          <AppLinkDrawer title="All resources" :to="getPath('/resources')" />
          <AppLinkDrawer
            v-for="item in categories" :key="item._id" :title="item.title"
            :to="getPath('/resources', item.slug.current)" :icon="item.icon"
          />
        </ul>
      </div>
      <!-- <SSheetFooter>
        <SSheetClose as-child>
          <button type="submit">
            Save changes
          </button>
        </SSheetClose>
      </SSheetFooter> -->
    </SSheetContent>
  </SSheet>
</template>
