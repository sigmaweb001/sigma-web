import { Feed } from 'feed'
import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const baseUrl = 'https://hub.nuxt.com'
  const siteUrl = joinURL(baseUrl, 'changelog')
  const feed = new Feed({
    title: 'SigmaStreaming Changelog',
    description: 'The latest releases and updates about SigmaStreaming.',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    image: joinURL(baseUrl, 'icon.png'),
    favicon: joinURL(baseUrl, 'favicon2.ico'),
    copyright: `Copyright © 2024-${new Date().getFullYear()} NuxtLabs All Rights Reserved`,
    feedLinks: {
      rss: `${siteUrl}/rss.xml`,
    },
  })

  const changelogItems = await queryCollection(event, 'changelog')
    .where('extension', '=', 'md')
    .order('date', 'DESC')
    .all()

  for (const item of changelogItems) {
    feed.addItem({
      link: joinURL(baseUrl, item.path),
      image: joinURL(baseUrl, item.image),
      title: item.title,
      date: new Date(item.date),
      description: item.description,
      author: item.authors,
    })
  }

  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})
