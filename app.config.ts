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
  authors: [{
    slug: 'antfu',
    name: 'Ant',
    title: 'Creator',
    avatar: 'https://unavatar.io/antfu'
  }, {
    slug: 'two',
    name: 'Two',
    title: 'SE',
    avatar: 'https://unavatar.io/antfu'
  }, {
    slug: 'linhvtm',
    name: 'linhvtm',
    title: 'Creator',
    avatar: 'https://unavatar.io/antfu'
  }],
  tags: [{
    slug: 'tag 1',
    name: 'Tag 1',
    color: '#35c796'
  }, {
    slug: 'tag 2',
    name: 'Tag 2',
    color: '#bac71a'
  }, {
    slug: 'test-1',
    name: 'test-1',
    color: '#707070'
  }, {
    slug: 'test-2',
    name: 'test-2',
    color: '#FF7C25'
  }],
  banner: {
    enabled: true,
    key: 'TTest_new_message',
    link: 'https://dev-streaming.gviet.vn:8783/portal/auth/login',
    textLink: 'Check redirect to portal',
    text: 'TTest_new_message',
  },
  productPinResource: {
    enabled: true,
    path: '/resources/datasheets/datasheet-2'
  }
})