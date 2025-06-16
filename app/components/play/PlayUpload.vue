<script lang="ts" setup>
import { useFileDialog } from '@vueuse/core'
import { joinURL } from 'ufo'

const domain = 'https://dev-streaming.gviet.vn:8783/proxy'

const { files, open, reset, onCancel, onChange } = useFileDialog({
  accept: 'video/*',
  directory: false,
})

onChange((newFiles) => {
  if (newFiles.length > 0) {
    console.log('File selected:', newFiles[0])
    startUpload(newFiles[0])
  }
})

async function startUpload(file: File) {
  // You may want to add more metadata as needed
  const item = {
    file,
    name: file.name,
    controller: new AbortController(),
  }
  try {
    // 1. Create multipart upload
    const data = await $fetch('/api/library/assets/create-multipart-upload', {
      baseURL: domain,
      method: 'POST',
      body: {
        name: item.name,
        originFileName: item.file.name,
        category: 'Promo Video',
        // add more fields if needed
      },

    })

    const { assetId, uploadId } = data

    // 2. Upload file in chunks
    await uploadMultipartFile(assetId, uploadId, item)
    // 3. Done!
    // Optionally emit success or update UI
  }
  catch (err) {
    console.error('Upload error:', err)
  }
}

async function uploadMultipartFile(assetId: string, uploadId: string, item: any) {
  const FILE_CHUNK_SIZE = 10000000 // 10MB
  const fileSize = item.file.size
  const NUM_CHUNKS = Math.floor(fileSize / FILE_CHUNK_SIZE) + 1

  const promisesArray = []
  let start, end, blob
  for (let index = 1; index < NUM_CHUNKS + 1; index++) {
    const start = (index - 1) * FILE_CHUNK_SIZE
    const end = index * FILE_CHUNK_SIZE
    const blob = index < NUM_CHUNKS
      ? item.file.slice(start, end)
      : item.file.slice(start)

    // 1. Get presigned URL for this chunk
    const getUploadUrlResp = await $fetch('/api/library/assets/presign-multipart-upload-url', {
      baseURL: domain,
      method: 'POST',
      body: {
        assetId,
        partNumber: index,
        uploadId,
      },
      signal: item.controller.signal,
    })

    const { preSignUrl } = getUploadUrlResp
    // const preSignUrlWithHost = getAssetURI(preSignUrl, ensureSuffix('/', assetDomain))

    // 2. Upload the chunk
    const uploadResp = $fetch.raw(preSignUrl, {
      baseURL: domain,
      method: 'PUT',
      body: blob,
      signal: item.controller.signal,
    })
    promisesArray.push(uploadResp)

    // Optionally update progress here
  }

  const resolvedArray = await Promise.all(promisesArray)
  const uploadPartsArray: any[] = []
  resolvedArray.forEach((resolvedPromise, index) => {
    uploadPartsArray.push({
      ETag: resolvedPromise.headers.get('ETag'),
      PartNumber: index + 1,
    })
  })

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
}
</script>

<template>
  <!-- Upload Button -->
  <UButton
    color="warning"
    size="xl"
    class="font-bold rounded-full"
    @click="open()"
  >
    <Icon
      name="i-heroicons-arrow-up-tray-20-solid"
      class="size-5"
    />
    Upload video
  </UButton>
</template>
