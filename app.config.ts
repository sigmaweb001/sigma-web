export default defineAppConfig({
  docus: {
    title: 'Sigma Streaming',
    description: 'Powering the streaming experience',
    // TODO: make this public
    image: '/public/cover.png',
    socials: {
      facebook: 'sigma-streaming',
      linkedin: {
        label: 'Linkedin',
        icon: 'simple-icons:linkedin',
        href: 'https://www.linkedin.com/company/sigma-streaming',
      },
      youtube: 'sigma-streaming',

    },
    github: {
      dir: '/content',
      branch: 'origin-web-next',
      repo: 'web-nexr',
      owner: 'sigmaott',
      edit: true
    },
    aside: {
      level: 3,
      collapsed: false,
      exclude: [],
      // navigation: true
    },
    main: {
      padded: true,
      fluid: true
    },
    header: {
      title: '',
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true,
      navigation: true,
    },
    footer: {
      credits: {
        text: 'Thu Do Multimedia Communications Joint Stock Company',
      },
      iconLinks: [],
      fluid: false
    },
  }
})
