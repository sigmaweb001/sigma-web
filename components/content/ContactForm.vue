<script lang="ts" setup>
import { useForm } from '@vorms/core'
import { zodResolver } from '@vorms/resolvers/zod';
import z from 'zod';

const { register, handleSubmit, handleReset } = useForm({
  initialValues: {
    firstName: '',
    lastName: '',
    workEmail: ''
  },
  validate: zodResolver(
    z.object({
      firstName: z.string().nonempty('First name is required'),
      lastName: z.string().nonempty('Last name is required'),
      workEmail: z.string().email('Invalid email address')
    })
  ),
  onSubmit(data) {
    console.log(data)
  }
})

const { value: firstName, attrs: firstNameAttrs } = register('firstName')
const { value: lastName, attrs: lastNameAttrs } = register('lastName')
const { value: workEmail, attrs: workEmailAttrs } = register('workEmail')


const selectedFruit = ref()
const fruits = ['banana', 'apple', 'watermelon', 'orange']
</script>

<template>
  <div class="grid grid-cols-2 max-w-77rem gap-10 mx-auto">
    <Card noise class="">
      <form class="text-start">
        <AInput id="first_name" v-model="firstName" type="string" v-bind="firstNameAttrs">
          <template #label>
            <label for="first_name">
              <span>First name </span>
              <span class="text-$color-primary-500">*</span>
            </label>
          </template>
        </AInput>
        <AInput id="last_name" v-model="lastName" type="string" v-bind="lastNameAttrs">
          <template #label>
            <label for="last_name">
              <span>Last name </span>
              <span class="text-$color-primary-500">*</span>
            </label>
          </template>
        </AInput>

        <AInput id="work_email" v-model="workEmail" type="string" v-bind="workEmailAttrs">
          <template #label>
            <label for="work_email">
              <span>Work email </span>
              <span class="text-$color-primary-500">*</span>
            </label>
          </template>
        </AInput>

        <div>
          <ASelect v-model="selectedFruit" :options="fruits" :hint="`value: ${selectedFruit}`" />
        </div>

        <ButtonLink @click="handleSubmit">
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

