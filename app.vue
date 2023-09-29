<script setup lang="ts">
import Lenis from '@studio-freight/lenis'

const { $ScrollTrigger, $gsap } = useNuxtApp()

onMounted(() => {
  const lenis = new Lenis()
  lenis.on('scroll', $ScrollTrigger.update)

  $gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  $gsap.ticker.lagSmoothing(0)
})
</script>

<template>
  <!-- <VitePwaManifest /> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --color-primary: #FD841F;
  --color-primary-50: #FFE8D5;
  --color-primary-100: #FEDDC1;
  --color-primary-200: #FEC798;
  --color-primary-300: #FEB070;
  --color-primary-400: #FD9A47;
  --color-primary-500: #FD841F;
  --color-primary-600: #E26802;
  --color-primary-700: #AA4E02;
  --color-primary-800: #733501;
  --color-primary-900: #3B1B01;

  --color-secondary: #800080;
  --color-secondary-50: #F2E2F2;
  --color-secondary-100: #E5B4E5;
  --color-secondary-200: #BF80BF;
  --color-secondary-300: #993F99;
  --color-secondary-400: #732673;
  --color-secondary-500: #4C004C;
  --color-secondary-600: #330033;
  --color-secondary-700: #190019;
  --color-secondary-800: #0C000C;
  --color-secondary-900: #050005;

  --header-h: 48px;
  --footer-h: 48px;
}

html,
body,
#__nuxt {
  height: 100dvh;
  font-family: 'Inter', sans-serif;
  /* font-family: 'Anek Latin', sans-serif; */
  @apply p-0 m-0 antialiased;
}

html.lenis {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}

html.dark {
  @apply bg-trueGray-900 text-white;
}

:root {
  --background: 0, 0%, 100%;
  --foreground: 222.2, 47.4%, 11.2%;

  --muted: 210, 40%, 96.1%;
  --muted-foreground: 215.4, 16.3%, 46.9%;

  --popover: 0, 0%, 100%;
  --popover-foreground: 222.2, 47.4%, 11.2%;

  --border: 214.3, 31.8%, 91.4%;
  --input: 214.3, 31.8%, 91.4%;

  --card: 0, 0%, 100%;
  --card-foreground: 222.2, 47.4%, 11.2%;

  --primary: 27, 98%, 56%;
  --primary-foreground: 210, 40%, 98%;

  --secondary: 210, 40%, 96.1%;
  --secondary-foreground: 222.2, 47.4%, 11.2%;

  --accent: 210, 40%, 96.1%;
  --accent-foreground: 222.2, 47.4%, 11.2%;

  --destructive: 0, 100%, 50%;
  --destructive-foreground: 210, 40%, 98%;

  --ring: 215, 20.2%, 65.1%;

  --radius: 0.5rem;
}

html.dark {
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;

  --muted: 223 47% 11%;
  --muted-foreground: 215.4 16.3% 56.9%;

  --accent: 216 34% 17%;
  --accent-foreground: 210 40% 98%;

  --popover: 224 71% 4%;
  --popover-foreground: 215 20.2% 65.1%;

  --border: 216 34% 17%;
  --input: 216 34% 17%;

  --card: 224 71% 4%;
  --card-foreground: 213 31% 91%;

  --primary: 27, 98%, 56%;
  --primary-foreground: 210, 40%, 98%;

  --secondary: 222.2 47.4% 11.2%;
  --secondary-foreground: 210 40% 98%;

  --destructive: 0 63% 31%;
  --destructive-foreground: 210 40% 98%;

  --ring: 216 34% 17%;

  --radius: 0.5rem;
}

html.dark .shiki,
html.dark .shiki span {
  background-color: var(--shiki-dark-bg) !important;
  color: var(--shiki-dark) !important;
}

/* SECTION */
.prose-li-sigma :where(li):not(:where(.not-prose, .not-prose *)) {
  @apply relative not-last:mb-3 list-none pl-2;
}

.prose-li-sigma :where(li):not(:where(.not-prose, .not-prose *))::before {
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

.prose-img-w-full :where(img,video):not(:where(.not-prose,.not-prose *)) {
  width: 100%;
}

/* SECTION */
</style>
