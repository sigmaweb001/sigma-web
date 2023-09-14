export const serializers: Serializers = {
  types: {
    box: resolveComponent('CustomBox'),
    code: resolveComponent('CustomCode'),
  },
  styles: {
    h1: resolveComponent('CustomH1'),
    h2: resolveComponent('CustomH2'),
  },
  // marks: {
  //   internalLink: 'a',
  // },
}
