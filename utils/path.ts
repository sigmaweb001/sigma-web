import { joinURL } from 'ufo'
import { ensurePrefix } from '@antfu/utils'

export function getPath(base: string, ...slugs: string[]) {
  return useLocalePath()({
    path: joinURL(base, ...slugs),
    query: useRoute().query,
  })
}

export function ensureLocalePath(path: string) {
  return ensurePrefix(useI18n().locale.value, path)
}

export function queryContentLocale(query: string = '') {
  return queryContent(joinURL(useI18n().locale.value, query))
}
