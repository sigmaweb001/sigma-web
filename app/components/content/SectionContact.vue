<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js'
import example from 'libphonenumber-js/examples.mobile.json'

const { t } = useI18n()

const schema = z.object({
  title: z.string().min(1, { message: t('contact.required') }),
  name: z.string({ required_error: t('contact.required') })
    .min(1, { message: t('contact.required') }).max(50, { message: t('contact.max-50-characters') }),
  email: z.string({ required_error: t('contact.required') }).min(1, { message: t('contact.required') }).email(t('contact.invalid_email')),
  countryCode: z.string(),
  company: z.string({ required_error: t('contact.required') }).min(1, { message: t('contact.required') }).max(50, { message: t('contact.max-50-characters') }),
  jobTitle: z.string({ required_error: t('contact.required') }).min(1, { message: t('contact.required') }),
  numOfEmployee: z.string().optional(),
  productRequests: z.array(z.string()).optional(),
  note: z.string().max(300, { message: t('contact.max-300-characters') }).optional(),
  phone: z.string({ required_error: t('contact.required') }).superRefine((val, ctx) => {
    const parsePhone = parsePhoneNumberFromString(val as string || '', state.countryCode || 'VN')
    const numberRegex = /^\d+$/

    if (!numberRegex.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('contact.invalid-phone-number'),
        fatal: true,
      })

      return z.NEVER
    }

    if (!parsePhone || !parsePhone.isValid()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('contact.invalid-phone-number-for-the-selected-country'),
      })
    }
  }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: '',
  countryCode: 'VN',
  name: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  numOfEmployee: '',
  productRequests: [],
  note: '',
})

const { recaptchaLoaded, executeRecaptcha } = useReCaptcha()
const success = ref(false)

async function recaptcha() {
  await recaptchaLoaded()
  const token = await executeRecaptcha('contact_us')
  return token
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch('https://dev-streaming.gviet.vn:8783/auth-service/v1/contact-us', {
    method: 'POST',
    body: {
      ...event.data,
    },
    headers: {
      Recaptcha: await recaptcha(),
    },
  })
  success.value = true
}

const optionsTitle = [
  { value: 'Mr.', label: 'Mr.' },
  { value: 'Mrs.', label: 'Mrs.' },
  { value: 'Miss', label: 'Miss' },
  { value: 'Ms.', label: 'Ms.' },
  { value: 'Prof.', label: 'Prof.' },
]

const roleOptions = [
  { value: 'product_owner', label: 'Product Owner' },
  { value: 'scrum_master', label: 'Scrum Master' },
  { value: 'developer', label: 'Developer' },
  { value: 'tester', label: 'Tester' },
  { value: 'project_manager', label: 'Project Manager' },
  { value: 'designer', label: 'Designer' },
  { value: 'system_administrator', label: 'System Administrator' },
  { value: 'security_expert', label: 'Security Expert' },
  { value: 'user_support', label: 'User Support' },
  { value: 'business_analyst', label: 'Business Analyst' },
  { value: 'quality_manager', label: 'Quality Manager' },
  { value: 'consultant', label: 'Consultant' },
  { value: 'research_and_development', label: 'Research and Development' },
  { value: 'others', label: 'Others' },
]

const optionsNumberOfEmployee = [
  { value: '1-50', label: '1 - 50' },
  { value: '51-200', label: '51 - 200' },
  { value: '201-500', label: '201 - 500' },
  { value: '501-1000', label: '501 - 1,000' },
  { value: '1001-5000', label: '1,001 - 5,000' },
  { value: '5001-10000', label: '5,001 - 10,000' },
  { value: '10000+', label: '10,000+' },
]

const products = [
  { id: 'Dynamic Ads Insert (DAI)', label: 'Dynamic Ads Insert (DAI)' },
  { id: 'Linear Right Management (LRM)', label: 'Linear Right Management (LRM)' },
  { id: 'Media Video On Demand (Media VOD)', label: 'Media Video On Demand (Media VOD)' },
  { id: 'Media Live', label: 'Media Live' },
  { id: 'Interactive', label: 'Interactive' },
  { id: 'Livestream', label: 'Livestream' },
  { id: 'Playout (Fast Channel)', label: 'Playout (Fast Channel)' },
] as const

const options = getCountries().map((countryCode) => {
  function getCountryName(countryCode: string) {
    try {
      const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
      const countryName = regionNames.of(countryCode)
      return countryName
    }
    catch (error) {
      console.error('Error retrieving country name:', error)
      return null
    }
  }

  function getFlag(countryCode) {
    const offset = 127397
    const unicode = countryCode
      .toUpperCase()
      .split('')
      .map(char => char.charCodeAt() + offset)
      .join('-')
    return String.fromCodePoint(...unicode.split('-'))
  }

  const countryName = `${getFlag(countryCode)} ${getCountryName(countryCode)}`
  return { value: countryCode, label: countryName }
})

