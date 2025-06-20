<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const emit = defineEmits<{
  (e: 'back'): void
}>()
const url = typeof window !== 'undefined' ? window.location.href : ''
const embedCode = `<iframe width="1120" height="630" src="${url}" frameborder="0" allowfullscreen></iframe>`
const { copy: copyLink, copied: linkCopied } = useClipboard({ source: url })
const { copy: copyEmbed, copied: embedCopied } = useClipboard({ source: embedCode })
const toast = useToast()
function handleCopyLink() {
  copyLink()
  toast.add({ title: 'Đã sao chép link!', color: 'success' })
}
function handleCopyEmbed() {
  copyEmbed()
  toast.add({ title: 'Đã sao chép mã nhúng!', color: 'success' })
}
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center">
    <div class="w-full max-w-md bg-black/60 rounded-3xl shadow-xl p-8 flex flex-col gap-6 relative">
      <!-- Close Button -->
      <UButton
        icon="i-heroicons-x-mark-20-solid"
        variant="subtle"
        color="neutral"
        class="absolute top-4 right-4 !rounded-full"
        aria-label="Đóng"
        @click="emit('back')"
      />
      <!-- Logo and Title -->
      <div class="flex items-center gap-3 justify-center">
        <img
          src="/logo_sigma.png"
          alt="Sigma logo"
          class="h-10"
        >
        <span class="text-2xl font-bold text-white tracking-wide">SIGMA</span>
      </div>
      <div class="text-center">
        <div class="text-xl font-bold text-white mb-1">
          Video của bạn đã sẵn sàng để chia sẻ!
        </div>
        <div class="text-gray-300 text-sm">
          Video kết quả chỉ được lưu trữ trong vòng 24h
        </div>
      </div>
      <!-- Link -->
      <div>
        <div class="text-white font-semibold mb-1 text-sm">
          Link
        </div>
        <div class="flex items-center bg-white/10 rounded-full px-4 py-2">
          <input
            class="flex-1 bg-transparent outline-none text-white text-sm font-mono select-all"
            :value="url"
            readonly
          >
          <button
            class="ml-2 px-2 py-1 rounded hover:bg-white/20 transition flex items-center gap-1"
            @click="handleCopyLink"
          >
            <Icon
              name="i-heroicons-clipboard-document"
              class="w-5 h-5 text-white"
            />
            <span
              v-if="linkCopied"
              class="ml-1 text-xs text-white font-medium"
            >Đã sao chép</span>
            <span
              v-else
              class="ml-1 text-xs text-white font-medium"
            >Copy</span>
          </button>
        </div>
      </div>
      <!-- Iframe Embed -->
      <div>
        <div class="text-white font-semibold mb-1 text-sm">
          Mã nhúng iframe
        </div>
        <div class="flex items-center bg-white/10 rounded-full px-4 py-2">
          <input
            class="flex-1 bg-transparent outline-none text-white text-sm font-mono select-all"
            :value="embedCode"
            readonly
          >
          <button
            class="ml-2 px-2 py-1 rounded hover:bg-white/20 transition flex items-center gap-1"
            @click="handleCopyEmbed"
          >
            <Icon
              name="i-heroicons-clipboard-document"
              class="w-5 h-5 text-white"
            />
            <span
              v-if="embedCopied"
              class="ml-1 text-xs text-white font-medium"
            >Đã sao chép</span>
            <span
              v-else
              class="ml-1 text-xs text-white font-medium"
            >Copy</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  min-width: 0;
}
</style>
