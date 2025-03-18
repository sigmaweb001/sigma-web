<script setup lang="ts">
import { en, vi } from '@nuxt/ui/locale'

const { locale, loadLocaleMessages } = useI18n()

const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()

async function updateLocale(value: string) {
  await router.push(localePath(route.path))

  window.location.reload()
}
</script>

<template>
  <ULocaleSelect
    v-model="locale"
    size="sm"
    class="invisible xl:visible"
    :locales="[en, vi]"
    @update:model-value="updateLocale"
  />
</template>
