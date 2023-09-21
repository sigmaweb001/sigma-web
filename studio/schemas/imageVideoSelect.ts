export const imageVideoSelect = [
  {
    title: 'Media',
    name: 'bgType',
    type: 'string',
    options: {
      list: [
        { title: 'Photo', value: 'photo' },
        { title: 'Video', value: 'video' }
      ],
      layout: 'radio',
      direction: 'horizontal',
      initialValue: 'photo'
    },
  },
  {
    name: 'photos',
    type: 'object',
    fields: [
      {
        name: 'photo',
        title: 'Photo',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      // customImage({
      //   title: 'Background Photo (mobile)',
      //   name: 'mobilePhoto'
      // }),
      // customImage({
      //   title: 'Background Photo (desktop)',
      //   name: 'desktopPhoto'
      // })
    ],
    hidden: ({ parent }) => {
      return parent.bgType !== 'photo'
    }
  },
  {
    name: 'video',
    type: 'object',
    fields: [
      {
        title: 'Background Video',
        name: 'id',
        type: 'string',
        description:
          'Alternatively, enter a vimeo ID to show a looping video instead'
      },
      {
        title: 'Background Video Title',
        name: 'title',
        type: 'string',
        description: 'Short title/description of the video'
      }
    ],
    hidden: ({ parent }) => {
      return parent.bgType !== 'video'
    }
  }
]