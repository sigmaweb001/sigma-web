<script lang="ts" setup>
definePageMeta({
  layout: 'empty',
})

useSeoMeta({
  title: 'Per-Title Encoding Demo - Sigma Video',
  ogTitle: 'Per-Title Encoding Demo - Sigma Video',
  description: 'Experience Sigma Per-title Encoding technology that reduces video file sizes by up to 86% while maintaining quality. Upload your own video to see the optimization in action.',
  ogDescription: 'Experience Sigma Per-title Encoding technology that reduces video file sizes by up to 86% while maintaining quality. Upload your own video to see the optimization in action.',
  ogImage: '/images/pte-demo-preview.jpg',
  twitterCard: 'summary_large_image',
  twitterImage: '/images/pte-demo-preview.jpg',
  twitterTitle: 'Per-Title Encoding Demo - Sigma Video',
  twitterDescription: 'Experience Sigma Per-title Encoding - reduce video sizes by 86% while maintaining quality.',
  keywords: 'per-title encoding, video optimization, video compression, sigma video, PTE, video encoding, file size reduction',
  robots: 'index, follow',
  ogType: 'website',
  ogLocale: 'vi_VN',
})
const pageParams = useUrlSearchParams('history')
pageParams.screen = 'player'

const { open, onChange, reset } = useFileDialog({
  accept: 'video/*',
  directory: false,
})

const uploadingRef = ref()
const toast = useToast()

function validateFile(file: File): boolean {
  const maxSizeMB = 1024
  const isVideo = file.type.startsWith('video/')
  const isSizeOk = file.size <= maxSizeMB * 1024 * 1024
  if (!isVideo) {
    toast.add({
      title: 'Loại tệp không hợp lệ',
      description: 'Chỉ cho phép tệp video',
      color: 'error',
    })
    return true
  }
  if (!isSizeOk) {
    toast.add({
      title: 'Tệp quá lớn',
      description: `Video vượt quá dung lượng cho phép (Dung lượng tối đa: 1GB)`,
      color: 'error',
    })
    return true
  }
  return false // valid file
}

onChange((newFiles) => {
  if (newFiles?.length > 0) {
    const error = validateFile(newFiles[0])
    if (error) {
      reset()
      return
    }

    pageParams.screen = 'uploading'
    nextTick(() => {
      uploadingRef.value.startUpload(newFiles[0])
    })
  }
})
</script>

<template>
  <div class="h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
    <PlayScreenPlayer v-if="pageParams.screen === 'player'">
      <template #upload>
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
    </PlayScreenPlayer>
    <PlayScreenUploading
      v-else-if="pageParams.screen === 'uploading'"
      ref="uploadingRef"
    />
  </div>
</template>
