import { getModuleName } from '../../utils/helper'

export default {
  name: "section",
  title: "Section",
  type: "document",
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      description:
        'Provide a name to reference this section. For internal use only.',
      validation: Rule => Rule.required()
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'feature' },
        { type: 'title' },
        { type: 'gridFeature' },
        { type: 'gridCustomer' },
        { type: 'cta' },
        { type: 'photoFeature'}
      ],
      validation: Rule =>
        Rule.length(1).error('You can only have one piece of content')
    },
  ],
  preview: {
    select: {
      name: 'name',
      content: 'content.0'
    },
    prepare({ name, content }) {
      return {
        title: name,
        subtitle: getModuleName(content._type)
      }
    }
  }
}