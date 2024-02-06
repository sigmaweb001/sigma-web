import { joinURL } from 'ufo'

export function getPath(base: string, ...slugs: string[]) {
  return useLocalePath()({
    path: joinURL(base, ...slugs),
    query: useRoute().query,
  })
}

export function withLocale(path: string, locale: Ref<string> = ref('en')) {
  return locale.value === 'en' ? path : joinURL(locale.value, path)
}
