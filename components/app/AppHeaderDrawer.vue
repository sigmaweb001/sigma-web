<script setup lang="ts">
const filtered = computed(() => [])

const links = computed(() => {
  return ([]).filter((item: any) => {
    if (filtered.value.includes(item._path))
      return false
    return true
  })
})

const { visible, open, close } = useMenu()

watch(visible, v => (v ? open() : close()))
</script>

<template>
  <Sheet class="w-full border-r border-gray-200 bg-white">
    <SheetTrigger>
      <button aria-label="Menu" class="relative z-10 flex p-4 text-gray-500 lg:hidden hover:text-gray-700">
        <div class="i-carbon:menu h-4 w-4" aria-hidden="true" />
      </button>
    </SheetTrigger>
    <SheetContent side="left">
      <SheetHeader class="flex items-center justify-between gap-4 border-b border-gray-200 px-4">
        <div class="icons flex items-center overflow-auto">
          <AppSocialIcons />
        </div>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
