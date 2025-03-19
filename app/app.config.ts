export default defineAppConfig({
  ui: {
    colors: {
      primary: 'orange',
      neutral: 'slate',
      warning: 'amber',
      important: 'violet',
    },
    commandPalette: {
      slots: {
        itemLeadingIcon: 'size-4',
      },
    },
    tabs: {
      slots: {
        list: 'overflow-x-auto',
      },
    },
  },
  uiPro: {
    contentNavigation: {
      slots: {
        linkLeadingIcon: 'size-4',
        listWithChildren: 'ms-4.5',
      },
    },
  },
  seo: {
    siteName: 'Sigma Streaming',
  },
  toc: {
    title: 'On this page',
    bottom: {
      edit: 'https://github.com/nuxt-hub/core/edit/main/products/content',
    },
  },
  banner: {
    enabled: false,
    key: 'TTest_new_message_1',
    link: 'https://dev-streaming.gviet.vn:8783/portal/auth/login',
    textLink: 'Check redirect to portal',
    text: 'TTest_new_message',
  },
})
