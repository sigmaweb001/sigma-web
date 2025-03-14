<script setup lang="ts">
import mediumZoom from 'medium-zoom'
import { joinURL } from 'ufo'
import type { ContentNavigationItem } from '@nuxt/content'

definePageMeta({
  primary: 'orange',
  heroBackground: 'opacity-30',
})

const route = useRoute()
const { toc } = useAppConfig()
const { url } = useSiteConfig()

const { data: post } = await useAsyncData(`legal-${route.params.slug}`, () => {
  return queryCollection('legal').path(route.path).first()
})
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const legals = computed(() => {
  return navigation.value.find(item => item.path === '/legal')?.children
})

const title = post.value.seo?.title || post.value.title
const description = post.value.seo?.description || post.value.description

useSeoMeta({
  titleTemplate: '%s · SigmaStreaming Blog',
  title,
  description,
  ogDescription: description,
  ogTitle: `${title} · SigmaStreaming Blog`,
})

onMounted(() => {
  mediumZoom('[data-zoom-src]', {
    margin: 5,
  })
})
const localPath = useLocalePath()

function printContent() {
  window.print()
}
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="Terms & Policies"
        :ui="{ headline: 'flex flex-col gap-y-8 items-start' }"
      />

      <UPage>
        <template #right>
          <UContentToc
            v-if="post.body && post.body.toc"
            class="print:hidden"
            :links="post.body.toc.links"
            :title="toc.title"
            highlight
          />
        </template>
        <template #left>
          <div class="print:hidden">
            <div class="flex flex-col items-start gap-3 py-8">
              <div
                v-for="item in legals"
                :key="item.path"
              >
                <ULink
                  class="text-sm font-semibold"
                  :to="item.path"
                >
                  {{ item.title }}
                </ULink>
              </div>
            </div>
          </div>
        </template>

        <UPageBody class="lg:pr-10 relative">
          <ContentRenderer
            v-if="post && post.body"
            :value="post"
          />

          <UButton
            variant="outline"
            class="absolute right-0 top-0 print:hidden rounded-full!"
            @click="printContent"
          >
            <Icon
              name="material-symbols:print-outline-rounded"
              class="mr-2 size-5"
            />
            Print page
          </UButton>
          <!-- <div class="flex items-center justify-between mt-12 not-prose">
            <UButton
              to="/legal"
              variant="link"
              :padded="false"
              color="neutral"
              icon="i-lucide-arrow-left"
            >
              Back to legal
            </UButton>
          </div> -->
        </UPageBody>
      </UPage>
    </UPage>
  </UContainer>
</template>
