<script lang="ts" setup>
const props = defineProps<{
  title: string
  successTitle: string
  videoUri: string
  mode: 'pte' | 'censorship'
  isEn: boolean
  icon?: string
}>()

const emits = defineEmits<{
  (e: 'back' | 'upload'): void
  (e: 'result', jobId: string): void
}>()

const status = ref('processing')
const stepIndex = ref(1)

// API response types
interface JobCountResponse {
  count: number
}

interface JobResponse {
  id: string
  status: string
  source: {
    metadata: {
      size: number
    }
  }
  transcode: {
    metadata: {
      size: number
    }
  }
}

// Job tracking
const jobCount = ref(0)
const jobId = ref<string>('')
const jobInterval = ref<NodeJS.Timeout>()
const countInterval = ref<NodeJS.Timeout>()
const domain = 'https://dev-streaming.gviet.vn:8783'
const originalSize = ref<number | null>(null)
const optimizedSize = ref<number | null>(null)
const originalUnit = ref<string>('MB')
const optimizedUnit = ref<string>('MB')

onMounted(() => {
  startProcessing()
})

onUnmounted(() => {
  clearInterval(countInterval.value)
  clearInterval(jobInterval.value)
})

async function startProcessing() {
  // Step 1: Check job count until it's less than 10

  // TODO: uncomment this after testing
  await checkJobCountUntilReady()

  // Step 2: Move to step 2 and start job
  stepIndex.value = 2
  await startJob()

  // Step 3 & 4: Check job status and progress
  await checkJobStatus()
}

async function checkJobCountUntilReady() {
  return new Promise<void>((resolve) => {
    const updateJobCount = async () => {
      try {
        const res = await $fetch<JobCountResponse>('/api/sigma-demo/vod-demo/jobs/count', {
          baseURL: domain,
        })
        jobCount.value = res.count

        // If job count is less than 10, move to next step
        if (res.count < 10) {
          clearInterval(countInterval.value)

          setTimeout(() => {
            resolve()
          }, 3000)
        }
      }
      catch (error) {
        console.error('Error checking job count:', error)
      }
    }

    updateJobCount()
    countInterval.value = setInterval(updateJobCount, 1000)
  })
}

async function startJob() {
  try {
    const jobResponse = await $fetch<JobResponse>('/api/sigma-demo/vod-demo/jobs', {
      method: 'POST',
      baseURL: domain,
      body: {
        mode: props.mode,
        videoUri: props.videoUri,
      },
    })

    jobId.value = jobResponse.id
  }
  catch (error) {
    console.error('Error starting job:', error)
    status.value = 'error'
  }
}

async function checkJobStatus() {
  if (!jobId.value) return

  const checkStatus = async () => {
    try {
      const jobResponse = await $fetch<JobResponse>(`/api/sigma-demo/vod-demo/jobs/${jobId.value}`, {
        baseURL: domain,
      })
      console.log('🚀 ~ checkStatus ~ jobResponse:', jobResponse)

      // TODO: remove this after testing
      // setTimeout(() => {
      //   emits('result', jobId.value)
      // }, 5000)

      if (jobResponse.status === 'transcoding') {
        setTimeout(() => {
          stepIndex.value = 3 // Transcoding step
        }, 3000)
      }
      else if (jobResponse.status === 'completed') {
        clearInterval(jobInterval.value)
        status.value = 'success'

        function getSizeAndUnit(bytes, decimals = 2) {
          if (bytes === 0) return [0, 'B'] // special-case 0

          const k = 1024
          const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
          const i = Math.floor(Math.log(bytes) / Math.log(k)) // exponent / unit index

          const value = parseFloat((bytes / k ** i).toFixed(decimals))
          return [value, units[i]]
        }

        const [_originalSize, _originalUnit] = getSizeAndUnit(jobResponse.source.metadata.size)
        const [_optimizedSize, _optimizedUnit] = getSizeAndUnit(jobResponse.transcode.metadata.size)
        originalSize.value = _originalSize
        optimizedSize.value = _optimizedSize
        originalUnit.value = _originalUnit
        optimizedUnit.value = _optimizedUnit

        setTimeout(() => {
          emits('result', jobId.value)
        }, 5000)
      }
      else if (jobResponse.status === 'error') {
        clearInterval(jobInterval.value)
        status.value = 'error'
      }
    }
    catch (error) {
      console.error('Error checking job status:', error)
      status.value = 'error'
    }
  }

  checkStatus()
  jobInterval.value = setInterval(checkStatus, 2000)
}

