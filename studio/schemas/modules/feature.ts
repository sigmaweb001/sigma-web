export default {
  name: "feature",
  title: "Feature",
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
      type: 'portableComplex'
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title = '', slug = {} }) {
      return {
        title,
      }
    }
  }
};
