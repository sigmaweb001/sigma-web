<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits<(
  e: 'uploading' | 'success',
  data: { assetId: string, uploadId: string }
) => void>()

const domain = 'https://dev-streaming.gviet.vn:8783/proxy'
const percentage = ref(0)
const isUploading = ref(false)

async function startUpload(file: File) {
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
  <div class="relative w-full aspect-video group">
    <div class="absolute inset-0 bg-gray-900">
      <div class="flex items-center justify-center h-full">
        <div class="text-white text-2xl font-bold">
          Uploading...
        </div>
      </div>
    </div>

    <div
      v-if="percentage > 0 && percentage < 100"
      class="mt-2 text-sm text-gray-600"
    >
      Uploading: {{ percentage }}%
    </div>
    <div
      v-if="percentage === 100"
      class="mt-2 text-sm text-green-600 font-bold"
    >
      Upload complete!
    </div>
  </div>
</template>
