<script lang="ts" setup>
const { closeModal, mobile } = definePropsRefs<{
  mobile?: boolean
  closeModal?: () => void
}>()

const { activeSlug, sidebar: items, productSlug } = useDocsStore()
</script>

<template>
  <div class="overflow-y-auto px-5 pb-5 lg:w-64" :class="{ 'h-[calc(100%-53px)]': !mobile }">
    <ul>
      <li v-for="(item, index) in items" :key="index" class="mt-5">
        <span class="font-semibold">{{ item.title }}</span>

        <ul class="mx-4 mt-2">
          <li v-for="(doc, docindex) in item.items" :key="docindex">
            <NuxtLink :to="`/docs/${productSlug}/${item.slug.current}/${doc.slug.current}`">
              <a
                class="inline-flex py-1 text-sm focus:text-violet-500 hover:text-violet-500" :class="[
                  doc.slug.current === activeSlug ? 'text-violet-500' : 'text-slate-600',
                ]" @click="closeModal"
              >
                {{ doc.title }}
              </a>
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
