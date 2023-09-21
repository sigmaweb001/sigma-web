// import { Button } from '../../components/block-renders'
import { linkFields } from '../linkFields'
export default {
  title: 'Portable Text',
  name: 'portableSimple',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Paragraph', value: 'normal' },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' }
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            // blockEditor: {
            //   render: Button
            // },
            fields: linkFields
          }
        ]
      }
    }
  ]
}