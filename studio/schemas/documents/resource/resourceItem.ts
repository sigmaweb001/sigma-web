export default {
  name: "resourceItem",
  title: "Resource Item",
  type: "document",
  initialValue: () => ({
    publishedAt: new Date().toISOString()
  }),
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: 'asset',
      title: 'Asset',
      type: 'file'
    },
    // {
    //   name: "slug",
    //   title: "Slug",
    //   type: "slug",
    //   options: {
    //     source: "title",
    //     maxLength: 96
    //   }
    // },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity."
        }
      ],
      options: {
        hotspot: true
      }
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "resourceCategory" } }]
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime"
    },
    {
      name: "featured",
      title: "Mark as Featured",
      type: "boolean"
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent"
    },
    
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage"
    },
    prepare(selection) {
      return Object.assign({}, selection, {
        subtitle: ''
      });
    }
  }
};
