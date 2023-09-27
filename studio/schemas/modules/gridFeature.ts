
export default {
  name: "gridFeature",
  title: "Feature Grid",
  type: "object",
  fields: [
    {
      title: 'Grid Size',
      name: 'size',
      type: 'number',
      description:
        'Set the default number of column spaces available for this grid',
      options: {
        list: [
          { title: '1', value: 1 },
          { title: '2', value: 2 },
          { title: '3', value: 3 },
          { title: '4', value: 4 },
          { title: '5', value: 5 },
          { title: '6', value: 6 },
          { title: '7', value: 7 },
          { title: '8', value: 8 },
          { title: '9', value: 9 },
          { title: '10', value: 10 },
          { title: '11', value: 11 },
          { title: '12', value: 12 }
        ]
      },
      validation: Rule => Rule.required(),
      initialValue: 3
    },
    {
      name: 'title',
      title: 'Title',
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
              name: "image",
              title: "Image",
              description: "Image",
              type: "image",
              options: {
              }
            },
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
              type: 'portableSimple'
            },
          ]
        }
      ]
    },
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ items, title }) {
      return {
        title: '[Feature Grid]: ' +  (title || items[0]?.title )
      }
    }
  }
};
