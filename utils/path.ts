import { joinURL } from 'ufo'

export function getPath(base: string, ...slugs: string[]) {
  return useLocalePath()({
    path: joinURL(base, ...slugs),
    query: useRoute().query,
  })
}

export function getIcon(data: any) {
  const encodedSvg = encodeURIComponent(data.svg)
  const imgSrc = `url(data:image/svg+xml;utf8,${encodedSvg})`
  return imgSrc
}
