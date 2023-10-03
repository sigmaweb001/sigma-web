import { joinURL } from 'ufo'
import { createClient } from '#sanity-client'
import { useRuntimeConfig } from '#imports'
import { allBlogsQuery, allCategoryQuery, allPageQuery, allTagQuery } from '~/utils/groq'

// server/api/_sitemap-urls.ts
export default cachedEventHandler(
  async (e) => {
    const config = useRuntimeConfig()
    const client = createClient(config.public.sanity)

    const [categories, tags, pages, blogs] = await Promise.all([
      client.fetch(allCategoryQuery),
      client.fetch(allTagQuery),
      client.fetch(allPageQuery),
      client.fetch(allBlogsQuery),
    ])
    const { products, engines } = pages

    return [
      ...products.map((item) => {
        return {
          loc: joinURL('/products', item.slug.current),
          lastmod: item._updatedAt,
        }
      }),
      ...engines.map((item) => {
        return {
          loc: joinURL('/products', item.slug.current),
          lastmod: item._updatedAt,
        }
      }),
      ...categories.map((item) => {
        return {
          loc: joinURL('/resources', item.slug.current),
          lastmod: item._updatedAt,
        }
      }),
      ...tags.map((item) => {
        return {
          loc: joinURL('/resources', 'tags', item.slug.current),
          lastmod: item._updatedAt,
        }
      }),
      ...blogs.map((item) => {
        return {
          loc: joinURL('/resources', 'blogs', item.slug.current),
          lastmod: item._updatedAt,
        }
      }),
    ]
  },
  // {
  //   name: 'sitemap-dynamic-url',
  //   maxAge: 60 * 10, // cache URLs for 10 minutes
  // },
)
