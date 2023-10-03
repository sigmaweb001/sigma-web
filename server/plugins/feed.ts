import type { NitroCtx } from 'nuxt-module-feed'
import { joinURL } from 'ufo'
import { allBlogsQuery, allCategoryQuery, allPageQuery, allTagQuery } from '~/utils/groq'
import { createClient } from '#sanity-client'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('feed:generate', async ({ feed, options }: NitroCtx) => {
    switch (options.path) {
      case '/feed.xml': {
        await createFeed(feed, {
          type: 'feed',
          category: 'Products',
          getURL: (slug: string) => joinURL('https://sigmaott.com/', '/products', slug),
          getContent: (item: any) => item.modules?.map(item => item.title).join(' '),
        })
        break
      }
      case '/feed-blogs.xml': {
        await createFeed(feed, {
          type: 'feed-blogs',
          category: 'Blog',
          getURL: (slug: string) => joinURL('https://sigmaott.com/', '/resources', 'blogs', slug),
          getContent: (item: any) => item.excerpt,
        })
        break
      }
    }
  })

  async function createFeed(feed: Feed, options: { type: string; category: string; getURL: (slug: string) => string }) {
    feed.options = {
      title: 'Sigma Streaming',
      copyright: ' Thu Do Multimedia Communications Joint Stock Company ',
      description: 'Sigma Streaming Website',
      id: 'https://sigmaott.com/',
      link: 'https://sigmaott.com/',
      image: 'https://sigmaott.com/logo_sigma.png',
      favicon: 'https://sigmaott.com/favicon.ico',
      copyright: 'All rights reserved 2023, Son Hong Do',
      generator: 'Feed Nuxt',
      author: {
        name: 'Son Hong Do',
        email: 'sondh0127@gmail.com',
        link: 'https://sondh0127.com',
      },
    }

    const config = useRuntimeConfig()
    const client = createClient(config.public.sanity)
    const queryFn = {
      'feed': async () => {
        const { products, engines } = await client.fetch(allPageQuery)

        return [...products, ...engines]
      },
      'feed-blogs': () => client.fetch(allBlogsQuery),
    }
    feed.addCategory(options.category)

    const data = await queryFn[options.type]()

    data.forEach((item) => {
      console.log('[LOG] ~ file: feed.ts:63 ~ item:', item)
      const content = options.getContent(item)
      feed.addItem({
        title: item.title,
        id: item.slug.current,
        link: options.getURL(item.slug.current),
        description: item.description,
        content,
        date: new Date(item._updatedAt),
      })
    })

    feed.addContributor({
      name: 'Son Hong Do',
      email: 'sondh0127@gmail.com',
      link: 'https://sondh0127.com',
    })
  }
})
