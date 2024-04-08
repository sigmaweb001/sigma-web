<script setup lang="ts">
import { Form, Field as FormField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js'
import example from 'libphonenumber-js/examples.mobile.json'

const { t } = useI18n()

const formSchema = toTypedSchema(
  z.object({
    title: z.string(),
    name: z.string({ required_error: t('contact.required') }).min(1, { message: t('contact.required') }).max(50, { message: t('contact.max-50-characters') }),
    email: z.string({ required_error: t('contact.required') }).email(t('contact.invalid_email')),
    countryCode: z.string(),
    company: z.string({ required_error: t('contact.required') }).max(50),
    jobTitle: z.string({ required_error: t('contact.required') }).max(50, { message: t('contact.max-50-characters') }),
    note: z.string().max(300, { message: t('contact.max-300-characters') }).optional(),
    phone: z.string({ required_error: t('contact.required') }).superRefine((val, ctx) => {
      const parsePhone = parsePhoneNumberFromString(val as string || '', form.values.countryCode || 'VN')
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
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    countryCode: 'VN',
    title: 'Mr.',
    productRequests: [],
    note: '',
  },
})

const { recaptchaLoaded, executeRecaptcha } = useReCaptcha()
const success = ref(false)

async function recaptcha() {
  await recaptchaLoaded()
  const token = await executeRecaptcha('contact_us')
  return token
}

const onSubmit = form.handleSubmit(async (values) => {
  console.log('Form submitted!', values)
  await $fetch('https://dev-streaming.gviet.vn:8783/auth-service/v1/contact-us', {
    method: 'POST',
    body: {
      ...form.values,
    },
    headers: {
      Recaptcha: await recaptcha(),
    },
  })
  success.value = true
})

const optionsTitle: { value: string, label: string }[] = [
  {
    value: 'Mr.',
    label: 'Mr.',
  },
  {
    value: 'Mrs.',
    label: 'Mrs.',
  },
  {
    value: 'Miss',
    label: 'Miss',
  },
  {
    value: 'Ms.',
    label: 'Ms.',
  },
  {
    value: 'Prof.',
    label: 'Prof.',
  },
]

const optionsNumberOfEmployee: { value: string, label: string }[] = [
  {
    value: '1-50',
    label: '1 - 50',
  },
  {
    value: '51-200',
    label: '51 - 200',
  },
  {
    value: '201-500',
    label: '201 - 500',
  },
  {
    value: '501-1000',
    label: '501 - 1,000',
  },
  {
    value: '1001-5000',
    label: '1,001 - 5,000',
  },
  {
    value: '5001-10,000',
    label: '5,001 - 10,000',
  },
  {
    value: '10000+',
    label: '10,000+',
  }
]

const products = [
  {
    id: 'Dynamic Ads Insert (DAI)',
    label: 'Dynamic Ads Insert (DAI)',
  },
  {
    id: 'Linear Right Management (LRM)',
    label: 'Linear Right Management (LRM)',
  },
  {
    id: 'Media Video On Demand (Media VOD)',
    label: 'Media Video On Demand (Media VOD)',
  },
  {
    id: 'Media Live',
    label: 'Media Live',
  },
  {
    id: 'Interactive',
    label: 'Interactive',
  },
  {
    id: 'Livestream',
    label: 'Livestream',
  },
  {
    id: 'Playout (Fast Channel)',
    label: 'Playout (Fast Channel)',
  },
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

const phonePrefix = computed(() => getCountryCallingCode(form.values.countryCode || 'VN'))
const phoneHint = computed(() => getExampleNumber(form.values.countryCode || 'VN', example)?.formatNational().slice(1))
</script>

<template>
  <div v-if="success" class="m-auto flex flex-col items-center justify-center gap-3 pb-20 pt-20 container">
    <div class="flex items-center gap-2">
      <Icon
        name="i-carbon:checkmark-filled"
        class="h-10 w-10 flex-center flex-shrink-0 rounded-full bg-primary/20 p-2 text-primary"
      />
      <h2 class="text-center text-2xl font-semibold">
        {{ $t('contact.success') }}
      </h2>
    </div>
    <img src="/image_78.png" alt="logo" class="mr-8px h-263px w-263px">
    <div class="text-base font-500">
      {{ $t('contact.thanks') }}
    </div>
    <NuxtLink to="/">
      <SButton class="flex-shrink-0" variant="gradient">
        {{ $t('contact.go-to-home') }}
      </SButton>
    </NuxtLink>
  </div>
  <div v-else class="flex justify-items-center pb-20 pt-10 container">
    <div class="hidden max-w-xl w-full rounded-sm bg-primary/20 px-8 py-10" lg="block">
      <h1
        v-if="$slots.title" class="text-center text-4xl text-gray-800 font-bold leading-snug tracking-tight"
        lg="text-4xl leading-tight" xl="text-4xl leading-tight" dark="text-black"
      >
        <ContentSlot :use="$slots.title" unwrap="p" />
      </h1>
      <p v-if="$slots.subtitle" class="text-base text-gray-500 dark:text-gray-300">
        <ContentSlot :use="$slots.subtitle" unwrap="p" />
      </p>
      <div class="flex flex-col gap-1 pt-2">
        <ContentSlot :use="$slots.default" unwrap="ul" />
      </div>
      <div class="relative min-h-370px w-full flex items-center justify-center">
        <Slot class="absolute inset-0 h-full w-full object-scale-down">
          <ContentSlot :use="$slots.image" unwrap="p" />
        </Slot>
      </div>
    </div>
    <div class="w-full">
      <h2 class="text-center text-2xl font-semibold">
        {{ $t('contact.form_title') }}
      </h2>
      <form class="custom-form w-full py-10 pl-20 space-y-2 xl:space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="title">
          <SFormItem class="flex flex-col gap-2 xl:flex-row">
            <SFormLabel>{{ $t('contact.title') }} <span class="text-red-500">*</span></SFormLabel>
            <div class="w-full">
              <SFormControl>
                <SSelect v-bind="componentField">
                  <SSelectTrigger>
                    <SSelectValue placeholder="" />
                  </SSelectTrigger>
                  <SSelectContent>
                    <SSelectItem v-for="item in optionsTitle" :key="item.value" :value="item.value">
                      {{ item.label }}
                    </SSelectItem>
                  </SSelectContent>
                </SSelect>
              </SFormControl>
              <SFormMessage />
            </div>
          </SFormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="name">
          <SFormItem class="flex flex-col gap-2 xl:flex-row">
            <SFormLabel>{{ $t('contact.name') }} <span class="text-red-500">*</span></SFormLabel>
            <div class="w-full">
              <SFormControl>
                <SInputText type="text" placeholder="" v-bind="componentField" />
              </SFormControl>
              <SFormMessage />
            </div>
          </SFormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <SFormItem class="flex flex-col gap-2 xl:flex-row">
            <SFormLabel>Email <span class="text-red-500">*</span></SFormLabel>
            <div class="w-full">
              <SFormControl>
                <SInputText type="text" placeholder="" v-bind="componentField" />
              </SFormControl>
              <SFormMessage />
            </div>
          </SFormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="phone">
          <SFormItem class="flex flex-col gap-2 xl:flex-row">
            <SFormLabel>{{ $t('cart.phone_number') }} <span class="text-red-500">*</span></SFormLabel>
            <div class="w-full">
              <div class="flex items-center gap-2">
                <FormField v-slot="{ componentField }" name="countryCode">
                  <SFormItem>
                    <SFormControl>
                      <ThePhoneSelect v-bind="componentField" :options="options" />
                    </SFormControl>
                  </SFormItem>
                </FormField>
                <SFormControl>
                  <SInputText type="text" :placeholder="`(+ ${phonePrefix}) ${phoneHint}`" v-bind="componentField" />
                </SFormControl>
              </div>
              <SFormMessage />
            </div>
          </SFormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="company">
          <SFormItem class="flex flex-col gap-2 xl:flex-row">
            <SFormLabel>{{ $t('cart.company') }} <span class="text-red-500">*</span></SFormLabel>
            <div class="w-full">
              <SFormControl>
                <SInputText type="text" placeholder="" v-bind="componentField" />
              </SFormControl>
              <SFormMessage />
            </div>
          </SFormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="jobTitle">
          <SFormItem class="flex flex-col gap-2 xl:flex-row">
            <SFormLabel>{{ $t('cart.job_title') }} <span class="text-red-500">*</span></SFormLabel>
            <div class="w-full">
              <SFormControl>
                <SInputText type="text" placeholder="" v-bind="componentField" />
              </SFormControl>
              <SFormMessage />
            </div>
          </SFormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="numOfEmployee">
          <SFormItem class="flex flex-col gap-2 xl:flex-row">
            <SFormLabel>{{ $t('cart.number_of_employees') }}</SFormLabel>
            <div class="w-full">
              <SFormControl>
                <SSelect v-bind="componentField">
                  <SSelectTrigger>
                    <SSelectValue />
                  </SSelectTrigger>
                  <SSelectContent>
                    <SSelectItem v-for="item in optionsNumberOfEmployee" :key="item.value" :value="item.value">
                      {{ item.label }}
                    </SSelectItem>
                  </SSelectContent>
                </SSelect>
              </SFormControl>
              <SFormMessage />
            </div>
          </SFormItem>
        </FormField>
        <FormField name="items1">
          <SFormItem class="flex flex-col gap-2 xl:flex-row">
            <SFormLabel>{{ $t('contact.product_request') }}</SFormLabel>
            <div class="w-full">
              <FormField
                v-for="item in products" v-slot="{ value, handleChange }" :key="item.id" type="checkbox"
                :value="item.id" :unchecked-value="false" name="productRequests"
              >
                <SFormItem class="flex items-center space-x-3 space-y-1">
                  <SFormControl>
                    <SCheckbox :checked="value?.includes(item.id)" @update:checked="handleChange" />
                  </SFormControl>
                  <SFormLabel class="text-sm! font-normal!">
                    {{ item.label }}
                  </SFormLabel>
                </SFormItem>
              </FormField>
            </div>
          </SFormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="note">
          <SFormItem class="flex flex-col gap-2 xl:flex-row">
            <SFormLabel>{{ $t('contact.additional-information') }}</SFormLabel>
            <div class="w-full">
              <SFormControl>
                <STextArea placeholder="" v-bind="componentField" />
              </SFormControl>
              <SFormMessage />
            </div>
          </SFormItem>
        </FormField>
        <FormField name=" ">
          <SFormItem class="flex flex-col gap-2 xl:flex-row space-y--1!">
            <SFormLabel></SFormLabel>
            <p class="text-sm font-medium">
              {{ $t('contact.des_submit') }}
              <NuxtLink to="https://sigma.video/legal/privacy-policy" target="_blank" class="font-bold underline text-primary">{{ $t('contact.privacy-policy') }}</NuxtLink>
            </p>
          </SFormItem>
        </FormField>

        <SButton class="float-right flex-shrink-0" variant="gradient" type="submit" @click="onSubmit">
          {{ $t('contact.submit') }}
        </SButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.custom-form p {
  @apply my-1 !;
}
</style>
