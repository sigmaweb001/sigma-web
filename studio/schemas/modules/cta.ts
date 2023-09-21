import { linkFields } from '../linkFields'
export default {
  name: "cta",
  title: "CTA",
  type: "object",
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'cta',
      title: 'CTA',
      type: 'string'
    },
    ...linkFields,
  ],
  preview: {
    select: {
      pretitle: 'title',
    },
    prepare({ title = '', }) {
      return {
        title: title
      }
    }
  }
};
