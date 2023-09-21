export default {
  name: "photoFeature",
  title: "Photo Feature",
  type: "object",
  fields: [
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
              name: "photo",
              title: "Photo",
              description: "Preferred 300px300px.",
              type: "image",
              options: {
                // accept: "image/svg+xml"
              }
            },
            {
              title: 'Photo Position',
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
              initialValue: 'left'
            },
            {
              name: "title",
              title: "Title",
              type: "string"
            },
            {
              name: "description",
              title: "Description",
              type: 'portableSimple'
            },
          ]
        }
      ]
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
