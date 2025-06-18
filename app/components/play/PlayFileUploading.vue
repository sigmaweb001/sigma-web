<script lang="ts" setup>
import { ref, computed } from 'vue'
import { asyncComputed } from '@vueuse/core'

const emit = defineEmits<(
  e: 'upload' | 'success',
  data: { assetId: string, uploadId: string }
) => void>()

const domain = 'https://dev-streaming.gviet.vn:8783/proxy'
const percentage = ref(0)
const isUploading = ref(false)
const fileRef = ref<File>()

// Error state
const uploadError = ref<string | null>(null)

function getFileFormat(file: File | undefined) {
  if (!file) return ''
  if (file.type && file.type.includes('/')) {
    return file.type.split('/')[1].toUpperCase()
  }
  const match = file.name.match(/\.([a-zA-Z0-9]+)$/)
  return match ? match[1].toUpperCase() : ''
}

function getFileSize(file: File | undefined) {
  if (!file) return ''
  const s = file.size
  if (s < 1024) return s + ' B'
  if (s < 1024 * 1024) return (s / 1024).toFixed(1) + ' KB'
  if (s < 1024 * 1024 * 1024) return (s / (1024 * 1024)).toFixed(1) + ' MB'
  return (s / (1024 * 1024 * 1024)).toFixed(1) + ' GB'
}

const format = computed(() => getFileFormat(fileRef.value))
const size = computed(() => getFileSize(fileRef.value))

// Async computed for duration
const duration = asyncComputed(async () => {
  const file = fileRef.value
  if (!file) return ''
  const url = URL.createObjectURL(file)
  const video = document.createElement('video')
  video.preload = 'metadata'
  return await new Promise<string>((resolve) => {
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url)
      const secs = Math.floor(video.duration % 60).toString().padStart(2, '0')
      const mins = Math.floor(video.duration / 60).toString().padStart(2, '0')
      resolve(`${mins}:${secs}`)
    }
    video.src = url
  })
}, '')

async function startUpload(file: File) {
  fileRef.value = file
  uploadError.value = null

  const item = {
    file,
    name: file.name,
    controller: new AbortController(),
  }
  try {
    isUploading.value = true
    percentage.value = 0
    // 1. Create multipart upload
    const data = await $fetch<{ assetId: string, uploadId: string }>(
      '/api/library/assets/create-multipart-upload',
      {
        baseURL: domain,
        method: 'POST',
        body: {
          name: item.name,
          originFileName: item.file.name,
          category: 'Promo Video',
        },
      },
    )
    const { assetId, uploadId } = data
    percentage.value = 10
    // 2. Upload file in chunks
    await uploadMultipartFile(assetId, uploadId, item)
    emit('success', { assetId, uploadId })
  }
  catch (err) {
    console.error('Upload error:', err)
    uploadError.value = 'Upload failed!'
  }
  finally {
    isUploading.value = false
    percentage.value = 0
  }
}

defineExpose({
  startUpload,
})

async function uploadMultipartFile(assetId: string, uploadId: string, item: { file: File, controller: AbortController }) {
  const FILE_CHUNK_SIZE = 10000000 // 10MB
  const fileSize = item.file.size
  const NUM_CHUNKS = Math.floor(fileSize / FILE_CHUNK_SIZE) + 1
  const uploadPartsArray: { ETag: string | null, PartNumber: number }[] = []
  for (let index = 1; index < NUM_CHUNKS + 1; index++) {
    const start = (index - 1) * FILE_CHUNK_SIZE
    const end = index * FILE_CHUNK_SIZE
    const blob = index < NUM_CHUNKS
      ? item.file.slice(start, end)
      : item.file.slice(start)
    // 1. Get presigned URL for this chunk
    const getUploadUrlResp = await $fetch<{ preSignUrl: string }>(
      '/api/library/assets/presign-multipart-upload-url',
      {
        baseURL: domain,
        method: 'POST',
        body: {
          assetId,
          partNumber: index,
          uploadId,
        },
        signal: item.controller.signal,
      },
    )
    const { preSignUrl } = getUploadUrlResp
    // 2. Upload the chunk
    const uploadResp = await $fetch.raw(preSignUrl, {
      baseURL: domain,
      method: 'PUT',
      body: blob,
      signal: item.controller.signal,
    })
    uploadPartsArray.push({
      ETag: uploadResp.headers.get('ETag'),
      PartNumber: index,
    })
    percentage.value = Math.round((index / NUM_CHUNKS) * 100)
  }
  // 3. Complete the upload
  await $fetch('/api/library/assets/complete-multipart-upload', {
    baseURL: domain,
    method: 'POST',
    body: {
      assetId,
      uploadId,
      parts: uploadPartsArray,
    },
    signal: item.controller.signal,
  })
  percentage.value = 100
}

