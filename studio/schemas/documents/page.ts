import {
  orderRankField,
  orderRankOrdering
} from "@sanity/orderable-document-list";

export default {
  name: "page",
  title: "Page",
  type: "document",
  groups: [
    { title: 'Content', name: 'content', default: true },
    { title: 'Settings', name: 'settings' }
  ],
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "category" }),
    {
      title: "Icon",
      name: "icon",
      type: "iconPicker",
      options: {
        storeSvg: true
      }
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'settings'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      title: 'URL Slug',
      name: 'slug',
      type: 'slug',
      description: '(required)',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required(),
      group: 'settings'
    },
    {
      name: "hideFromMenu",
      title: "Hide from menu",
      type: "boolean",
      initialValue: false,
      group: 'settings'
    },
    {
      name: "new",
      title: "New",
      type: "boolean",
      initialValue: false,
      group: 'settings'
    },
    {
      title: 'Page Category',
      name: 'pageCategory',
      type: 'string',
      options: {
        list: [
          { title: 'Our Product', value: 'product' },
          { title: 'Our Engine', value: 'engine' }
        ],
        layout: 'radio',
        initialValue: 'product'
      },
      group: 'settings'
    },
    {
      title: 'Page Content',
      name: 'modules',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'feature' },
        { type: 'title' },
        { type: 'gridFeature' },
        { type: 'gridCustomer' },
        { type: 'cta' },
        { type: 'photoFeature'},
        { type: 'simpleContent'},
        { type: 'featuredResource'},
        {
          title: 'Reusable Section',
          type: 'reference',
          to: [{ type: 'section' }]
        }
      ],
      group: 'content'
    },
    // {
    //   title: 'SEO / Share Settings',
    //   name: 'seo',
    //   type: 'seo',
    //   group: 'settings'
    // }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug'
    },
    prepare({ title = 'Untitled', slug = {} }) {
      const path = `${slug.current}`
      return {
        title,
        subtitle: slug.current ? path : '(missing slug)'
      }
    }
  }
};
