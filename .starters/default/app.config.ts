export default defineAppConfig({
  docus: {
    title: 'Sigma Streaming',
    description: 'Powering the streaming experience',
    // TODO: make this public
    image: '.starters/default/public/cover.png',
    socials: {
      twitter: 'sigma-streaming',
      github: 'sigma-streaming'
    },
    github: {
      // dir: '.starters/default/content',
      dir: 'sigma-streaming',
      branch: 'main',
      repo: 'sigma-streaming',
      owner: 'sigma-streaming',
      edit: true
    },
    aside: {
      level: 1,
      collapsed: false,
      exclude: [],
      navigation: true
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
      navigation: true
    },
    footer: {
      iconLinks: [
        {
          href: 'https://nuxt.com',
          icon: 'simple-icons:nuxtdotjs'
        }
      ]
    }
  }
})
