import { imageVideoSelect } from '../imageVideoSelect'

export default {
  name: "feature",
  title: "Feature",
  type: "object",
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'desc',
      title: 'Description',
      type: 'string',
    },
    {
      name: "items",
      title: "Items",
      type: "array",
      description: "Add features",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              description: "SVG Icons only. Preferred 24x24px.",
              type: "image",
              options: {
                accept: "image/svg+xml"
              }
            },
            {
              name: "title",
              title: "Title",
              type: "string"
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 2
            },
          ]
        }
      ]
    },
    ...imageVideoSelect,
    {
      title: 'Background Position',
      name: 'bgPos',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      },
    },
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items, }) {
      return {
        title: items.map(item => item.title).join(', ')
      }
    }
  }
};
