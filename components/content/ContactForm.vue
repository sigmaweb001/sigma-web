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
  return { value: countryCode, text: countryName, phone: `+` + getCountryCallingCode(countryCode) }
})

const defaultCountry = options.find((option) => option.value === 'VN')

const { register, handleSubmit, handleReset, errors } = useForm({
  initialValues: {
    firstName: '',
    lastName: '',
    workEmail: '',
    country: defaultCountry,
    phone: ''
  },
  validate: zodResolver(
    z.object({
      firstName: z.string().nonempty('First name is required'),
      lastName: z.string().nonempty('Last name is required'),
      workEmail: z.string().email('Invalid email address'),
      phone: z.string().nonempty('Phone number is required')
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


</script>

<template>
  <div class="grid grid-cols-2 max-w-77rem gap-10 mx-auto">
    <Card noise class="">
      <form class="text-start text-white flex flex-col gap-24px">
        <AInput id="first_name" v-model="firstName" type="string" v-bind="firstNameAttrs" :error="errors.firstName">
          <template #label>
            <label for="first_name">
              <span>First name </span>
              <span class="text-$color-primary-500">*</span>
            </label>
          </template>
        </AInput>
        <AInput id="last_name" v-model="lastName" type="string" v-bind="lastNameAttrs" :error="errors.lastName">
          <template #label>
            <label for="last_name">
              <span>Last name </span>
              <span class="text-$color-primary-500">*</span>
            </label>
          </template>
        </AInput>

        <AInput id="work_email" v-model="workEmail" type="string" v-bind="workEmailAttrs" :error="errors.workEmail">
          <template #label>
            <label for="work_email">
              <span>Work email </span>
              <span class="text-$color-primary-500">*</span>
            </label>
          </template>
        </AInput>

        <div class="grid grid-cols-3 items-end gap-10px">
          <ASelect hint="&nbsp" v-bind="countryAttrs" emitObject v-model="country" :options="options" class="col-span-1"
            optionsWrapperClasses="max-w-200px" listClasses="max-h-400px">
            <template #label>
              <label for="phone">
                <span>Phone </span>
                <span class="text-$color-primary-500">*</span>
              </label>
            </template>
          </ASelect>
          <AInput v-bind="phoneAttrs" id="phone" v-model="phone" class="col-span-2" type="tel"
            inputWrapperClasses="!spacing:gap-x-0"
            :hint="`Example: ${getExampleNumber(country?.value, example).formatNational()}`" :error="errors.phone">
            <template #prepend-inner>
              <span class="flex-shrink-0">{{ country?.phone }}</span>
            </template>
          </AInput>
        </div>
        Tell us about your project and your pain point *

        Your question for us *

        By submitting this form, I agree to the processing of my personal data for the purpose of responding to my
        request, in compliance with ThuDo Multimedia’s Privacy Notice.

        I would like to opt-in to receive updates from ThuDo Multimedia about products, news, webinars, and events.

        <ButtonLink class="ml-auto" @click="handleSubmit" type="submit">
          Sending to us
        </ButtonLink>
      </form>
    </Card>

    <div class="grid place-items-center">
      <ButtonLink>
        Call us on (+84) 24 3668 7038 - ext 123
      </ButtonLink>
      <NuxtImg src="/contact-image.png" width="240" height="240" />
    </div>
  </div>
</template>
