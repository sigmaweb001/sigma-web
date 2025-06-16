<script setup lang="ts">
import axios from 'axios'
import * as R from 'remeda'
import MediaInfo from 'mediainfo.js'
import FormUploadAssetProgress from './FormUploadAssetProgress.vue'

const props = withDefaults(
  defineProps<{ limit?: string[] }>(),
  {
    limit: () => ['image', 'video', 'audio'],
  },
)

const emit = defineEmits<{
  (e: 'uploadSuccess', assetId: string): void
}>()

const { modelValue: visible } = defineModels<{
  modelValue: boolean
}>()

function getInitialValues() {
  return {
    playlistIds: [],
    tags: [],
    category: 'Promo Video',
    expire: null,
    files: [],
    name: '',
  }
}

const { assetDomain } = usePickerStore()
const { t } = useI18n()
const qc = useQueryClient()
const isDisabled = ref(false)

const enableAdd = ref(false)
const SPECIAL_CHARACTERS_NAME_SPACE = /[`!@#$%^&*()+=[\]{};':"\\|,.<>/?~]/
const CONTAIN_NAME_SPACE = /^[\w -]*$/
function validNamePlaylist(value) {
  if (!value.trim()) {
    ElMessage.error($t('base.cannot_contain_all_space', { name: 'Name Playlist' }))
    return false
  }
  else if (SPECIAL_CHARACTERS_NAME_SPACE.test(value)) {
    ElMessage.error($t('base.name_can_not_special_characters', { name: 'Name Playlist' }))
    return false
  }
  else if (!CONTAIN_NAME_SPACE.test(value)) {
    ElMessage.error($t('base.name_cannot_contain_accented_characters', { name: 'Name Playlist' }))
    return false
  }
  else {
    return true
  }
}
function checkPlaylists(lists) {
  return !lists.some(value => !validNamePlaylist(value))
}
const { formRef, formValue, handleSubmit, handleValidate, isError, register, registerArray } = useElForm({
  initialValues: getInitialValues(),
  async onSubmit(values) {
    enableAdd.value = checkPlaylists(values.playlistIds)
    if (enableAdd.value) {
      isDisabled.value = true
      setTimeout(() => {
        showProgress()
        visible.value = false
      }, 1000)
      clearErrorFiles()

      const promises = values.files.map((item, index) => startUpload({
        ...item,
        playlistIds: values.playlistIds,
        tags: values.tags,
        category: values.category,
        expire: values.expire ? values.expire * 24 * 60 * 60 : null,
      }, item.id))

      const res = await Promise.all(promises)
      const successLength = res.filter(item => Boolean(item)).length
      qc.invalidateQueries(['api/library/assets'])
      formValue.value = getInitialValues()

      if (successLength) {
        ElMessage.success(t('message.success'))
      }

      isDisabled.value = false
    }
  },
})
const analyzing = ref(false)

function getProp(path: string) {
  return path
}
const [playlistIdsValue, playlistIdsAttrs] = register<string[]>(getProp('playlistIds'), [])
const [tagValue, tagAttrs] = register<string[]>(getProp('tags'), [
  {
    trigger: ['blur', 'change'],
    validator: tagValidator(35),
  },
])
const [categoryValue, categoryAttrs] = register<string[]>(getProp('category'), [])
const [expireDateValue, expireDateAttrs] = register<number>(getProp('expire'), [])

const [filesValue, filesAttrs, { add, remove, addFirst }] = registerArray<{
  name: string
  file: File
  error: string | boolean
}>(getProp('files'), [])

function clearErrorFiles() {
  filesValue.value = filesValue.value.filter(file => !file.error)
}

const { files, open, reset: resetFiles } = useFileDialog({
  accept: '.png, .jpg, .mp3, .mp4, .wav',
})

const { ignoreUpdates } = watchIgnorable(files, () => {
  handleDropFiles(files.value)
})

async function handleDropFiles(files: FileList | null) {
  if (!files)
    return

  const limitFiles = 100
  let i = 0
  for (const file of files) {
    i++
    if (i > limitFiles) {
      ElMessage.warning(t('base_library.maximum_files_per_upload_is_100_files'))
      break
    }
    const error = await validateFiles(file)
    const payload = {
      file,
      error,
      name: file.name,
      percentage: 0,
      controller: new AbortController(),
      aborted: false,
    }
    if (!error) {
      addFirst(payload)
    }
    else {
      add(payload)
    }
  }

  ignoreUpdates(() => {
    resetFiles()
  })
  // reset file input
}

function onDrop(_files: FileList | null) {
  handleDropFiles(_files)
  ignoreUpdates(() => {
    files.value = _files
  })
}

const dropZoneRef = ref<HTMLElement>()
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

async function validateFiles(file: File) {
  analyzing.value = true
  const mediainfo = await MediaInfo({
    locateFile: () => {
      // HARD Code media info wasm path
      return 'https://resource-ott.gviet.vn/sdk/assets/MediaInfoModule.wasm'
    },
  })

  const readChunk = file => (chunkSize, offset) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target.error)
          reject(event.target.error)

        resolve(new Uint8Array(event.target.result))
      }
      reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
    })

  const result = await mediainfo.analyzeData(() => file?.size, readChunk(file))
  analyzing.value = false

  let type = result.media.track.find(track => track['@type'] !== 'General')
  // Video | Image | Audio
  if (!type) {
    return t('validate.file.unknown')
  }

  type = type['@type'].toLowerCase()

  if (!props.limit.includes(type)) {
    return t('validate.file.unknown')
  }

  const fileSize = file.size! / (1024 * 1024) // MB

  const sizeErrorMsg = {
    video: t('validate.file.size.video'),
    image: t('validate.file.size.image'),
    audio: t('validate.file.size.audio'),
  }

  const sizeLimit = {
    video: 100 * 1024,
    image: 1024,
    audio: 100,
  }
  if (!sizeLimit[type]) {
    return t('validate.file.unknown')
  }

  if (fileSize > sizeLimit[type]) {
    return sizeErrorMsg[type]
  }
  // everything is ok

  return false
}

const isLoading = ref(false)

function updatePercentageFiles(id: string, percentage: number) {
  const index = filesValue.value.findIndex(file => file.id === id)
  if (index !== -1) {
    filesValue.value[index].percentage = percentage
  }
}

async function startUpload(item: any, id: string) {
  try {
    isLoading.value = true
    const data = await $libraryApi('api/library/assets/create-multipart-upload', {
      method: 'POST',
      body: {
        name: item.name,
        tags: item.tags,
        originFileName: item.file.name,
        category: item.category,
        playlistIds: item.playlistIds,
        expire: item.expire,
      },
      headers: {
        noLoading: true,
      },
    })

    const { assetId, uploadId } = data
    const index = filesValue.value.findIndex(file => file.id === id)
    if (index !== -1) {
      filesValue.value[index].assetId = assetId
    }

    const res = await uploadMultipartFile(assetId, uploadId, item, id)
    return res
  }
  catch (err) {
    console.log('[LOG] ~ err:', err)
  }
  finally {
    isLoading.value = false
  }
}

async function uploadMultipartFile(assetId: string, uploadId: string, item: any, itemId: string) {
  try {
    const FILE_CHUNK_SIZE = 10000000 // 10MB
    const fileSize = item.file.size
    const NUM_CHUNKS = Math.floor(fileSize / FILE_CHUNK_SIZE) + 1
    const promisesArray = []
    let start, end, blob
    for (let index = 1; index < NUM_CHUNKS + 1; index++) {
      start = (index - 1) * FILE_CHUNK_SIZE
      end = index * FILE_CHUNK_SIZE
      blob
        = index < NUM_CHUNKS
          ? item.file.slice(start, end)
          : item.file.slice(start)

      // Generate presigned URL for each part
      const getUploadUrlResp = await $libraryApi('api/library/assets/presign-multipart-upload-url', {
        method: 'POST',
        body: {
          assetId,
          partNumber: index,
          uploadId,
        },
        headers: {
          noLoading: true,
          noNotify: true,
        },
        signal: item.controller.signal,
      })

      const { preSignUrl } = getUploadUrlResp

      const preSignUrlWithHost = getAssetURI(preSignUrl, `${ensureSuffix('/', assetDomain.value)}`)

      // Puts each file part into the storage server
      const uploadResp = await axios.put(preSignUrlWithHost, blob, {
        signal: item.controller.signal,
      })

      updatePercentageFiles(itemId, 25 + Math.floor((index / NUM_CHUNKS) * 50))
      promisesArray.push(uploadResp)
    }

    const resolvedArray = await Promise.all(promisesArray)
    const uploadPartsArray: any[] = []
    resolvedArray.forEach((resolvedPromise, index) => {
      uploadPartsArray.push({
        ETag: resolvedPromise.headers.etag,
        PartNumber: index + 1,
      })
    })
    updatePercentageFiles(itemId, 99)

    // Calls the CompleteMultipartUpload endpoint in the backend server
    const completeUploadResp = await $libraryApi('api/library/assets/complete-multipart-upload', {
      method: 'POST',
      body: {
        assetId,
        uploadId,
        parts: uploadPartsArray,
      },
      headers: {
        noLoading: true,
        noNotify: true,
      },
      signal: item.controller.signal,
    })

    updatePercentageFiles(itemId, 100)

    await sleep(1500)
    return completeUploadResp
  }
  catch (err) {
    const index = filesValue.value.findIndex(file => file.id === itemId)
    if (index !== -1) {
      filesValue.value[index].error = 'Upload fail'
    }
  }
}
const hasExpiration = ref(false)

function handleClose(done: () => void) {
  if (!R.equals(formValue.value, getInitialValues())) {
    ElMessageBox.confirm(t('message.close'), t('message.Warning'), {
      type: 'warning',
    })
      .then(() => {
        formValue.value = getInitialValues()
        hasExpiration.value = false
        done()
      })
      .catch(() => {
        // catch error
      })
  }
  else {
    formValue.value = getInitialValues()
    hasExpiration.value = false
    done()
  }
}

function onDeleteTag() {
  formRef.value?.validateField('tags')
}

const suggestLimit = computed(() => {
  const suggests = [
    { label: t('suggest.video'), value: 'video' },
    { label: t('suggest.image'), value: 'image' },
    { label: t('suggest.audio'), value: 'audio' },
  ]
  return suggests.filter(suggest => props.limit.find(limit => limit === suggest.value))
})

const categories = computed(() => [
  'Promo Video',
  'Film',
  'Video Short',
  'Podcast',
  'Series',
  'Sport Clip',
  'Song',
  'Voice Over',
  'Graphics File',
  'Presentation',
])

const hasFile = computed(() => filesValue.value?.length > 0)
const errorFiles = computed(() => filesValue.value.filter(file => file.error).length)
const validFiles = computed(() => filesValue.value.filter(file => !file.error).length)

const { appContext } = getCurrentInstance()!

function showProgress() {
  ElNotification({
    message: h(FormUploadAssetProgress, {
      files: filesValue.value,
    }),
    position: 'bottom-right',
    duration: 0,
    customClass: 'w-600px! [--el-notification-padding:14px_26px_14px_13px]',
  }, appContext)
}

watch(hasExpiration, (newValue) => {
  expireDateValue.value = newValue ? 365 : null
})
</script>

<template>
  <el-dialog
    v-model="visible"
    center
    :title="t('title')"
    width="750px"
    :before-close="handleClose"
  >
    <template v-if="!hasFile">
      <div
        v-loading="analyzing"
        class="relative w-full border-1 border-$el-border-color rounded-lg border-dashed p-10"
        :class="[isOverDropZone ? 'bg-$el-color-info-light-7' : '']"
      >
        <div v-if="formValue.file" class="flex items-center justify-center gap-4">
          <div class="line-clamp-1 flex items-center gap-2 overflow-hidden">
            <div class="i-carbon:document text-18px" />
            <span>{{ formValue.file.name }}</span>
          </div>

          <el-button
            class=""
            circle
            size="small"
            @click="() => formValue.file = null"
          >
            <div class="i-carbon:close" />
          </el-button>
        </div>
        <div v-else class="flex flex-col items-center justify-center gap-4">
          <div ref="dropZoneRef" class="w-full flex flex-col select-none items-center justify-center gap-2">
            <div class="i-ri:upload-cloud-2-fill text-7" />
            <div class="text-base">
              {{ t('label.dropFile') }}
            </div>
          </div>

          <el-button type="primary" @click="open()">
            {{ t('label.chooseFile') }}
          </el-button>
        </div>
      </div>

      <el-alert show-icon :closable="false" class="mx-auto mt-4 w-1/2">
        <div class="flex flex-col leading-20px">
          <div v-for="suggest in suggestLimit" :key="suggest.value">
            {{ suggest.label }}
          </div>
          <div>
            {{ t('base.maximum_files_per_upload_100_files') }}
          </div>
        </div>
      </el-alert>
    </template>

    <template v-else>
      <div class="mb-4 text-center text-balance text-sm font-400">
        <p class="">
          {{ $t('base_library.you_have_0_files_ready_to_upload_please_review_your_files_before', [filesValue.length
            - errorFiles]) }}
        </p>
        <p>{{ $t('base_library.the_system_is_ready_to_upload_the_checked_files') }}</p>
      </div>
      <DevOnly>
        <VueJsonPretty :data="formValue" />
      </DevOnly>
      <el-form
        ref="formRef"
        :model="formValue"
        label-position="left"
        label-width="120px"
        @validate="handleValidate"
        @submit.prevent
      >
        <el-form-item label="Playlist" v-bind="playlistIdsAttrs">
          <SSAssetPlaylistInfiniteSelect v-model="playlistIdsValue" />
        </el-form-item>
        <el-form-item :label="t('label.tag')" v-bind="tagAttrs">
          <SSInputTags v-model="tagValue" @delete-tag="onDeleteTag" />
        </el-form-item>
        <el-form-item label="Category" v-bind="categoryAttrs">
          <el-select v-model="categoryValue" class="w-full">
            <el-option
              v-for="item in categories"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Expiration" v-bind="expireDateAttrs">
          <div class="flex items-center gap-2">
            <el-switch v-model="hasExpiration" />
            <template v-if="hasExpiration">
              <el-input-number
                v-model="expireDateValue"
                :min="1"
                :max="365"
                :step="1"
                step-strictly
                controls-position="right"
                :clearable="true"
              />
              <span class="ml-2 text-sm">
                Days
              </span>
            </template>
          </div>
        </el-form-item>

        <p class="my-4 text-sm font-bold">
          {{ $t('base_library.total') }}: {{ filesValue.length }} files | {{ filesValue.length - errorFiles }} files
          valid - {{ errorFiles }} file invalid
        </p>
        <div class="grid grid-cols-1 max-h-500px items-start gap-x-4 gap-y-2 of-y-auto px-2 py-2">
          <template v-for="(item, i) in filesValue" :key="item.id">
            <SSAssetFormUploadAssetItem :item="item" :prop="`files[${i}]`" @remove="remove(item.id)" />
          </template>
        </div>
      </el-form>
      <span class="flex justify-end">
        <el-button :disabled="isDisabled" @click="handleClose(() => visible = false)">{{ t('actions.cancel')
        }}</el-button>
        <el-button
          :disabled="isDisabled || validFiles === 0"
          type="primary"
          :loading="isLoading"
          @click="handleSubmit"
        >{{ t('actions.submit') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<i18n lang="yaml">
en:
  title: Upload multimedia content
  label:
    chooseFile: Choose files
    dropFile: Drag & drog files to upload
    name: Name
    tag: Tag
    file: File
  placeholder:
    name: Enter media name
    tag: New tag
    file: Choose file asset
    url: Enter url
  actions:
    submit: Submit
    cancel: Cancel
  message:
    close: Are you sure you want to close this?
    success: Upload success
    fail: Upload fail
    uploadLoading: File upload may take await a few minutes. Please await!
  validate:
    name:
      required: Please input name asset
      length: Length should be 1 to 50 characters
    file:
      unknown: File type is not supported
      required: Please input file asset
      size:
        image: Image size should not exceed 100MB!
        video: Video size should not exceed 100GB!
        audio: Audio file size should not exceed 1GB!
    tags:
      accentedCharacters: The tag cannot contain accented and spaced characters
      noSpecialCharacters: Tag item can not contain special characters
      itemLength: Tag item  can not contain more than 35 characters
      duplicate: Tag item can not contain duplicate
      limit: The number of tags should not exceed 50
  suggest:
    image: 'Maximum image size: 100MB'
    video: 'Maximum video size: 100GB'
    audio: 'Maximum audio size: 1GB'
vi:
  title: Tải lên nội dung đa phương tiện
  label:
    chooseFile: Chọn tệp
    dropFile: Kéo và thả tệp để tải lên
    name: Tên
    tag: Thẻ
    file: Tệp
  placeholder:
    name: Nhập tên đa phương tiện
    tag: Thẻ mới
    file: Chọn tệp nội dung
    url: Nhập liên kết
  actions:
    submit: Tải lên
    cancel: Hủy
  message:
    close: Bạn có chắc chắn muốn đóng?
    success: Tải lên thành công
    fail: Tải lên thất bại
    uploadLoading: Tải lên có thể mất một vài phút. Vui lòng đợi!
  suggest:
    image: 'Ảnh kích thước tối đa: 100MB'
    video: 'Video kích thước tối đa: 100GB'
    audio: 'Âm thanh kích thước tối đa: 1GB'
  validate:
    name:
      required: Vui lòng nhập tên nội dung
      length: Độ dài phải từ 1 đến 50 ký tự
    file:
      unknown: Định dạng tệp không hỗ trợ
      required: Vui lòng nhập chọn tệp nội dung
      size:
        image: Kích thước ảnh không được vượt quá 100MB!
        video: Kích thước video không được vượt quá 100GB!
        audio: Kích thước tệp âm thanh không được vượt quá 1GB!
    tags:
      accentedCharacters: Thẻ không được chứa ký tự có dấu và khoảng cách
      noSpecialCharacters: Mục thẻ không được chứa các ký tự đặc biệt
      itemLength: Mục thẻ không được chứa nhiều hơn 35 ký tự
      duplicate: Mục thẻ không được chứa trùng lặp
      limit: Số lượng thẻ không vượt quá 50
</i18n>
