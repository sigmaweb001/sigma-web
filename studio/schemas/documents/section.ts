import {
  orderRankField,
  orderRankOrdering
} from "@sanity/orderable-document-list";
import { getModuleName } from '../../utils/helper'
import { definePlugin, defineType, defineField } from 'sanity'

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