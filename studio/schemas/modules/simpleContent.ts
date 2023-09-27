export default {
  name: "simpleContent",
  title: "Blog Content",
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
      console.log('[LOG] ~ file: simpleContent.ts:19 ~ content[0]:', content[0])
      return {
        title: '[Blog Content]: ' + content[0]?.children?.find(item => item.text)?.text
      }
    }
  }
};
