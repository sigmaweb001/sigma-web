export default {
  name: "resource",
  title: "Resource",
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
      name: "description",
      title: "Description",
      type: "blockContent"
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
      name: "category",
      title: "Category",
      validation: Rule => Rule.required(),
      type: "reference", to: { type: "category" }
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }]
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime"
    },
    // {
    //   name: "featured",
    //   title: "Mark as Featured",
    //   type: "boolean"
    // },
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
