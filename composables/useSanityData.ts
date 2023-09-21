export async function useSanityData(query, params: any) {
  const route = useRoute()
  const preview = eagerComputed(() => route.query.preview)

  onMounted(() => {
    if (preview.value) {
      const sanity = useSanity('preview')

      const observable = sanity.client.listen(query, params)
      observable.subscribe((event) => {
        console.log('[LOG] ~ file: useSanityData.ts:11 ~ event:', event)
        setTimeout(() => {
          refresh()
        }, 900)
      })
    }
  })

  const { data, refresh } = await useLazySanityQuery(query, params, preview.value
    ? {
        client: 'preview',
        server: false,
        initialCache: false,
      }
    : undefined)

  return { data }
}
