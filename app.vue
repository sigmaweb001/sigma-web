<script setup lang="ts">

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
  font-family: 'Plus Jakarta Sans', sans-serif;
  @apply p-0 m-0 antialiased;
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
</style>
