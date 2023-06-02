<script lang="ts" setup>
import { useForm } from '@vorms/core'
import { zodResolver } from '@vorms/resolvers/zod'
import z from 'zod'
import { getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js'
import example from 'libphonenumber-js/examples.mobile.json'

const options = getCountries().map((countryCode) => {
  function getCountryName(countryCode: string) {
    try {
      const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
      const countryName = regionNames.of(countryCode)
      return countryName
    } catch (error) {
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


  const countryName = getFlag(countryCode) + ' ' + getCountryName(countryCode)
  return { value: countryCode, text: countryName, phone: '+' + getCountryCallingCode(countryCode) }
})

const defaultCountry = options.find((option) => option.value === 'VN')

const { register, handleSubmit, handleReset, errors } = useForm({
  initialValues: {
    firstName: '',
    lastName: '',
    workEmail: '',
    country: defaultCountry,
    phone: '',
    yourPoint: '',
    yourQuestion: '',
    userReceive: false
  },
  validate: zodResolver(
    z.object({
      firstName: z.string().nonempty('First name is required'),
      lastName: z.string().nonempty('Last name is required'),
      workEmail: z.string().email('Invalid email address'),
      phone: z.string().nonempty('Phone number is required'),
      yourPoint: z.string().nonempty('User point is required'),
      yourQuestion: z.string().nonempty('User question is required'),
      userReceive: z.boolean()
    })
  ),
  onSubmit(data) {
    console.log(data)
  }
})

const { value: firstName, attrs: firstNameAttrs, } = register('firstName')
const { value: lastName, attrs: lastNameAttrs } = register('lastName')
const { value: workEmail, attrs: workEmailAttrs } = register('workEmail')
const { value: country, attrs: countryAttrs } = register('country')
const { value: phone, attrs: phoneAttrs } = register('phone', {
  validate: (value) => {
    const phoneNumber = parsePhoneNumberFromString(value, country.value?.value)
    if (!phoneNumber?.isValid()) {
      return 'Invalid phone number for the selected country'
    }
  }
})
const { value: yourPoint, attrs: yourPointAttrs } = register('yourPoint')
const { value: yourQuestion, attrs: yourQuestionAttrs } = register('yourQuestion')
const { value: userReceive, attrs: userReceiveAttrs } = register('userReceive')


</script>

<template>
  <div class="grid grid-cols-2 max-w-77rem gap-10 mx-auto py-10">
    <Card
      noise
      class=""
    >
      <form class="text-start text-white flex flex-col gap-12px">
        <div class="grid grid-cols-2 items-end gap-10px">
          <AInput
            id="first_name"
            v-model="firstName"
            type="string"
            v-bind="firstNameAttrs"
            :error="errors.firstName"
          >
            <template #label>
              <label for="first_name">
                <span>First name </span>
                <span class="text-$color-primary-500">*</span>
              </label>
            </template>
          </AInput>
          <AInput
            id="last_name"
            v-model="lastName"
            type="string"
            v-bind="lastNameAttrs"
            :error="errors.lastName"
          >
            <template #label>
              <label for="last_name">
                <span>Last name </span>
                <span class="text-$color-primary-500">*</span>
              </label>
            </template>
          </AInput>
        </div>

        <AInput
          id="work_email"
          v-model="workEmail"
          type="string"
          v-bind="workEmailAttrs"
          :error="errors.workEmail"
        >
          <template #label>
            <label for="work_email">
              <span>Work email </span>
              <span class="text-$color-primary-500">*</span>
            </label>
          </template>
        </AInput>

        <div class="grid grid-cols-3 items-end gap-10px">
          <ASelect
            v-bind="countryAttrs"
            v-model="country"
            hint="&nbsp"
            emit-object
            :options="options"
            class="col-span-1"
            options-wrapper-classes="max-w-200px"
            list-classes="max-h-400px"
          >
            <template #label>
              <label for="phone">
                <span>Phone </span>
                <span class="text-$color-primary-500">*</span>
              </label>
            </template>
          </ASelect>
          <AInput
            v-bind="phoneAttrs"
            id="phone"
            v-model="phone"
            class="col-span-2"
            type="tel"
            input-wrapper-classes="!spacing:gap-x-0"
            :hint="`Example: ${getExampleNumber(country?.value, example).formatNational()}`"
            :error="errors.phone"
          >
            <template #prepend-inner>
              <span class="flex-shrink-0">{{ country?.phone }}</span>
            </template>
          </AInput>
        </div>

        <ATextarea
          v-model="yourPoint"
          v-bind="yourPointAttrs"
          :error="errors.yourPoint"
        >
          <template #label>
            <label for="phone">
              <span>Tell us about your project and your pain point </span>
              <span class="text-$color-primary-500">*</span>
            </label>
          </template>
        </ATextarea>

        <ATextarea
          id="yourQuestion"
          v-model="yourQuestion"
          v-bind="yourQuestionAttrs"
          :error="errors.yourQuestion"
        >
          <template #label>
            <label for="yourQuestion">
              <span>Your question for us </span>
              <span class="text-$color-primary-500">*</span>
            </label>
          </template>
        </ATextarea>

        <p class="text-14px">
          By submitting this form, I agree to the processing of my personal data for the purpose of responding to my
          request, in compliance with ThuDo Multimedia’s <NuxtLink
            class="text-$color-primary-500 hover:underline"
            href="/terms"
          >
            Privacy
            Notice
          </NuxtLink>
        </p>

        <ACheckbox
          v-bind="userReceiveAttrs"
          v-model="userReceive"
        >
          I would like to opt-in to receive updates from ThuDo Multimedia about products, news, webinars, and events.
        </ACheckbox>


        <ButtonLink
          class="mx-auto"
          type="submit"
          @click="handleSubmit"
        >
          Sending to us
        </ButtonLink>
      </form>
    </Card>

    <div class="flex flex-col gap-48px items-center py-48px">
      <ButtonLink
        size="large"
        href="tel:+842436687038;123"
      >
        Call us on (+84) 24 3668 7038 - ext 123
      </ButtonLink>
      <div class="grid grid-cols-[1fr_2fr] gap-24px text-white">
        <p class="font-bold">
          Contact
        </p>
        <div>
          <p>
            <strong>
              24/7 Call center:
            </strong>
            1900 585868
          </p>
          <p>
            <strong>
              Sale team:
            </strong>
            (+84) 912993743
          </p>
          <p>
            <strong>
              E-mail:
            </strong>
            sales@gviet.vn
          </p>
        </div>
        <p class="font-bold">
          Post address
        </p>
        <p>
          Floor 10, No. 48 Le Van Luong, N2 New Urban Area, Nhan Chinh Ward, Thanh Xuan District, City. Hanoi
        </p>
      </div>
      <NuxtImg
        src="/contact-image.png"
        width="500"
        height="500"
      />
    </div>
  </div>
</template>
