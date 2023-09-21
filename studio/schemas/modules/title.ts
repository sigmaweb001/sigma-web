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
      name: 'description',
      title: 'Description',
      type: 'portableSimple'
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
      initialValue: 'center'
    },
  ],
  preview: {
    select: {
      title: 'title',
      pretitle: 'pretitle',
    },
    prepare({ pretitle = '', title = '' }) {
      return {
        title: pretitle || title
      }
    }
  }
};
