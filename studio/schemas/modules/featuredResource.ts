
export default {
  name: "featuredResource",
  title: "Featured Resource ",
  type: "object",
  fields: [
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "resource" }]
        }
      ]
    }
  ],
  preview: {
    select: {
      items: "items",
    },
    prepare({ items }) {
      return {
        title:  'Featured Resource: ' + items.length + ' items'
      }
    }
  }
};
