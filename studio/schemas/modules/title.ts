export default {
  name: "title",
  title: "Title",
  type: "object",
  fields: [
    {
      name: 'pretitle',
      title: 'Pretitle',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'align',
      title: 'Align',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
        direction: 'horizontal'
      },
      initialValue: 'left'
    },
  ],
  preview: {
    select: {
      pretitle: 'pretitle',
    },
    prepare({ pretitle = '', slug = {} }) {
      return {
        title: pretitle
      }
    }
  }
};
