<script lang="ts" setup>

</script>

<template>
  <div class="container">
    <div class="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
      <div class="xl:col-auto lg:col-span-2">
        <div class="h-full w-full flex flex-col justify-between rounded-2xl bg-gray-100 px-14 py-14 dark:bg-trueGray-800">
          <p class="text-2xl leading-normal">
            Share a real <Mark>testimonial</Mark>
            that hits some of your benefits from one of your popular customer.
          </p>

          <Avatar image="/user1.jpg" name="Sarah Steiner" title="VP Sales at Google" />
        </div>
      </div>
      <div class="">
        <div class="h-full w-full flex flex-col justify-between rounded-2xl bg-gray-100 px-14 py-14 dark:bg-trueGray-800">
          <p class="text-2xl leading-normal">
            Make sure you only pick the

            {{ " " }}
            <mark
              class="rounded-md bg-indigo-100 text-indigo-800 ring-4 ring-indigo-100 dark:bg-indigo-900 dark:text-indigo-200 dark:ring-indigo-900"
            >
              right sentence </mark>{{ " " }}
            to keep it short and simple.
          </p>

          <Avatar image="/user2.jpg" name="Dylan Ambrose" title="Lead marketer at Netflix" />
        </div>
      </div>
      <div class="">
        <div class="h-full w-full flex flex-col justify-between rounded-2xl bg-gray-100 px-14 py-14 dark:bg-trueGray-800">
          <p class="text-2xl leading-normal">
            This is an <Mark>awesome</Mark> landing page template I've seen. I
            would use this for anything.
          </p>

          <Avatar image="/user3.jpg" name="Gabrielle Winn" title="Co-founder of Acme Inc" />
        </div>
      </div>
    </div>
  </div>
</template>
