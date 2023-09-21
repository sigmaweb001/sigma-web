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
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'settings'
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
    // SECTION: WHAT IS THIS?
    // {
    //   title: 'Overlay header with transparency?',
    //   name: 'hasTransparentHeader',
    //   type: 'boolean',
    //   description:
    //     'When activated the header will overlay the first content module with a transparent background and white text until scrolling is engaged.',
    //   initialValue: false,
    //   group: 'settings'
    // },
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
