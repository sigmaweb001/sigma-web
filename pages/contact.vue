<script setup lang="ts">
import { Form, Field as FormField } from 'vee-validate'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js'
import example from 'libphonenumber-js/examples.mobile.json'

const formSchema = toTypedSchema(
  z.object({
    name: z.string({ required_error: 'This is required' }).min(1, { message: 'This is required' }).max(50, { message: 'Must contain at most 50 character(s)' }),
    email: z.string({ required_error: 'This is required' }).email(),
    countryCode: z.string(),
    // phone: z.custom((val) => {
    //   const parsePhone = parsePhoneNumberFromString(val as string || '', form.values.countryCode || 'VN')
    //   return parsePhone && parsePhone?.isValid()
    // }, 'Invalid phone number for the selected country')
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
    countryCode: 'VN'
  }
})

const { recaptchaLoaded, executeRecaptcha } = useReCaptcha()

async function recaptcha() {
  await recaptchaLoaded()
  const token = await executeRecaptcha('submit')
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
    // Calculate the Unicode value of the first character of the flag emoji
    const offset = 127397
    const unicode = countryCode
      .toUpperCase()
      .split('')
      .map(char => char.charCodeAt() + offset)
      .join('-')
    // Return the flag emoji as a string
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
    <pre>{{ form.values }}</pre>
    <div class="flex justify-items-center py-20 container ">
      <div class="w-full bg-primary/20 py-10 px-8 rounded-sm max-w-xl hidden" lg="block">
        <h1 class="text-3xl font-bold leading-snug tracking-tight text-gray-800 text-center" lg="text-3xl leading-tight"
          xl="text-3xl leading-tight" dark="text-black">
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
      <div class="w-full ">
        <h2 class="text-3xl text-center font-semibold">Fill up the below form and one of our experts will contact you shortly</h2>
        <form class="w-full space-y-6 px-20 py-10" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="name">
            <SFormItem v-auto-animate>
              <SFormLabel :class="'text-2xl'">Name</SFormLabel>
              <SFormControl>
                <SInputText type="text" placeholder="" v-bind="componentField" />
              </SFormControl>
              <SFormMessage />
            </SFormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
            <SFormItem v-auto-animate>
              <SFormLabel>Email</SFormLabel>
              <SFormControl>
                <SInputText type="text" placeholder="" v-bind="componentField" />
              </SFormControl>
              <SFormMessage />
            </SFormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="phone">
            <SFormItem v-auto-animate >
              <SFormLabel>Phone number</SFormLabel>
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
            </SFormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="company">
            <SFormItem v-auto-animate>
              <SFormLabel>Company</SFormLabel>
              <SFormControl>
                <SInputText type="text" placeholder="" v-bind="componentField" />
              </SFormControl>
              <SFormMessage />
            </SFormItem>
          </FormField>
          <FormField name="items1">
            <SFormItem>
              <SFormLabel>Requirements</SFormLabel>
              <FormField v-for="item in products" v-slot="{ value, handleChange }" :key="item.id" type="checkbox" :value="item.id" :unchecked-value="false" name="requirements">
                <SFormItem class="flex items-center space-x-3 space-y-0">
                  <SFormControl>
                    <SCheckbox
                      :checked="value?.includes(item.id)"
                      @update:checked="handleChange"
                    />
                  </SFormControl>
                  <SFormLabel class="font-normal! text-lg!">
                    {{ item.label }}
                  </SFormLabel>
                </SFormItem>
              </FormField>
            </SFormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="note">
            <SFormItem v-auto-animate>
              <SFormLabel>Additional Information</SFormLabel>
              <SFormControl>
                <STextArea placeholder="" v-bind="componentField" />
              </SFormControl>
              <SFormMessage />
            </SFormItem>
          </FormField>

          <SButton class="flex-shrink-0 float-right" variant="outline" type="submit" @click="onSubmit">
            Submit
          </SButton>
        </form>
      </div>
  </div>
  </NuxtLayout>
</template>
