export default defineAppConfig({
  header: {
    title: 'Sigma Streaming',
    icon: 'tabler:brand-nuxt',
  },
  footer: {
    display: true,
  },
  socials: {
    github: 'larbish',
    twitter: '_larbish',
  },
  docsLink: 'https://github.com/docs',
  loginPath: 'https://portal.sigma.video/auth/login',
  signupPath: 'https://portal.sigma.video/auth/signup',
  authors: [{
    slug: 'ThanhVN',
    name: 'ThanhVN',
    title: 'Creator',
    avatar: 'https://unavatar.io/antfu',
  }],
  tags: [{
    slug: 'tag 1',
    name: 'SSAI',
    color: '#35c796',
  }, {
    slug: 'tag 2',
    name: 'Tin tuc',
    color: '#bac71a',
  }],
  banner: {
    enabled: false,
    key: 'TTest_new_message_1',
    link: 'https://dev-streaming.gviet.vn:8783/portal/auth/login',
    textLink: 'Check redirect to portal',
    text: 'TTest_new_message',
  },
  productPinResource: {
    enabled: true,
    // path: '/resources/datasheets/datasheet-2'
    path: '/resources/blogs/blog-1',
  },
})