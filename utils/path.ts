import { joinURL } from 'ufo'

export function getPath(base: string, ...slugs: string[]) {
  return useLocalePath()({
    path: joinURL(base, ...slugs),
    query: useRoute().query,
  })
}

export function withLocale(path: string) {
  const { locale } = useI18n()

  return locale.value === 'en' ? path : `${locale.value}/${path}`
}