const objectCountry = computed({
  get() {
    return options.find(option => option.value === state.countryCode)
  },
  set(value) {
    state.countryCode = value.value
  },
})

const phonePrefix = computed(() => getCountryCallingCode(state.countryCode || 'VN'))
const phoneHint = computed(() => getExampleNumber(state.countryCode || 'VN', example)?.formatNational().slice(1))

function updateProductRequests(productId: string) {
  if (state.productRequests.includes(productId)) {
    state.productRequests = state.productRequests.filter(id => id !== productId)
  }
  else {
    state.productRequests.push(productId)
  }
}
</script>

<template>
  <UPageSection
    :ui="{
      container: 'py-4! gap-4 sm:gap-y-4',
    }"
  >
    <div
      v-if="success"
      class="m-auto flex flex-col items-center justify-center gap-3 pb-20 pt-20 container"
    >
      <div class="flex items-center gap-2">
        <Icon
          name="i-carbon:checkmark-filled"
          class="h-10 w-10 flex items-center justify-center flex-shrink-0 rounded-full p-2 text-(--ui-primary)"
        />
        <h2 class="text-center text-2xl font-semibold">
          {{ $t('contact.success') }}
        </h2>
      </div>
      <img
        src="/image_78.png"
        alt="logo"
        class="mr-[8px] h-[263px] w-[263px]"
      >
      <div class="text-base font-medium">
        {{ $t('contact.thanks') }}
      </div>
      <UButton
        to="/"
        class="flex-shrink-0"
      >
        {{ $t('contact.go-to-home') }}
      </UButton>
    </div>
    <div
      v-else
      class="flex flex-col lg:flex-row justify-between gap-8 pb-20 pt-10 container"
    >
      <div class="lg:w-1/2 rounded-xl bg-(--ui-primary)/10 px-8 py-10">
        <h1
          class="text-center text-4xl text-gray-800 font-bold leading-snug tracking-tight lg:text-4xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-black"
        >
          <slot name="title" />
        </h1>
        <p class="mt-4 text-base text-gray-500 dark:text-gray-300">
          <slot name="subtitle" />
        </p>
        <div class="flex flex-col gap-6 pt-8">
          <slot name="default" />
        </div>
        <div class="relative min-h-[370px] w-full flex items-center justify-center mt-8">
          <slot name="image" />
        </div>
      </div>
      <div class="lg:w-1/2">
        <h2 class="text-center text-2xl font-semibold mb-8">
          {{ $t('contact.form_title') }}
        </h2>
        <UForm
          :schema="schema"
          :state="state"
          class="grid gap-4 grid-cols-2"
          @submit="onSubmit"
        >
          <UFormField
            :label="$t('contact.title')"
            name="title"
            required
            :ui="{
              root: 'subgrid',
            }"
          >
            <USelect
              v-model="state.title"
              :items="optionsTitle"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="$t('contact.name')"
            name="name"
            required
          >
            <UInput
              v-model="state.name"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Email"
            name="email"
            required
          >
            <UInput
              v-model="state.email"
              type="email"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="$t('cart.company')"
            name="company"
            required
          >
            <UInput
              v-model="state.company"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="$t('cart.phone_number')"
            name="phone"
            required
            class="col-span-2"
          >
            <div class="flex gap-2">
              <USelectMenu
                v-model="objectCountry"
                :items="options"
                class="w-40"
              />
              <UInput
                v-model="state.phone"
                :placeholder="`(+${phonePrefix}) ${phoneHint}`"
                class="flex-1"
              />
            </div>
          </UFormField>

          <UFormField
            :label="$t('cart.job_title')"
            name="jobTitle"
            required
          >
            <USelect
              v-model="state.jobTitle"
              :items="roleOptions"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="$t('cart.number_of_employees')"
            name="numOfEmployee"
          >
            <USelect
              v-model="state.numOfEmployee"
              :items="optionsNumberOfEmployee"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="$t('contact.product_request')"
            name="productRequests"
            class="col-span-2"
          >
            <div class="space-y-2">
              <UCheckbox
                v-for="product in products"
                :key="product.label"
                :model-value="state.productRequests.includes(product.id)"
                :label="product.label"
                @update:model-value="updateProductRequests(product.id)"
              />
            </div>
          </UFormField>

          <UFormField
            :label="$t('contact.additional-information')"
            name="note"
            class="col-span-2"
          >
            <UTextarea
              v-model="state.note"
              class="w-full"
            />
          </UFormField>

          <div class="text-sm col-span-2">
            {{ $t('contact.des_submit') }}
            <NuxtLink
              to="https://sigma.video/legal/privacy-policy"
              target="_blank"
              class="text-(--ui-primary) font-bold underline"
            >
              {{ $t('contact.privacy-policy') }}
            </NuxtLink>
          </div>

          <div class="flex justify-end col-span-2">
            <UButton
              type="submit"
              loading-auto
              size="lg"
            >
              {{ $t('contact.submit') }}
            </UButton>
          </div>
        </UForm>
      </div>
    </div>
  </UPageSection>
</template>
