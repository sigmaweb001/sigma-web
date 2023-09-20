<script lang="ts" setup>
const { item } = definePropsRefs<{
  item: any
}>()
</script>

<template>
  <DevOnly>
    <div class="fixed right-0 top-0 z-100 max-h-1/2 max-w-1/2 of-auto bg-white">
      <details open>
        <VueJsonPretty :data="item" />
      </details>
    </div>
  </DevOnly>
  <div class="grid justify-items-center py-20 container" xl="flex flex-wrap">
    <div class="w-full flex items-center" xl="w-1/2">
      <div class="grid mx-auto mb-8 justify-items-center tracking-tight" xl="max-w-2xl justify-items-start">
        <h1
          class="text-4xl font-bold leading-snug tracking-tight text-gray-800" lg="text-5xl leading-tight"
          xl="text-6xl leading-tight" dark="text-white"
        >
          {{ item.title }}
        </h1>
        <p class="pt-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
          {{ item.subtitle }}
        </p>

        <div class="prose-li-check prose prose-black">
          <SSanityContent :blocks="item.content" />
        </div>

        <ul class="grid mt-4 gap-4">
          <li class="flex items-center gap-2">
            <span class="h-24px w-24px flex-center rounded-full bg-primary/50">
              <i class="i-ri-check-line text-14px text-primary" />
            </span>
            <span>
              Stream seamlessly. Interact. Monetize. Elevate your content.
            </span>
          </li>
          <li class="flex items-center gap-2">
            <span class="h-24px w-24px flex-center rounded-full bg-primary/50">
              <i class="i-ri-check-line text-14px text-primary" />
            </span>
            <span>
              Unlock potential: Secure hosting, flawless events, API integration. Revenue awaits.
            </span>
          </li>
          <li class="flex items-center gap-2">
            <span class="h-24px w-24px flex-center rounded-full bg-primary/50">
              <i class="i-ri-check-line text-14px text-primary" />
            </span>
            <span>
              Empower your stream: Transcode, interact, monetize. Experience the future.
            </span>
          </li>
        </ul>

        <div class="mt-6 flex flex-col">
          <NuxtLink to="/get-in-touch">
            <SButton size="lg">
              Get demo
            </SButton>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="relative w-full flex items-center justify-center" xl="w-1/2">
      <SNuxtImg
        v-if="item.bgType === 'photo'" :image="item.photos.desktopPhoto" class="relative hidden" lg="block w-1/2"
        xl="w-3/4"
      />
    </div>
  </div>
</template>

<style>
.prose :where(li):not(:where(.not-prose, .not-prose *)) {
  @apply relative not-last:mb-3 list-none pl-2;
}

.prose :where(li):not(:where(.not-prose, .not-prose *))::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M14.4325 11.6836L11.363 9.65648C10.9184 9.36567 10.337 9.68214 10.337 10.2124V14.2666C10.337 14.7969 10.927 15.1133 11.363 14.8225L14.4325 12.7955C14.8344 12.5303 14.8344 11.9487 14.4325 11.6836Z' fill='%23FD841F'/%3E%3Cpath d='M23.9145 10.5545H22.8543H20.0841H18.1176C17.3737 7.86888 14.9284 5.89312 12.0128 5.89312C9.09726 5.89312 6.65194 7.86888 5.92519 10.5545H3.93302C4.61703 6.70566 7.9601 3.78906 12.0043 3.78906C15.0481 3.78906 17.7072 5.44836 19.1265 7.9202H23.2989C21.6316 3.30153 17.2027 4.0681e-05 12.0128 4.0681e-05C5.36943 -0.0170655 0 5.36282 0 11.9915C0 12.5902 0.0427503 13.1803 0.128251 13.7534H1.14571H3.98432H5.89099C6.58354 16.4989 9.06306 18.5431 12.0128 18.5431C14.9626 18.5431 17.4507 16.4989 18.1347 13.7534H20.0071C19.2034 17.4398 15.9202 20.2024 11.9957 20.2024C9.08871 20.2024 6.53224 18.6885 5.07018 16.3963H0.837905C2.59067 20.8439 6.92554 24 12.0043 24C18.6306 24 24 18.6287 24 12C24 11.5039 23.9658 11.025 23.9145 10.5545ZM12.0128 16.6272C9.58461 16.6272 7.601 14.6515 7.601 12.2138C7.601 9.78477 9.57606 7.80045 12.0128 7.80045C14.4496 7.80045 16.4247 9.77622 16.4247 12.2138C16.4247 14.6429 14.4496 16.6272 12.0128 16.6272Z' fill='%23FD841F'/%3E%3C/svg%3E");
  background-size: cover;
  position: absolute;
  display: block;
  top: 4px;
  left: -22px;
  width: 20px;
  height: 20px;
  content: "";
}
</style>
