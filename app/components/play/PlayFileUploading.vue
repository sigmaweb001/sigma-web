<script lang="ts" setup>
import { ref, computed } from 'vue'
import { asyncComputed } from '@vueuse/core'

const emit = defineEmits<(
  e: 'uploading' | 'success',
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
  // return
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
    emit('uploading', { assetId, uploadId })
    percentage.value = 10
    // 2. Upload file in chunks
    await uploadMultipartFile(assetId, uploadId, item)
    emit('success', { assetId, uploadId })
  }
  catch (err) {
    console.error('Upload error:', err)
    alert('Upload failed!')
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
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center ">
    <div class="w-full max-w-3xl bg-black/60 rounded-3xl shadow-xl p-12 flex flex-col gap-6 items-center">
      <!-- Error message -->
      <div
        v-if="uploadError"
        class="w-full text-center text-red-500 font-semibold text-base mb-2"
      >
        {{ uploadError }}
      </div>
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
      <div class="bg-transparent border border-white/40 rounded-xl px-4 py-3 flex flex-col items-center w-3/4">
        <div class="font-semibold text-base text-white truncate w-full text-center">
          {{ fileRef?.name }}
        </div>
        <div class="flex gap-2 text-xs text-gray-300 mt-2 justify-center">
          <span>{{ duration }}</span>
          <span>|</span>
          <span>{{ format }}</span>
          <span>|</span>
          <span>{{ size }}</span>
        </div>
      </div>
      <!-- Status text -->
      <div :class="['text-2xl font-bold text-center', uploadError ? 'text-red-500' : 'text-white']">
        Đang tải video lên hệ thống ...
      </div>
      <!-- Progress bar -->
      <div class="h-4 w-3/4 bg-gray-800 rounded-full overflow-hidden mb-2">
        <div
          :class="uploadError
            ? 'h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-500'
            : 'h-full bg-gradient-to-r from-[#FFA726] to-[#FFB74D] transition-all duration-500'"
          :style="{ width: percentage + '%' }"
        />
      </div>
      <!-- Bottom tip and button -->
      <div class="w-full flex flex-col items-center">
        <div class="text-xs text-gray-300 text-center mb-6">
          Bạn đang trong quá trình tải video lên để trải nghiệm tính năng. Vui lòng không thoát hoặc tải lại trang.<br>
          Nếu bạn thoát hoặc tải lại trang, quá trình này sẽ không được tiếp tục.
        </div>
        <UButton
          color="primary"
          size="md"
          class="flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 text-white font-semibold text-sm shadow disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="isUploading || !!uploadError"
        >
          <Icon
            name="i-heroicons-arrow-up-tray-20-solid"
            class="w-5 h-5"
          />
          Upload video
        </UButton>
      </div>
    </div>
  </div>
</template>
