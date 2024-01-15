export default defineAppConfig({
  header: {
    title: 'Sigma Streaming',
    icon: 'tabler:brand-nuxt'
  },
  footer: {
    display: true
  },
  socials: {
    github: 'larbish',
    twitter: '_larbish'
  },
  docsLink: 'https://github.com/docs',
  authors: [
    {
      slug: 'antfu',
      name: 'Ant',
      title: 'Creator',
      avatar: 'https://unavatar.io/antfu',
    },
    {
      slug: 'two',
      name: 'Two',
      title: 'SE',
      avatar: 'https://unavatar.io/antfu',
    }
  ],
  tags: [
    {
      slug: 'tag 1',
      name: 'Tag 1',
      color: '#35c796',
    },
    {
      slug: 'tag 2',
      name: 'Tag 2',
      color: '#bac71a',
    }
  ],
  banner: {
    enabled: true,
    key: 'disabled_banner',
    link: 'https://github.com/nuxt/nuxtjs.org',
    textLink: 'Register now',
    text: 'Now Available: Product Porfolio Management Solution',
  },
  productPinResource: {
    enabled: true,
    path: '/resources/datasheets/datasheet-2'
  }
})