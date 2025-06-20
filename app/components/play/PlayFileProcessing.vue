<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'

const props = defineProps<{
  title: string
  successTitle: string
  uploadingData: { assetId: string, uploadId: string }
  originalSize: number
  optimizedSize: number
}>()

const emits = defineEmits<{
  (e: 'back'): void
  (e: 'upload'): void
  (e: 'result'): void
}>()

const status = ref('processing')
const stepIndex = ref(0)

// /api/sigma-demo/vod-demo/jobs/count
const jobCount = ref(0)
const interval = ref<NodeJS.Timeout>()
const domain = 'https://dev-streaming.gviet.vn:8783'
onMounted(() => {
  const updateJobCount = async () => {
    const res = await $fetch('/api/sigma-demo/vod-demo/jobs/count', {
      baseURL: domain,
    })
    jobCount.value = res.count
  }

  updateJobCount()
  interval.value = setInterval(updateJobCount, 1000)
})

onUnmounted(() => clearInterval(interval.value))

const steps = computed(() => {
  return [
    {
      icon: 'i-ri:check-fill',
      iconClass: 'text-green-500 text-xl',
      text: 'Tải video thành công',
      textClass: 'text-gray-200 text-lg',
    },
    {
      icon: 'i-ri:timer-fill',
      iconClass: 'text-info-500 text-xl',
      text: `Đang chờ xử lý video - vị trí trong hàng đợi: ${jobCount.value}`,
      textClass: 'text-orange-400 text-lg font-semibold',
    },
    {
      icon: 'i-ri:flashlight-fill',
      iconClass: 'text-yellow-400 text-xl',
      text: 'Đang thực hiện transcode video',
      textClass: 'text-gray-300 text-lg',
    },
    {
      icon: 'i-ri:brain-fill',
      iconClass: 'text-gray-300 text-xl',
      text: 'AI đang phân tích video...',
      textClass: 'text-gray-300 text-lg',
    },
  ]
})

const showProcessing = computed(() => status.value === 'processing')
const showSuccess = computed(() => status.value === 'success')
const showError = computed(() => status.value === 'error')

onMounted(() => {
  if (status.value !== 'processing') return
  const interval = setInterval(() => {
    if (stepIndex.value < steps.value.length - 1) {
      stepIndex.value++
    }
    else {
      clearInterval(interval)
      // Toggle between success and error for demo. Set to 'success' or 'error' as needed.
      status.value = 'success' // or 'error'

      if (status.value === 'success') {
        setTimeout(() => {
          emits('result')
        }, 3000)
      }
    }
  }, 2000)
})

function openDemo() {
  emits('back')
}

function openUploading() {
  emits('upload')
}
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center">
    <div class="w-full max-w-md bg-black/60 rounded-3xl shadow-xl p-8 flex flex-col gap-6">
      <!-- Logo and Title -->
      <div class="flex items-center gap-3 justify-center">
        <img
          src="/logo_sigma.png"
          alt="Sigma logo"
          class="h-12"
        >
        <span class="text-3xl font-bold text-white tracking-wide">SIGMA</span>
      </div>
      <!-- Processing Screen -->
      <template v-if="showProcessing">
        <div class="text-lg font-semibold text-white px-3">
          <span>{{ title || 'Hệ thống Sigma AI Per-title Encoding bắt đầu xử lý' }}</span>
          <Icon
            class="inline-block size-5 ml-1 align-bottom"
            name="i-svg-spinners:3-dots-fade"
          />
        </div>
        <div class="flex flex-col gap-3 w-full mx-auto px-4">
          <div
            v-for="(step, idx) in steps"
            :key="idx"
            class="flex items-center gap-4"
          >
            <Icon
              v-if="idx < stepIndex"
              name="i-ri:check-fill"
              class="text-green-500 text-xl"
            />
            <Icon
              v-else-if="idx === stepIndex"
              :name="step.icon"
              :class="[step.iconClass, 'animate-bounce']"
            />
            <Icon
              v-else
              :name="step.icon"
              class="text-gray-500 text-xl"
            />

            <span
              v-if="idx < stepIndex"
              class="text-gray-400 text-lg"
            >{{ step.text }}</span>
            <span
              v-else-if="idx === stepIndex"
              class="text-orange-400 text-lg font-bold"
            >{{ step.text }}</span>
            <span
              v-else
              class="text-gray-500 text-lg"
            >{{ step.text }}</span>
          </div>
        </div>
      </template>
      <!-- Success Screen -->
      <template v-else-if="showSuccess">
        <div class="text-white text-lg font-semibold text-center">
          {{ successTitle }}
        </div>
        <div class="flex flex-col items-center justify-center gap-4 ">
          <Icon
            name="i-ri:checkbox-circle-fill"
            class="text-green-500 size-20"
          />

          <div
            v-if="originalSize && optimizedSize"
            class="flex items-center gap-3 mt-2"
          >
            <span class="text-5xl font-extrabold text-white">{{ originalSize }}</span>
            <span class="text-2xl font-bold text-gray-300">MB</span>
            <span class="text-4xl font-bold text-gray-400">&gt;</span>
            <span class="text-5xl font-extrabold text-orange-400">{{ optimizedSize }}</span>
            <span class="text-2xl font-bold text-orange-300">MB</span>
          </div>
        </div>
      </template>
      <!-- Error Screen -->
      <template v-else-if="showError">
        <div class="text-white text-lg font-semibold text-center">
          Đã xảy ra lỗi trong quá trình xử lý video.<br>Vui lòng thử lại sau.
        </div>
        <div class="flex flex-col items-center justify-center gap-4">
          <Icon
            name="i-ri:close-circle-fill"
            class="text-red-500 size-15"
          />
          <UButton
            color="primary"
            size="md"
            class="flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-sm shadow disabled:opacity-60 disabled:cursor-not-allowed"
            @click="openUploading()"
          >
            <Icon
              name="i-heroicons-arrow-up-tray-20-solid"
              class="w-5 h-5"
            />
            Tải lại video
          </UButton>

          <button
            class="text-gray-300 text-sm underline cursor-pointer"
            @click="openDemo()"
          >
            Xem thêm demo
          </button>
        </div>
      </template>
    </div>
  </div>
</template>
