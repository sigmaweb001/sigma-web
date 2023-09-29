<script lang="ts" setup>

</script>

<template>
  <div class="mt-20 border-b border-t border-gray-200 dark:border-trueGray-700">
    <footer class="grid grid-cols-3 gap-10 py-10 text-15px container">
      <div class="flex flex-col gap-8px">
        <p class="mb-8px cursor-default font-500">
          Resources
        </p>
        <NuxtLink
          v-for="link in resources" :key="link.path" hover="underline underline-primary text-primary"
          :to="link.path"
        >
          {{ link.title }}
        </NuxtLink>
      </div>

      <div class="flex flex-col justify-self-center gap-8px">
        <p class="mb-8px cursor-default font-500">
          Company
        </p>
        <NuxtLink hover="underline underline-primary text-primary" to="https://thudomultimedia.com/">
          About us
        </NuxtLink>
        <NuxtLink hover="underline underline-primary text-primary" to="/get-in-touch">
          Contact Us
        </NuxtLink>
      </div>

      <div class="flex flex-col justify-self-end gap-8px">
        <p class="mb-8px cursor-default font-500">
          Products
        </p>

        <!-- <NuxtLink
          v-for="link in products" :key="link.path" hover="underline underline-primary text-primary"
          :to="link.path"
        >
          {{ link.title }}
        </NuxtLink> -->
      </div>
    </footer>
  </div>
  <div class="py-5">
    <footer class="grid grid-cols-2 items-end gap-10 container">
      <div class="left">
        <div>
          <a rel="noopener" target="_blank" class="max-w-250px flex">
            <img src="/thudo_logo.png" alt="logo" class="mr-8px h-50px w-100px">
            <p class="select-none text-13px font-600 text-gray-400 hover:text-primary">
              Thu Do Multimedia Communications Joint Stock Company
            </p>
          </a>

          <div class="mt-8px text-13px text-gray-500">
            <p>
              10th floor, No 48 Le Van Luong
            </p>
            <p>
              N1 New Urban, Nhan Chinh Ward, Thanh Xuan District, Hanoi, Vietnam
            </p>
          </div>
        </div>
      </div>

      <div class="justify-self-end">
        <div class="flex justify-between py-3">
          <div class="flex gap-3">
            <AppSocialIcons />
          </div>
          <DarkSwitch />
        </div>

        <div class="mt-8px text-13px text-gray-500">
          <p>
            Tel: (+84) 4 3668 7038
          </p>
          <p>
            Email: thudojsc@gviet.vn
          </p>
          <p>
            2023 by Thu Do Multimedia. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
