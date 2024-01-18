<script lang="ts" setup>
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





const { query } = useRoute()
const router = useRouter()
const carts = useState('carts', () => [
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
  }
])
console.log('[LOG] ~ carts:', carts)

onMounted(() => {
  if (query.product && query.price) {
    const product = query.product as string
    const price = Number(query.price as string)
    const cart = carts.value.find(item => item.product === product)
    if (cart) {
      cart.price = price
    } else {
      carts.value.push({ product, price, qty: 1 })
    }
    router.replace({
      query: {},
    })
  }
})

const isEmpty = computed(() => carts.value?.length === 0)

function remove(item: any) {
  const index = carts.value.indexOf(item)
  if (index > -1) {
    carts.value.splice(index, 1)
  }
}

const total = computed(() => carts.value.reduce((total, item) => total + item.price * item.qty, 0))

const step = ref(2)

function goToPayment() {
  step.value = 2
}
const submitOrder = form.handleSubmit(async (values) => {
  step.value = 3

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

</script>

<template>
  <section>
    <div class="flex-col items-center gap-5 py-10" :class="[isEmpty ? 'flex' : 'hidden']">
      <div class="i-ri:shopping-cart-2-line text-primary h-20 w-20" />
      <div class="text-2xl font-semibold">
        <ContentSlot :use="$slots.empty" unwrap="p" />
      </div>
      <ButtonLink href="/pricing" rounded>
        Go to shopping
      </ButtonLink>
    </div>
    <div :class="[isEmpty ? 'hidden' : 'block']" class="mt-15">
      <div
        class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base px-10">
        <div
          class="flex cursor-pointer md:w-full items-center sm:after:content-[''] after:w-full after:h-1px after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span :class="[step >= 1 ? 'text-primary dark:text-primary' : '']"
            class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span class="me-2 rounded-full h-6 w-6 flex-center p-1  "
              :class="[step >= 1 ? 'bg-primary text-white' : '']">1</span>
            Shopping <span class="hidden sm:inline-flex sm:ms-1">Cart</span>
          </span>
        </div>
        <div
          class="flex cursor-pointer md:w-full items-center after:content-[''] after:w-full after:h-1px after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span :class="[step >= 2 ? 'text-primary dark:text-primary' : '']"
            class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span class="me-2 rounded-full h-6 w-6 flex-center p-1"
              :class="[step >= 2 ? 'bg-primary text-white' : '']">2</span>
            Payment <span class="hidden sm:inline-flex sm:ms-1">Options</span>
          </span>
        </div>
        <div class="flex cursor-pointer items-center" :class="[step >= 3 ? 'text-primary dark:text-primary' : '']">
          <span class="me-2" :class="[step === 3 ? 'bg-primary text-white' : '']">3</span>
          Order <span class="hidden sm:inline-flex sm:ms-1">Received</span>
        </div>
      </div>


      <template v-if="step === 1">
        <div class="relative overflow-x-auto mt-10">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Product name
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Price
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Qty
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Total
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in carts" class="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-10 py-4 font-medium text-gray-800 whitespace-nowrap dark:text-white">
                  {{ item.product }}
                </th>
                <td class="px-6 py-4 text-center">
                  ${{ item.price }}
                </td>
                <td class="px-6 py-4 text-center flex-center">
                  <input type="number" v-model="item.qty"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-primary focus:border-primary block w-70px p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary text-center"
                    placeholder="">
                </td>
                <td class="px-6 py-4 text-center">
                  ${{ item.price * item.qty }}
                </td>
                <td class="px-6 py-4 text-center">
                  <SButton class="text-sm" variant="link" @click="remove(item)">
                    Remove
                  </SButton>
                </td>
              </tr>

            </tbody>
            <tfoot>
              <tr class="font-semibold text-trueGray-800 dark:text-white">
                <th scope="row" class="px-6 py-3 text-base">Total</th>
                <td class="px-6 py-3 text-center"></td>
                <td class="px-6 py-3 text-center"></td>
                <td class="px-6 py-3 text-center">${{ total }}</td>
              </tr>
            </tfoot>
          </table>
        </div>


        <div class="flex justify-end gap-2 mt-6">
          <SButton variant="white">
            <NuxtLink to="/pricing">
              Continue shopping
            </NuxtLink>
          </SButton>

          <SButton @click="goToPayment">
            Payment
          </SButton>
        </div>
      </template>

      <template v-if="step === 2">
        <div class="grid grid-cols-2 gap-2 mt-10">
          <div class="border-1px border-border rounded-4px px-3 py-3">
            <h6 class="text-base font-bold uppercase">
              Payment information
            </h6>

            <div class="mt-4">
              <form class="w-full space-y-6">
                <FormField v-slot="{ componentField }" name="name">
                  <SFormItem>
                    <SFormLabel :class="'text-2xl'">Name</SFormLabel>
                    <SFormControl>
                      <SInputText type="text" placeholder="" v-bind="componentField" />
                    </SFormControl>
                    <SFormMessage />
                  </SFormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="email">
                  <SFormItem>
                    <SFormLabel>Email</SFormLabel>
                    <SFormControl>
                      <SInputText type="text" placeholder="" v-bind="componentField" />
                    </SFormControl>
                    <SFormMessage />
                  </SFormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="phone">
                  <SFormItem>
                    <SFormLabel>Phone number</SFormLabel>
                    <div class="flex items-center gap-2">
                      <FormField v-slot="{ componentField }" name="countryCode">
                        <SFormItem>
                          <SFormControl>
                            <SSelect v-bind="componentField" :default-value="form.values.countryCode" :options="options"
                              class="w-150px!" />
                          </SFormControl>
                        </SFormItem>
                      </FormField>
                      <SFormControl>
                        <SInputText type="text" :placeholder="`(+ ${phonePrefix}) ${phoneHint}`"
                          v-bind="componentField" />
                      </SFormControl>
                    </div>
                    <SFormMessage />
                  </SFormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="company">
                  <SFormItem>
                    <SFormLabel>Company</SFormLabel>
                    <SFormControl>
                      <SInputText type="text" placeholder="" v-bind="componentField" />
                    </SFormControl>
                    <SFormMessage />
                  </SFormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="address">
                  <SFormItem>
                    <SFormLabel>Address</SFormLabel>
                    <SFormControl>
                      <STextArea placeholder="" v-bind="componentField" />
                    </SFormControl>
                    <SFormMessage />
                  </SFormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="note">
                  <SFormItem>
                    <SFormLabel>Order notes</SFormLabel>
                    <SFormControl>
                      <STextArea placeholder="" v-bind="componentField" />
                    </SFormControl>
                    <SFormMessage />
                  </SFormItem>
                </FormField>

              </form>
            </div>
          </div>

          <div class="border-1px border-border rounded-4px px-3 py-3">
            <h6 class="text-base font-bold uppercase">
              Your order
            </h6>
            <div class="grid grid-cols-[auto-fit,1fr] gap-2">
              <template v-for="(item, i) in carts" :key="i">
                <div>
                  <span>{{ item.product }}</span>
                  x
                  <span>{{ item.qty }}</span>
                </div>
                <div>
                  ${{ item.price * item.qty }}
                </div>
              </template>

              <div>
                Total
              </div>
              <div>
                ${{ total }}
              </div>
            </div>

            <h6 class="text-base font-bold uppercase">
              Payment
            </h6>

            <div>

            </div>

            <div>
              <SButton class="flex-shrink-0 float-right" variant="outline" type="submit" @click="submitOrder">
                Submit
              </SButton>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
