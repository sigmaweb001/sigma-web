<script lang="ts" setup>
import { ref, computed } from 'vue'

const emit = defineEmits<(
  e: 'uploading' | 'success',
  data: { assetId: string, uploadId: string }
) => void>()

const domain = 'https://dev-streaming.gviet.vn:8783/proxy'
const percentage = ref(0)
const isUploading = ref(false)
const fileRef = ref<File>()

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
const duration = asyncComputed(() => {
  const file = fileRef.value
  if (!file) return ''
  const url = URL.createObjectURL(file)
  const video = document.createElement('video')
  video.preload = 'metadata'

  return new Promise<string>((resolve) => {
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url)
      const secs = Math.floor(video.duration % 60).toString().padStart(2, '0')
      const mins = Math.floor(video.duration / 60).toString().padStart(2, '0')
      resolve(`${mins}:${secs}`)
    }
    video.src = url
  })
})

async function startUpload(file: File) {
  fileRef.value = file
  return
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
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-sky-200/70 via-indigo-300/60 to-fuchsia-400/60 backdrop-blur-2xl">
    <div class="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-0 flex flex-col items-center border border-white/20">
      <!-- Logo and wordmark -->
      <div class="flex flex-col items-center mt-10 mb-6">
        <img
          src="/logo_sigma.png"
          alt="Sigma logo"
          class="h-12 mb-2"
        >
        <div class="flex flex-col items-center">
          <div class="text-white text-xl font-bold">
            Sigma
          </div>
          <div class="text-white text-2xl font-bold">
            Per-Title Encoding
          </div>
        </div>
      </div>
      <!-- File info -->
      <div class="bg-white/10 border border-white/30 rounded-xl px-6 py-4 flex flex-col items-center w-3/4 mb-6">
        <div class="font-semibold text-base text-white truncate w-full text-center">
          {{ fileRef?.name }}
        </div>
        <div class="flex gap-2 text-xs text-white/70 mt-1 justify-center">
          <span>{{ duration }}</span>
          <span>|</span>
          <span>{{ format }}</span>
          <span>|</span>
          <span>{{ size }}</span>
        </div>
      </div>
      <!-- Status text -->
      <div class="text-lg font-semibold text-white mb-4 text-center">
        Đang tải video lên hệ thống ...
      </div>
      <!-- Progress bar -->
      <div class="w-3/4 h-4 bg-white/10 rounded-full overflow-hidden mb-8">
        <div
          class="h-full bg-gradient-to-r from-orange-400 to-orange-300 transition-all duration-500"
          :style="{ width: percentage + '%' }"
        />
      </div>
      <!-- Percentage -->
      <div class="text-sm text-white/80 mb-8">
        {{ percentage }}%
      </div>
      <!-- Bottom tip and button -->
      <div class="w-full bg-gradient-to-t from-black/60 to-transparent rounded-b-3xl px-8 py-6 flex flex-col items-center">
        <div class="text-xs text-white/70 text-center mb-4">
          Bạn đang trong quá trình tải video lên để trải nghiệm tính năng. Vui lòng không thoát hoặc tải lại trang.<br>
          Nếu bạn thoát hoặc tải lại trang, quá trình này sẽ không được tiếp tục.
        </div>
        <button
          class="flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 text-white font-semibold text-sm shadow disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="isUploading"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9l5-5 5 5M12 4v12"
          /></svg>
          Upload video
        </button>
      </div>
    </div>
  </div>
</template>
