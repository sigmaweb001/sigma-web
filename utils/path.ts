import { joinURL } from 'ufo'

export function getPath(base: string, ...slugs: string[]) {
  return useLocalePath()({
    path: joinURL(base, ...slugs),
    query: useRoute().query,
  })
}

export function withLocale(path: string, locale: Ref<string> = ref('vi')) {
  return joinURL(locale.value, path)
}

export function queryContentLocale(query: string = '') {
  return queryContent(withLocale(query, useI18n().locale))
}
