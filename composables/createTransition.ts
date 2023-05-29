import { Transition, TransitionGroup, defineComponent, h } from 'vue'
// import { capitalize } from '@/utils/helpers'
export function capitalize(str: string) {
  return (str[0] as string).toUpperCase() + str.slice(1)
}
export function createTransition(name: string) {
  return defineComponent({
    name: `A${capitalize(name)}Transition`,
    props: {
      group: Boolean,
      tag: {
        type: String,
        default: 'div',
      },
    },
    setup(props, { attrs, slots }) {
      return () => h(
        props.group ? TransitionGroup : Transition as any,
        {
          name: `${name}`,
          tag: props.group ? props.tag : undefined,
          class: [
            props.group && `${name}-group`,
          ],
          ...attrs,
        },
        () => slots.default?.(),
      )
    },
  })
}
