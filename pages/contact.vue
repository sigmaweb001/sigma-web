<script setup lang="ts">
import { Form, Field as FormField } from 'vee-validate'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js'
import example from 'libphonenumber-js/examples.mobile.json'

const formSchema = toTypedSchema(
  z.object({
    title: z.string(),
    name: z.string({ required_error: 'This is required' }).min(1, { message: 'This is required' }).max(50, { message: 'Must contain at most 50 character(s)' }),
    email: z.string({ required_error: 'This is required' }).email(),
    countryCode: z.string(),
    company: z.string().max(50, { message: 'Must contain at most 50 character(s)' }).optional(),
    note: z.string().max(300, { message: 'Must contain at most 300 character(s)' }).optional(),
    phone: z.string({ required_error: 'This is required' }).superRefine((val, ctx) => {
      const parsePhone = parsePhoneNumberFromString(val as string || '', form.values.countryCode || 'VN')
      const numberRegex = /^\d+$/

      if (!numberRegex.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid phone number",
          fatal: true,
        })

        return z.NEVER
      }

      if (!parsePhone || !parsePhone.isValid()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid phone number for the selected country",
        });
      }
    })
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    countryCode: 'VN',
    title: 'Mr.'
  }
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
      ...form.values
    },
    headers: {
      Recaptcha: await recaptcha()
    }
  })
  success.value = true
})

const content = [
  {
    title: 'Empower your stream',
    description: 'Transcode, Interact, Monetize. Experience the future.',
    icon: 'carbon:radio',
  },
  {
    title: 'Stream seamlessly',
    description: 'Reliable, flawless live event streaming with top-tier CDNs.',
    icon: 'carbon:flow-stream',
  },
  {
    title: 'Interact and Monetize',
    description: 'Boost your revenue by monetizing video with us.',
    icon: 'carbon:document-video',
  },
  {
    title: 'Elevate your content',
    description: 'Elevate your content effortlessly and leave a lasting impression',
    icon: 'carbon:content-view',
  },
]
const optionsTitle: { value:string, label: string }[] = [
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
  <NuxtLayout name="default">
    <div v-if="success" class="flex-col flex gap-3 pb-20 pt-20 container items-center justify-center m-auto">
      <div class="flex gap-2 items-center">
        <Icon name="i-carbon:checkmark-filled"
          class="h-10 w-10 p-2 flex-center rounded-full flex-shrink-0 bg-primary/20 text-primary">
        </Icon>
        <h2 class="text-2xl text-center font-semibold">Success! We Have Received Your Information</h2>
      </div>
      <img src="/image_78.png" alt="logo" class="mr-8px h-263px w-263px">
      <div class="text-base font-500">
        Thank you for contacting us. We will get back to you soon.
      </div>
      <NuxtLink to="/">
        <SButton class="flex-shrink-0" variant="gradient">
          Go to Home
        </SButton>
      </NuxtLink>
    </div>
    <div class="flex justify-items-center pb-20 pt-10 container" v-else>
      <div class="w-full bg-primary/20 py-10 px-8 rounded-sm max-w-xl hidden" lg="block">
        <h1 class="text-2xl font-bold leading-snug tracking-tight text-gray-800 text-center" lg="text-2xl leading-tight"
          xl="text-2xl leading-tight" dark="text-black">
          WHY SIGMA STREAMING
        </h1>
        <p class="text-base text-gray-500 dark:text-gray-300">
          Sigma Streaming gives you complete end-to-end assistance and the best solution for your OTT platform.
        </p>
        <div class="flex gap-5 flex-col pt-5">
          <div class="flex items-center gap-3" v-for="item in content" :key="item.title">
            <Icon :name="item.icon ?? 'i-ri:article-line'"
              class="h-10 w-10 p-2 flex-center rounded-full flex-shrink-0 bg-primary/20 text-primary">
            </Icon>
            <div>
              <div class="flex items-center text-base font-500">
                {{ item.title }}
              </div>
              <div v-if="item.description" class="text-sm font-400">
                {{ item.description }}
              </div>
            </div>
          </div>
        </div>
        <div class="relative w-full min-h-370px flex items-center justify-center">
          <Slot class="absolute inset-0 h-full w-full object-scale-down">
            <img src="/Group_1321314848.png" />
          </Slot>
        </div>
      </div>
      <div class="w-full">
        <h2 class="text-2xl text-center font-semibold">Fill up the below form and one of our experts will contact you shortly</h2>
        <form class="w-full space-y-2 xl:space-y-6 pl-20 py-10" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="title">
            <SFormItem v-auto-animate class="flex flex-col xl:flex-row gap-2">
              <SFormLabel>Title <span class="text-red-500">*</span></SFormLabel>
              <div class="w-full">
                <SFormControl>
                  <SSelect v-bind="componentField" :options="optionsTitle" :default-value="form.values.title"/>
                </SFormControl>
                <SFormMessage />
              </div>
            </SFormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="name">
            <SFormItem v-auto-animate class="flex flex-col xl:flex-row gap-2">
              <SFormLabel>Name <span class="text-red-500">*</span></SFormLabel>
              <div class="w-full">
                <SFormControl>
                  <SInputText type="text" placeholder="" v-bind="componentField" />
                </SFormControl>
                <SFormMessage />
              </div>
            </SFormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
            <SFormItem v-auto-animate class="flex flex-col xl:flex-row gap-2">
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
            <SFormItem v-auto-animate class="flex flex-col xl:flex-row gap-2">
              <SFormLabel>Phone number <span class="text-red-500">*</span></SFormLabel>
              <div class="w-full">
                <div class="flex items-center gap-2">
                  <FormField v-slot="{ componentField }" name="countryCode">
                    <SFormItem v-auto-animate>
                      <SFormControl>
                        <SSelect v-bind="componentField" :default-value="form.values.countryCode" :options="options" class="w-150px!"/>
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
            <SFormItem v-auto-animate class="flex flex-col xl:flex-row gap-2">
              <SFormLabel>Company</SFormLabel>
              <div class="w-full">
                <SFormControl>
                  <SInputText type="text" placeholder="" v-bind="componentField" />
                </SFormControl>
                <SFormMessage />
              </div>
            </SFormItem>
          </FormField>
          <FormField name="items1">
            <SFormItem v-auto-animate class="flex flex-col xl:flex-row gap-2">
              <SFormLabel>Requirements</SFormLabel>
              <div class="w-full">
                <FormField v-for="item in products" v-slot="{ value, handleChange }" :key="item.id" type="checkbox" :value="item.id" :unchecked-value="false" name="requirements">
                  <SFormItem class="flex items-center space-x-3 space-y-1">
                    <SFormControl>
                      <SCheckbox
                        :checked="value?.includes(item.id)"
                        @update:checked="handleChange"
                      />
                    </SFormControl>
                    <SFormLabel class="font-normal! text-sm!">
                      {{ item.label }}
                    </SFormLabel>
                  </SFormItem>
                </FormField>
              </div>
            </SFormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="note">
            <SFormItem v-auto-animate class="flex flex-col xl:flex-row gap-2">
              <SFormLabel>Additional Information</SFormLabel>
              <div class="w-full">
                <SFormControl>
                  <STextArea placeholder="" v-bind="componentField" />
                </SFormControl>
                <SFormMessage />
              </div>
            </SFormItem>
          </FormField>

          <SButton class="flex-shrink-0 float-right" variant="gradient" type="submit" @click="onSubmit">
            Submit
          </SButton>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>
<style scoped>
p {
  @apply my-1!
}
</style>
