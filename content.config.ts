import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const Button = z.object({
  label: z.string(),
  icon: z.string(),
  trailingIcon: z.string(),
  to: z.string(),
  color: z.enum(['primary', 'neutral']).optional(),
  size: z.enum(['sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'link']).optional(),
  id: z.string().optional(),
  target: z.enum(['_blank', '_self']).optional(),
})

const Author = z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  to: z.string().optional(),
  avatar: z.object({
    src: z.string(),
    alt: z.string(),
  }).optional(),
})

const Testimonial = z.object({
  quote: z.string(),
  author: Author,
})

const PageFeature = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().editor({ input: 'icon' }),
  to: z.string().optional(),
  target: z.enum(['_blank', '_self']).optional(),
  soon: z.boolean().optional(),
})

const PageSection = z.object({
  title: z.string(),
  description: z.string(),
  links: z.array(Button),
  features: z.array(PageFeature),
  image: z.object({
    light: z.string().editor({ input: 'media' }),
    dark: z.string().editor({ input: 'media' }),
    width: z.number().optional(),
    height: z.number().optional(),
  }),
})

const PageHero = z.object({
  title: z.string(),
  description: z.string(),
  image: z.object({
    width: z.number().optional(),
    height: z.number().optional(),
    light: z.string().editor({ input: 'media' }),
    dark: z.string().editor({ input: 'media' }),
  }).optional(),
  headline: z.object({
    label: z.string(),
    to: z.string(),
    icon: z.string().optional().editor({ input: 'icon' }),
  }).optional(),
  links: z.array(Button).optional(),
})

const pricingPlan = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  cycle: z.string().optional(),
  features: z.array(z.string()),
  badge: z.string().optional(),
  hightlight: z.boolean().optional(),
  button: z.object({
    label: z.string(),
    color: z.enum(['error', 'primary', 'neutral', 'secondary', 'success', 'info', 'warning']),
    to: z.string(),
    target: z.string().optional(),
  }),
})

const pricingFeature = z.object({
  title: z.string(),
  plans: z.array(z.enum(['solo', 'team', 'unlimited'])).optional(),
  value: z.array(z.string()).optional(),
  soon: z.boolean().optional(),
  feature: z.boolean().optional(),
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.md',
      schema: z.object({}),
    }),
    index_vi: defineCollection({
      type: 'page',
      source: 'vi/index.md',
      schema: z.object({}),
    }),
    products: defineCollection({
      type: 'page',
      source: 'products/**/*',
      schema: z.object({
        links: z.array(Button),
        icon: z.string().editor({ input: 'icon' }),
      }),
    }),
    products_vi: defineCollection({
      type: 'page',
      source: 'vi/products/**/*',
      schema: z.object({}),
    }),
    engines: defineCollection({
      type: 'page',
      source: 'engines/**/*',
      schema: z.object({
        links: z.array(Button),
        icon: z.string().editor({ input: 'icon' }),
        path: z.string(),
      }),
    }),
    engines_vi: defineCollection({
      type: 'page',
      source: 'vi/engines/**/*',
      schema: z.object({}),
    }),
    solutions: defineCollection({
      type: 'page',
      source: 'solutions/**/*',
      schema: z.object({
        links: z.array(Button),
        icon: z.string().editor({ input: 'icon' }),
        path: z.string(),
      }),
    }),
    solutions_vi: defineCollection({
      type: 'page',
      source: 'vi/solutions/**/*',
      schema: z.object({}),
    }),
    resources: defineCollection({
      type: 'page',
      source: 'resources/**/*',
      schema: z.object({
        links: z.array(Button),
        icon: z.string().editor({ input: 'icon' }).optional(),
        path: z.string(),
        image: z.string().editor({ input: 'media' }),
        media: z.string().editor({ input: 'media' }).optional(),
        authors: z.array(Author),
        date: z.string().date(),
        tag: z.enum(['Live Streaming', 'OTT', 'VOD', 'FAST', 'SSAI', 'OTT Advertising', 'VOD Advertising']),
        // category: z.enum(['Release', 'Tutorial']),
      }),
    }),
    legal: defineCollection({
      type: 'page',
      source: 'legal/**/*',
      schema: z.object({
        links: z.array(Button),
        icon: z.string().editor({ input: 'icon' }),
        path: z.string(),
        date: z.string().date(),
      }),
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*',
      schema: z.object({
        image: z.string().editor({ input: 'media' }),
        authors: z.array(Author),
        date: z.string().date(),
        category: z.enum(['Release', 'Tutorial']),
      }),
    }),
    pricings: defineCollection({
      type: 'page',
      source: 'pricings/**/*',
      schema: z.object({
        plans: z.object({
          free: pricingPlan,
          pro: pricingPlan,
          enterprise: pricingPlan,
        }),
        features: z.object({
          includes: z.object({
            mediaServer: z.object({
              title: z.string(),
              description: z.string(),
              feature: z.boolean().optional(),
              includes: z.object({
                packaging: pricingFeature,
                transcoding: pricingFeature,
                ingest: pricingFeature,
              }),
            }),
            projects: pricingFeature,
            members: pricingFeature,
            media: pricingFeature,
            support: pricingFeature,
            dedicated: pricingFeature,
            roles: pricingFeature,
            collaboration: pricingFeature,
            sync: z.object({
              title: z.string(),
              feature: z.boolean().optional(),
              includes: z.object({
                repositories: pricingFeature,
                workflow: pricingFeature,
              }),
            }),
            project: z.object({
              title: z.string(),
              feature: z.boolean().optional(),
              includes: z.object({
                clone: pricingFeature,
                import: pricingFeature,
              }),
            }),
            editors: z.object({
              title: z.string(),
              feature: z.boolean().optional(),
              includes: z.object({
                markdown: pricingFeature,
                json: pricingFeature,
                appconfig: pricingFeature,
                drag: pricingFeature,
              }),
            }),
            preview: z.object({
              title: z.string(),
              feature: z.boolean().optional(),
              includes: z.object({
                draft: pricingFeature,
                branches: pricingFeature,
                prs: pricingFeature,
              }),
            }),
            deploy: z.object({
              title: z.string(),
              feature: z.boolean().optional(),
              includes: z.object({
                gh: pricingFeature,
                self: pricingFeature,
              }),
            }),
            publish: z.object({
              title: z.string(),
              feature: z.boolean().optional(),
              includes: z.object({
                preview: pricingFeature,
                branch: pricingFeature,
                commit: pricingFeature,
              }),
            }),
          }),
        }),
        faq: z.object({
          title: z.string(),
          description: z.string(),
          items: z.array(z.object({
            label: z.string(),
            content: z.string(),
            items: z.array(z.string()).optional(),
          })),
        }),
      }),
    }),
    templates: defineCollection({
      type: 'data',
      source: 'templates.yml',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().editor({ input: 'icon' }),
        hero: PageHero,
      }),
    }),
  },
})
