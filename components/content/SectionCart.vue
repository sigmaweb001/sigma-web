<script lang="ts" setup>
import { Form, Field as FormField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js'
import example from 'libphonenumber-js/examples.mobile.json'

const { t: $t } = useI18n()

const formSchema = toTypedSchema(
  z.object({
    name: z.string({ required_error: $t('contact.required') }).min(1, { message: $t('contact.required') }).max(50, { message: $t('contact.max-50-characters') }),
    email: z.string({ required_error: $t('contact.required') }).email($t('contact.invalid_email')),
    address: z.string().min(1, $t('contact.required')),
    countryCode: z.string(),
    phone: z.string({ required_error: $t('contact.required') }).superRefine((val, ctx) => {
      const parsePhone = parsePhoneNumberFromString(val as string || '', form.values.countryCode || 'VN')
      const numberRegex = /^\d+$/

      if (!numberRegex.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: $t('contact.invalid-phone-number'),
          fatal: true,
        })

        return z.NEVER
      }

      if (!parsePhone || !parsePhone.isValid()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: $t('contact.invalid-phone-number-for-the-selected-country'),
        })
      }
    }),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    countryCode: 'VN',
    address: '',
  },
})

const route = useRoute()
const router = useRouter()
const carts = useState('carts', () => [])

if (import.meta.dev) {
  carts.value = [
    {
      product: 'A',
      price: 39,
      qty: 1,
    },
    {
      product: 'B',
      price: 49,
      qty: 1,
    },
    {
      product: 'C',
      price: 59,
      qty: 1,
    },
  ]
}

onMounted(() => {
  const query = route.query
  if (query.product && query.price) {
    const product = query.product as string
    const price = Number(query.price as string)
    const cart = carts.value.find(item => item.product === product)
    if (cart)
      cart.price = price
    else
      carts.value.push({ product, price, qty: 1 })

    router.replace({
      query: {},
    })
  }
})

const isEmpty = computed(() => carts.value?.length === 0)
function remove(item: any) {
  const result = confirm($t('cart.are_you_sure_you_want_to_remove_this_product_from_your_cart'))
  if (result) {
    const index = carts.value.indexOf(item)
    if (index > -1)
      carts.value.splice(index, 1)
  }
}

const total = computed(() => carts.value.reduce((total, item) => total + item.price * item.qty, 0))

const step = ref(1)

function goToPayment() {
  step.value = 2
}

const submitOrder = form.handleSubmit(async (values) => {
  step.value = 3
})

onBeforeUnmount(() => {
  if (step.value === 3)
    carts.value = []
})

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

const formattedDate = useDateFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss')
const paymentMethod = ref('1')
const agree = ref(false)
</script>

