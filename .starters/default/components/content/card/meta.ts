export const cardProps = {
  icon: {
    type: String,
    default: ''
  },
  iconFloat: {
    type: String,
    default: ''
  },
  col: {
    type: [String, Number, Object],
    default: 1
  },
  row: {
    type: [String, Number, Object],
    default: 1
  },
  noise: {
    type: Boolean,
    default: false
  },
  lights: {
    type: Boolean,
    default: false
  },
  largeIcon: {
    type: Boolean,
    default: false
  },
  noPadding: {
    type: Boolean,
    default: false
  },
}

export const cardSlots = {
  'title': (_: any) => null as any,

  'description': (_: any) => null as any,

  'default': (_: any) => null as any,
}