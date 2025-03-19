import { joinURL, withLeadingSlash } from 'ufo'
import type { Collections } from '@nuxt/content'

export function getPath(base: string, ...slugs: string[]) {
  return useLocalePath()({
    path: joinURL(base, ...slugs),
    query: useRoute().query,
  })
}

export function withLocale(path: string, locale: MaybeRef<string> = ref('en')) {
  const _path = withLeadingSlash(path)
  return toValue(locale) === 'en' ? `${_path}` : `/${toValue(locale)}${_path}`
}

export function withLocaleCollection(collection: string, locale: MaybeRef<string> = ref('en')) {
  return (toValue(locale) === 'en' ? collection : `${collection}_${toValue(locale)}`) as keyof Collections
}
