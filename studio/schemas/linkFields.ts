export const linkFields = [
  {
    title: 'Link Type',
    name: 'linkType',
    type: 'string',
    options: {
      list: [
        { title: 'Internal Page', value: 'internal' },
        { title: 'External URL', value: 'external' }
      ],
      layout: 'radio',
      direction: 'horizontal'
    },
    initialValue: 'internal',
    validation: Rule => Rule.required()
  },
  {
    title: 'Internal Page',
    name: 'page',
    type: 'reference',
    to: [
      // { type: 'blogs' },
      // { type: 'documents' },
      { type: 'page' }
    ],
    hidden: ({ parent }) => parent.linkType !== 'internal'
  },
  {
    title: 'External URL',
    name: 'url',
    type: 'url',
    validation: Rule =>
      Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      }),
    hidden: ({ parent }) => parent.linkType !== 'external'
  },
  {
    title: 'Style as Button?',
    name: 'isButton',
    type: 'boolean',
    initialValue: false
  }
]