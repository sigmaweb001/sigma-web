interface DocsOptions {
  activeSlug: Ref<string>
  productSlug: ComputedRef<string>
}

const [useDocsProvider, useStore] = createInjectionState((docs: DocsOptions) => {
  const sidebar = ref([])
  const post = ref(null)

  // get outline from post
  // to create table of contents
  const outline = computed(() => post.value ? parseOutline(post.value.body) : [])
  return {
    activeSlug: docs.activeSlug,
    productSlug: docs.productSlug,
    sidebar,
    outline,
    post,
  }
})

export { useDocsProvider }

export function useDocsStore() {
  const store = useStore()
  if (store == null)
    throw new Error('Please call `useDocsProvider` on the appropriate parent component')
  return store
}
