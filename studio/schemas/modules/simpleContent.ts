export default {
  name: "simpleContent",
  title: "Simple Content",
  type: "object",
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'portableComplex'
    },
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content, }) {
      return {
        title: 'Content'
      }
    }
  }
};