function open() {
  emit('upload')
}
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center ">
    <div class="w-full max-w-2xl bg-black/60 rounded-3xl shadow-xl p-11 flex flex-col gap-6 items-center">
      <!-- Logo and wordmark -->
      <div class="flex gap-3 items-center">
        <img
          src="/logo_sigma.png"
          alt="Sigma logo"
          class="h-12"
        >
        <div class="flex flex-col items-start">
          <div class="text-white text-xl font-semibold">
            Sigma
          </div>
          <div class="text-white text-3xl font-extrabold">
            Per-Title Encoding
          </div>
        </div>
      </div>
      <!-- File info -->
      <div
        class="bg-transparent border rounded-xl px-4 py-3 flex flex-col w-4/5"
        :class="[
          uploadError ? 'border-red-500' : 'border-white/40',
        ]"
      >
        <div class="font-semibold text-base text-white truncate">
          {{ fileRef?.name }}
        </div>
        <div class="flex gap-2 text-xs text-gray-300 mt-2 ">
          <span>{{ duration }}</span>
          <span>|</span>
          <span>{{ format }}</span>
          <span>|</span>
          <span>{{ size }}</span>
        </div>
      </div>
      <!-- Status text -->
      <div
        v-if="uploadError"
        class="text-red-500 font-semibold text-sm flex justify-start w-4/5 gap-2"
      >
        <Icon
          name="i-ri:close-circle-line"
          class="text-red-500 size-6"
        />
        Quá trình tải video lên thất bại.
      </div>
      <template v-else>
        <div :class="['text-xl font-bold text-center', 'text-white flex items-end gap-1']">
          <span>Đang tải video lên hệ thống</span>
          <Icon
            name="i-svg-spinners:3-dots-fade"
          />
        </div>
        <!-- Progress bar -->
        <div class="relative h-4 w-4/5 rounded-full overflow-hidden">
          <!-- Striped background -->
          <div class="absolute inset-0 rounded-full bg-[repeating-linear-gradient(120deg,#222_0_40px,#333_40px_80px)] z-0" />
          <!-- Progress fill -->
          <div
            class="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#FFA726] to-[#FFB74D] transition-all duration-500 z-10"
            :style="{ width: percentage + '%' }"
          />
        </div>
      </template>
      <!-- Bottom tip and button -->
      <div
        v-if="uploadError"
        class="w-full flex flex-col items-center gap-6"
      >
        <UButton
          color="primary"
          size="md"
          class="flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black font-semibold text-sm shadow disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="isUploading"
          @click="open()"
        >
          <Icon
            name="i-heroicons-arrow-up-tray-20-solid"
            class="w-5 h-5"
          />
          Tải lại video
        </UButton>

        <div class="text-xs text-gray-300 text-center mb-6">
          Bạn muốn tải video lên nhanh hơn để sớm trải nghiệm?
          <a
            href="https://portal.sigma.video/auth/signup"
            class="underline"
            target="_blank"
          > Nhấn vào đây</a>
        </div>
      </div>

      <div
        v-else
        class="w-full flex flex-col items-center"
      >
        <div class="text-xs text-gray-300 text-center mb-6">
          Bạn đang trong quá trình tải video lên để trải nghiệm tính năng. Vui lòng không thoát hoặc tải lại trang.<br>
          Nếu bạn thoát hoặc tải lại trang, quá trình này sẽ không được tiếp tục.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-stripes {
  background: repeating-linear-gradient(
    120deg,
    #222 0 40px,
    #333 40px 80px
  );
}
</style>
