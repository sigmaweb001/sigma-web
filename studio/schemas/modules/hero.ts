export default {
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'portableSimple'
    },
    {
      title: 'Background Type',
      name: 'bgType',
      type: 'string',
      options: {
        list: [
          { title: 'Photo', value: 'photo' },
          { title: 'Video', value: 'video' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'photos',
      type: 'object',
      fields: [
        // {
        //   name: 'mobilePhoto',
        //   title: 'Background Photo (mobile)',
        //   type: 'image',
        //   options: {
        //     hotspot: true,
        //   },
        // },
        {
          name: 'desktopPhoto',
          title: 'Photo (desktop)',
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
  ],
  preview: {
    select: {
      title: "title",
      photos: "photos",
    },
    prepare({ title, photos}) {
      return {
        title: '[Hero]: ' + title,
      };
    }
  }
};
