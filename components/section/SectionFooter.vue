<script lang="ts" setup>


</script>

<template>
  <div class="border-t border-b border-gray-200 dark:border-trueGray-700 mt-20">
    <footer class="container text-15px py-10 grid grid-cols-3 gap-10">
      <div class="flex flex-col gap-8px">
        <p class="font-500 mb-8px cursor-default">
          Resources
        </p>
        <NuxtLink hover="underline underline-primary text-primary" v-for="link in resources" :key="link.path"
          :to="link.path">
          {{ link.title }}
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-8px justify-self-center">
        <p class="font-500 mb-8px cursor-default">
          Company
        </p>
        <NuxtLink hover="underline underline-primary text-primary" to="https://thudomultimedia.com/">
          About us
        </NuxtLink>
        <NuxtLink hover="underline underline-primary text-primary" to="/get-in-touch">
          Contact Us
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-8px justify-self-end">
        <p class="font-500 mb-8px cursor-default">
          Products
        </p>

        <NuxtLink hover="underline underline-primary text-primary" v-for="link in products" :key="link.path"
          :to="link.path">
          {{ link.title }}
        </NuxtLink>
      </div>
    </footer>
  </div>
  <div class="py-5">
    <footer class="container grid grid-cols-2 gap-10">
      <div class="left">
        <div>
          <a rel="noopener" target="_blank" class="flex max-w-250px">
            <img src="/thudo_logo.png" alt="logo" class="w-80px h-50px mr-8px">
            <p class="font-600 text-xs select-none text-gray-400 hover:text-primary">
              Thu Do Multimedia Communications Joint Stock Company
            </p>
          </a>

          <div class="text-xs text-gray-500 mt-8px">
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
        </div>

        <div class="text-xs text-gray-500 mt-8px">
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