<template>
  <section>
    <div class="flex-col items-center gap-5 py-10" :class="[isEmpty ? 'flex' : 'hidden']">
      <div class="i-ri:shopping-cart-2-line size-20 text-primary" />
      <div class="text-2xl font-semibold">
        {{ $t('cart.there_are_no_product_in_your_cart') }}
      </div>
      <ButtonLink href="/pricing" rounded>
        {{ $t('cart.go_to_shopping') }}
      </ButtonLink>
    </div>
    <div :class="[isEmpty ? 'hidden' : 'block']" class="mt-15">
      <div
        class="w-full flex items-center px-10 text-center text-sm text-gray-500 font-medium sm:text-base dark:text-gray-400"
      >
        <div
          class="flex cursor-pointer items-center after:(mx-6 hidden h-1px w-full border-1 border-b border-gray-200) md:w-full sm:after:inline-block dark:after:border-gray-700 sm:after:content-['']"
        >
          <span
            :class="[step >= 1 ? 'text-primary dark:text-primary' : '']"
            class="flex flex-shrink-0 items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden dark:after:text-gray-500"
          >
            <span
              class="me-2 h-6 w-6 flex-center flex-shrink-0 rounded-full p-1"
              :class="[step >= 1 ? 'bg-primary text-white' : '']"
            >1</span>
            {{ $t('cart.shopping_cart') }}
          </span>
        </div>
        <div
          class="flex cursor-pointer items-center after:mx-6 after:hidden after:h-1px after:w-full md:w-full after:border-1 after:border-b after:border-gray-200 after:content-[''] xl:after:mx-10 sm:after:inline-block dark:after:border-gray-700"
        >
          <span
            :class="[step >= 2 ? 'text-primary dark:text-primary' : '']"
            class="flex flex-shrink-0 items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden dark:after:text-gray-500"
          >
            <span
              class="me-2 h-6 w-6 flex-center flex-shrink-0 rounded-full p-1"
              :class="[step >= 2 ? 'bg-primary text-white' : '']"
            >2</span>
            {{ $t('cart.payment_options') }}
          </span>
        </div>
        <div
          class="flex flex-shrink-0 cursor-pointer items-center"
          :class="[step >= 3 ? 'text-primary dark:text-primary ' : '']"
        >
          <span
            class="me-2 h-6 w-6 flex-center flex-shrink-0 rounded-full p-1"
            :class="[step === 3 ? 'bg-primary text-white' : '']"
          >3</span>
          {{ $t('cart.order_received') }}
        </div>
      </div>

      <template v-if="step === 1">
        <div class="relative mx-auto mt-10 max-w-screen-lg overflow-x-auto">
          <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead class="bg-gray-100 text-sm text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  {{ $t('cart.product_name') }}
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  {{ $t('cart.price') }} ({{ $t('currency') }})
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  {{ $t('cart.qty') }}
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  {{ $t('cart.total') }} ({{ $t('currency') }})
                </th>
                <th scope="col" class="px-6 py-3 text-center" />
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in carts" :key="item.product"
                class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <th scope="row" class="whitespace-nowrap px-10 py-4 text-gray-800 font-medium dark:text-white">
                  {{ item.product }}
                </th>
                <td class="px-6 py-4 text-center">
                  {{ item.price }}
                </td>
                <td class="flex-center px-6 py-4 text-center">
                  <input
                    v-model="item.qty" type="number"
                    class="block w-70px border border-gray-300 rounded-lg bg-gray-50 p-2.5 text-center text-sm text-gray-900 dark:border-gray-600 focus:border-primary dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary dark:focus:border-primary dark:focus:ring-primary dark:placeholder-gray-400"
                    placeholder=""
                  >
                </td>
                <td class="px-6 py-4 text-center">
                  {{ item.price * item.qty }}
                </td>
                <td class="px-6 py-4 text-center">
                  <SButton class="text-sm" variant="link" @click="remove(item)">
                    {{ $t('cart.remove') }}
                  </SButton>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="text-trueGray-800 font-semibold dark:text-white">
                <th scope="row" class="px-6 py-3 text-base">
                  {{ $t('cart.total') }}
                </th>
                <td class="px-6 py-3 text-center" />
                <td class="px-6 py-3 text-center" />
                <td class="px-6 py-3 text-center">
                  {{ total }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <SButton variant="white">
            <NuxtLink to="/pricing">
              {{ $t('cart.continue_shopping') }}
            </NuxtLink>
          </SButton>

          <SButton variant="gradient" @click="goToPayment">
            {{ $t('cart.payment') }}
          </SButton>
        </div>
      </template>

      <template v-if="step === 2">
        <div class="grid grid-cols-2 mt-10 gap-2">
          <div class="border-1px border-border rounded-4px px-3 py-3">
            <h6 class="text-base font-bold uppercase">
              {{ $t('cart.payment_information') }}
            </h6>

            <div class="mt-4">
              <form class="w-full space-y-6">
                <FormField v-slot="{ componentField }" name="name">
                  <SFormItem>
                    <SFormLabel class="text-2xl">
                      {{ $t('cart.name') }}<span class="text-red-500">*</span>
                    </SFormLabel>
                    <SFormControl>
                      <SInputText type="text" placeholder="" v-bind="componentField" />
                    </SFormControl>
                    <SFormMessage />
                  </SFormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="email">
                  <SFormItem>
                    <SFormLabel>{{ $t('cart.email') }}<span class="text-red-500">*</span></SFormLabel>
                    <SFormControl>
                      <SInputText type="text" placeholder="" v-bind="componentField" />
                    </SFormControl>
                    <SFormMessage />
                  </SFormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="phone">
                  <SFormItem>
                    <SFormLabel>{{ $t('cart.phone_number') }}<span class="text-red-500">*</span></SFormLabel>
                    <div class="flex items-center gap-2">
                      <FormField v-slot="{ componentField }" name="countryCode">
                        <SFormItem>
                          <SFormControl>
                            <SSelect
                              v-bind="componentField" :default-value="form.values.countryCode" :options="options"
                              class="w-150px!"
                            />
                          </SFormControl>
                        </SFormItem>
                      </FormField>
                      <SFormControl>
                        <SInputText type="text" :placeholder="`(+${phonePrefix}) ${phoneHint}`" v-bind="componentField" />
                      </SFormControl>
                    </div>
                    <SFormMessage />
                  </SFormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="company">
                  <SFormItem>
                    <SFormLabel>{{ $t('cart.company') }}</SFormLabel>
                    <SFormControl>
                      <SInputText type="text" placeholder="" v-bind="componentField" />
                    </SFormControl>
                    <SFormMessage />
                  </SFormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="address">
                  <SFormItem>
                    <SFormLabel>{{ $t('cart.address') }}<span class="text-red-500">*</span></SFormLabel>
                    <SFormControl>
                      <STextArea placeholder="" v-bind="componentField" />
                    </SFormControl>
                    <SFormMessage />
                  </SFormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="note">
                  <SFormItem>
                    <SFormLabel>{{ $t('cart.order_notes') }}</SFormLabel>
                    <SFormControl>
                      <STextArea placeholder="" v-bind="componentField" />
                    </SFormControl>
                    <SFormMessage />
                  </SFormItem>
                </FormField>
              </form>
            </div>
          </div>

          <div>
            <div class="border-1px border-border rounded-4px px-3 py-3">
              <h6 class="text-base font-bold uppercase">
                {{ $t('cart.your_order') }}
              </h6>
              <div class="mt-4 flex flex-col divide-y divide-border divide-dashed">
                <div v-for="(item, i) in carts" :key="i" class="flex items-center gap-2 py-2 pl-6 pr-3">
                  <div class="flex-1">
                    <span>{{ item.product }}</span>
                    x
                    <span>{{ item.qty }}</span>
                  </div>
                  <div class="w-70px">
                    {{ item.price * item.qty }} ({{ $t('currency') }})
                  </div>
                </div>

                <div class="flex items-center gap-2 py-2 pl-6 pr-3">
                  <div class="flex-1 font-bold">
                    {{ $t('cart.total') }} ({{ $t('currency') }})
                  </div>
                  <div class="w-70px">
                    {{ total }}
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-2 border-1px border-border rounded-4px px-3 py-3">
              <h6 class="text-base font-bold uppercase">
                {{ $t('cart.payment') }}
              </h6>
              <div class="mt-4">
                <div class="flex">
                  <div class="h-5 flex items-center">
                    <input
                      id="helper-radio-1" v-model="paymentMethod" name="default-radio" type="radio" value="1"
                      class="h-4 w-4 border-gray-300 bg-gray-100 text-primary dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-primary"
                    >
                  </div>
                  <div class="ms-2 text-sm">
                    <label for="helper-radio-1" class="text-gray-900 font-medium dark:text-gray-300">{{
                      $t('cart.bank_transfer') }}</label>
                    <div id="helper-radio-text" class="text-xs text-gray-500 font-normal dark:text-gray-300">
                      {{
                        $t('cart.make_payments_right_into_our_bank_account') }}
                    </div>
                  </div>
                </div>

                <div class="mt-2 flex">
                  <div class="h-5 flex items-center">
                    <input
                      id="helper-radio-2" v-model="paymentMethod" name="default-radio" type="radio" value="2"
                      class="h-4 w-4 border-gray-300 bg-gray-100 text-primary dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-primary"
                    >
                  </div>
                  <div class="ms-2 text-sm">
                    <label for="helper-radio-2" class="text-gray-900 font-medium dark:text-gray-300">{{
                      $t('cart.payment_via_vnpay') }}</label>
                    <div id="helper-radio-text" class="text-xs text-gray-500 font-normal dark:text-gray-300">
                      {{
                        $t('cart.pay_online_via_vnpay') }}
                    </div>
                  </div>
                </div>

                <div class="mt-4 text-sm italic">
                  <i18n-t tag="p" keypath="cart.your_personal_information_will_be_used_to_process_orders">
                    <template #privacy>
                      <NuxtLink target="__blank" class="text-primary underline hover:font-bold" to="/privacy">
                        {{ $t('cart.privacy_policy') }}
                      </NuxtLink>
                    </template>
                  </i18n-t>
                </div>

                <div class="mb-4 mt-4 flex items-center">
                  <input
                    id="default-checkbox" v-model="agree" type="checkbox" value=""
                    class="h-4 w-4 border-gray-300 rounded bg-gray-100 text-primary dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-primary"
                  >
                  <label for="default-checkbox" class="ms-2 text-sm text-gray-900 font-medium dark:text-gray-300">
                    <i18n-t tag="p" keypath="cart.i_have_read_and_agree_to_the_websites_terms">
                      <template #term>
                        <NuxtLink target="__blank" class="text-primary underline hover:font-bold" to="/terms">
                          {{ $t('cart.terms_and_conditions') }}
                        </NuxtLink>
                      </template>
                    </i18n-t>
                  </label>
                </div>
              </div>

              <div class="mt-4 flex justify-end">
                <SButton :disabled="!agree" variant="gradient" class="flex-shrink-0" type="submit" @click="submitOrder">
                  {{ $t('cart.order') }}
                </SButton>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="step === 3">
        <div class="gap-5 py-10">
          <div class="flex-center flex-col gap-2">
            <div class="i-ri:checkbox-circle-fill size-20 text-primary" />
            <div class="text-xl font-bold">
              {{ $t('cart.thank_you_your_order_has_been_received') }}
            </div>
          </div>

          <div class="mx-auto max-w-screen-lg">
            <h6 class="mb-2 mt-10 text-center text-lg font-bold uppercase">
              {{ $t('cart.order_details') }}
            </h6>
            <div class="grid grid-cols-4 gap-4 rounded-8px bg-gray-200 px-4 py-4 text-sm dark:bg-trueGray-700">
              <h6 class="text-sm font-bold uppercase">
                {{ $t('cart.order_number') }}
              </h6>
              <h6 class="text-sm font-bold uppercase">
                {{ $t('cart.date') }}
              </h6>
              <h6 class="text-sm font-bold uppercase">
                {{ $t('cart.total') }} ({{ $t('currency') }})
              </h6>

              <h6 class="text-sm font-bold uppercase">
                {{ $t('cart.payment_method') }}
              </h6>

              <div>
                11341172024
              </div>

              <div>
                {{ formattedDate }}
              </div>

              <div>
                {{ total }}
              </div>

              <div>
                {{ paymentMethod === '1' ? $t('cart.bank_transfer') : $t('cart.payment_via_vnpay') }}
              </div>
            </div>

            <div class="relative mt-10 overflow-x-auto">
              <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                <thead class="bg-gray-100 text-sm text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      {{ $t('cart.product') }}
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                      {{ $t('cart.price') }} ({{ $t('currency') }})
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                      {{ $t('cart.total') }} ({{ $t('currency') }})
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in carts" :key="i" class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th scope="row" class="whitespace-nowrap px-10 py-4 text-gray-800 font-medium dark:text-white">
                      {{ item.product }}
                    </th>
                    <td class="px-6 py-4 text-center">
                      {{ item.price }}
                    </td>

                    <td class="px-6 py-4 text-center">
                      {{ item.price * item.qty }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="text-trueGray-800 font-semibold dark:text-white">
                    <th scope="row" class="px-6 py-3 text-base">
                      {{ $t('cart.total') }} ({{ $t('currency') }})
                    </th>
                    <td class="px-6 py-3 text-center" />
                    <td class="px-6 py-3 text-center">
                      {{ total }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  opacity: 1;
}
</style>