const steps = computed(() => {
  if (props.isEn) {
    return [
      {
        icon: 'i-ri:check-fill',
        iconClass: 'text-green-500 text-xl',
        text: 'Video uploaded successfully',
        textClass: 'text-gray-200 text-lg',
      },
      {
        icon: 'i-ri:timer-fill',
        iconClass: 'text-info-500 text-xl',
        text: `Waiting for video processing${jobCount.value ? ` - queue position: ${jobCount.value}` : ''}`,
        textClass: 'text-orange-400 text-lg font-semibold',
      },
      {
        icon: 'i-ri:brain-fill',
        iconClass: 'text-gray-300 text-xl',
        text: 'AI is analyzing video...',
        textClass: 'text-gray-300 text-lg',
      },
      {
        icon: 'i-ri:flashlight-fill',
        iconClass: 'text-yellow-400 text-xl',
        text: 'Transcoding video in progress',
        textClass: 'text-gray-300 text-lg',
      },
    ]
  }
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
      text: `Đang chờ xử lý video${jobCount.value ? ` - vị trí trong hàng đợi: ${jobCount.value}` : ''}`,
      textClass: 'text-orange-400 text-lg font-semibold',
    },
    {
      icon: 'i-ri:brain-fill',
      iconClass: 'text-gray-300 text-xl',
      text: 'AI đang phân tích video...',
      textClass: 'text-gray-300 text-lg',
    },
    {
      icon: 'i-ri:flashlight-fill',
      iconClass: 'text-yellow-400 text-xl',
      text: 'Đang thực hiện transcode video',
      textClass: 'text-gray-300 text-lg',
    },
  ]
})

const showProcessing = computed(() => status.value === 'processing')
const showSuccess = computed(() => status.value === 'success')
const showError = computed(() => status.value === 'error')

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
          <span>{{ title || (isEn ? 'Sigma AI Per-title Encoding system started processing' : 'Hệ thống Sigma AI Per-title Encoding bắt đầu xử lý') }}</span>
          <UAvatar
            class="ml-1.5"
            size="sm"
            :src="props.icon"
          />
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
              class="text-green-500 text-xl flex-shrink-0"
            />
            <Icon
              v-else-if="idx === stepIndex"
              :name="step.icon"
              :class="[step.iconClass, 'animate-bounce flex-shrink-0']"
            />
            <Icon
              v-else
              :name="step.icon"
              class="text-gray-500 text-xl flex-shrink-0"
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
            v-if="originalSize && optimizedSize && mode === 'pte'"
            class="flex items-center gap-3 mt-2"
          >
            <span class="text-5xl font-extrabold text-white">{{ originalSize }}</span>
            <span class="text-2xl font-bold text-gray-300">{{ originalUnit }}</span>
            <span class="text-4xl font-bold text-gray-400">&gt;</span>
            <span class="text-5xl font-extrabold text-orange-400">{{ optimizedSize }}</span>
            <span class="text-2xl font-bold text-orange-300">{{ optimizedUnit }}</span>
          </div>
        </div>
      </template>
      <!-- Error Screen -->
      <template v-else-if="showError">
        <div class="text-white text-lg font-semibold text-center">
          {{ isEn ? 'An error occurred during video processing.' : 'Đã xảy ra lỗi trong quá trình xử lý video.' }}<br>{{ isEn ? 'Please try again later.' : 'Vui lòng thử lại sau.' }}
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
            {{ isEn ? 'Retry upload' : 'Tải lại video' }}
          </UButton>

          <button
            class="text-gray-300 text-sm underline cursor-pointer"
            @click="openDemo()"
          >
            {{ isEn ? 'View more demos' : 'Xem thêm demo' }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>
