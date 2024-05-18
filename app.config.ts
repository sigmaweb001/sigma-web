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
    slug: 'antfu',
    name: 'Son Hong Do',
    title: 'Developer',
    avatar: 'author/party.png',
  }, {
    slug: 'anhlv',
    name: 'Luu Viet Anh',
    title: 'Product Manager',
    avatar: 'https://unavatar.io/github/vietkute02',
  }, {
    slug: 'linhvtm',
    name: 'linhvtm',
    title: 'Creator',
    avatar: 'https://unavatar.io/antfu',
  }, {
    slug: 'thanhvn',
    name: 'ThanhVN',
    title: 'Creator',
    avatar: '/author/party.png',
  }, {
    slug: 'thanhvn',
    name: 'ThanhVN',
    title: 'Creator',
    avatar: 'author/party.png',
  }, {
    slug: 'duonght',
    name: 'duonght',
    title: 'Creator',
    avatar: '/author/HTD.png',
  }],
  tags: [{
    slug: 'tag 1',
    name: 'OTT',
    color: '#35c796',
  }, {
    slug: 'tag 2',
    name: 'DRM',
    color: '#bac71a',
  }, {
    slug: 'tag 3',
    name: 'SSAI',
    color: '#bac71a',
  }, {
    slug: 'tag 4',
    name: 'advertisement',
    color: '#707070',
  }, {
    slug: 'tag 5',
    name: 'streaming',
    color: '#bac71a',
  }, {
    slug: 'tag 6',
    name: 'advertising',
    color: '#bac71a',
  }, {
    slug: 'tag 7',
    name: 'platform',
    color: '#707070',
  }, {
    slug: 'tag 8',
    name: 'media',
    color: '#707070',
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
    path: '/resources/blogsvodvo',
  },
})
