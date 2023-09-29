import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { type CSSObject, type Rule } from 'unocss'
import { type Theme } from '@unocss/preset-mini'
import { handler } from '@unocss/preset-mini/utils'
import type { Preset } from '@unocss/core'
import animatedJSON from './uno/animated.json'

function getAnimated() {
  return animatedJSON as unknown as {
    [key: string]: {
      animationName: string
      css: CSSObject
      keyframes: string
    }
  }
}

export const durationShortcuts = {
  faster: 0.5,
  fast: 0.8,
  slow: 2,
  slower: 3,
}

/**
 * animate.css
 */
export const animatedRules: Rule<Theme>[] = [
  ['animated', {
    '--une-animated-duration': '1s',
    'animation-duration': 'var(--une-animated-duration)',
    'animation-fill-mode': 'both',
  }],
  [
    new RegExp(`^animated-(${Object.keys(animatedJSON).join('|')})$`),
    ([, name]) => {
      const { animationName, css, keyframes } = getAnimated()[name]

      return [
        `@keyframes ${animationName} { ${keyframes} }`,
        css,
      ]
    },
    {
      autocomplete: [
        `animated-(${Object.keys(animatedJSON).join('|')})`,
      ],
    },
  ],
  [
    /^animated-(infinite|(repeat-(infinite|(\d+(\.\d+)?))))$/,
    ([, , , repeat]) => {
      const isInfinite = !repeat || repeat === 'infinite'

      return {
        'animation-iteration-count': isInfinite ? 'infinite' : repeat,
      }
    },
    {
      autocomplete: [
        'animated-infinite',
        'animated-repeat-infinite',
        'animated-repeat-<num>',
      ],
    },
  ],
  [
    /^animated-delay-(none|(\d+(\.\d+)?(m?s)?))$/,
    ([, d]) => ({
      'animation-delay': d === 'none' ? '0ms' : handler.bracket.cssvar.time(d),
    }),
    {
      autocomplete: [
        'animated-delay-none',
        'animated-delay-$duration',
      ],
    },
  ],
  [
    /^animated-(((fast|slow)(?:er)?)|duration-(none|(\d+(\.\d+)?(m?s)?)))/,
    ([_, , shortcut, , v]) => {
      if (shortcut) {
        return {
          'animation-duration': `calc(var(--une-animated-duration) * ${durationShortcuts[shortcut as keyof typeof durationShortcuts]});`,
        }
      }

      return {
        'animation-duration': v === 'none' ? '0ms' : handler.bracket.cssvar.time(v),
      }
    },
    {
      autocomplete: [
        `animated-(${Object.keys(durationShortcuts).join('|')})`,
        'animated-duration-none',
        'animated-duration-$duration',
      ],
    },
  ],
]

// SECTION:

/**
 * @public
 */
export interface PrimitivesOptions {
  /**
   * @default 'ui'
   */
  prefix?: string
  /**
   * @default 'open|checked|selected|active|disabled'
   */
  variants?: string
  /**
   * @default 'data-headlessui-state'
   */
  selector?: string
  /**
   * @default 'false'
   * use [data~='checked'] or [data-checked]
   */
  isAttrBoolean?: boolean
}

function presetPrimitives(options: PrimitivesOptions = {}): Preset {
  const {
    prefix = 'ui',
    variants = 'open|checked|selected|active|disabled',
    selector = 'data-headlessui-state',
    isAttrBoolean = false,
  } = options

  return {
    name: 'unocss-preset-primitives',
    variants: [
      (matcher: string) => {
        const regex = new RegExp(`^${prefix}(-not)?-(${variants})[:-]`)
        const match = matcher.match(regex)
        if (match) {
          const attrGen = !isAttrBoolean
            ? `[${selector}~='${match[2]}']`
            : `[${selector}-${match[2]}]`
          return {
            matcher: matcher.slice(match[0].length),
            selector: (s: any) => (match[1] === '-not')
              ? `${s}[${selector}]:not(${attrGen}),:where([${selector}]:not(${attrGen})) ${s}:not(${selector})`
              : `${s}${attrGen},:where(${attrGen}) ${s}`,
          }
        }
        else {
          return matcher
        }
      },
    ],
  }
}

function presetRadixUi(options: {
  /**
   * @default 'ui'
   */
  prefix?: string
} = {}): Preset {
  const {
    prefix = 'ui',
  } = options
  const variants = 'active|checked|closed|delayed-open|hidden|inactive|indeterminate|instant-open|off|on|open|unchecked|visible'
  return presetPrimitives({ prefix, variants, selector: 'data-state' })
}
// !SECTION

export default defineConfig({
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
  ],
  rules: [
    ...animatedRules,
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetRadixUi(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // sans: 'Inter:100,200,300,400,500,600,700,800,900',
        sans: 'Anek Latin:100,200,300,400,500,600,700,800',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      'background': 'hsl(var(--background))',
      'ring': 'hsl(var(--ring))',

      'primary': {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
        50: '#FFE8D5',
        100: '#FEDDC1',
        200: '#FEC798',
        300: '#FEB070',
        400: '#FD9A47',
        500: '#FD841F',
        600: '#E26802',
        700: '#AA4E02',
        800: '#733501',
        900: '#3B1B01',
      },
      'secondary': {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },

      'accent': 'hsl(var(--accent))',
      'accent-foreground': 'hsl(var(--accent-foreground))',
    },

    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
        xl: '1rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },

    animation: {
      keyframes: {
        slideDownAndFade: '{from { opacity: 0; transform: translateY(-2px) } to {opacity: 1; transform: translateY(0)}}',
        slideLeftAndFade: '{from { opacity: 0; transform: translateX(2px) } to {opacity: 1; transform: translateX(0)}}',
        slideUpAndFade: '{from { opacity: 0; transform: translateY(2px) } to {opacity: 1; transform: translateY(0)}}',
        slideRightAndFade: '{from { opacity: 0; transform: translateX(-2px) } to {opacity: 1; transform: translateX(0)}}',
        enterFromRight: '{from { opacity: 0; transform: translateX(200px) } to {opacity: 1; transform: translateX(0)}}',
        enterFromLeft: '{from { opacity: 0; transform: translateX(-200px) } to {opacity: 1; transform: translateX(0)}}',
        exitToRight: '{from { opacity: 1; transform: translateX(0) } to {opacity: 0; transform: translateX(200px)}}',
        exitToLeft: '{from { opacity: 1; transform: translateX(0) } to {opacity: 0; transform: translateX(-200px)}}',
        scaleIn: '{from { opacity: 0; transform: rotateX(-10deg) scale(0.9) } to {opacity: 1; transform: rotateX(0deg) scale(1)}}',
        scaleOut: '{from { opacity: 1; transform: rotateX(0deg) scale(1) } to {opacity: 0; transform: rotateX(-10deg) scale(0.95)}}',
        marquee: '{from { transform: translateX(0) } to {transform: translateX(calc(-100% - 2.5rem))}}',
        float: '{from { transform: rotate(-0.001deg) translate3d(15px, 0, 0) rotate(-0.001deg) } to {transform: rotate(360.001deg) translate3d(15px, 0, 0) rotate(-360.001deg)}}',
      },
      durations: {
        slideDownAndFade: '400ms',
        slideLeftAndFade: '400ms',
        slideUpAndFade: '400ms',
        slideRightAndFade: '400ms',
        scaleIn: '300ms',
        scaleOut: '300ms',
        enterFromLeft: '350ms',
        enterFromRight: '350ms',
        exitToLeft: '350ms',
        marquee: '50s',
        float: '12s',
      },
      timingFns: {
        slideDownAndFade: 'cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'cubic-bezier(0.16, 1, 0.3, 1)',
        scaleIn: 'ease',
        scaleOut: 'ease',
        enterFromLeft: 'ease',
        enterFromRight: 'ease',
        exitToLeft: 'ease',
        exitToRight: 'ease',
        marquee: 'linear',
        float: 'linear',
      },
    },

    boxShadow: {
      normal: '0px 12px 12px 0px rgba(0, 0, 0, 0.12)',
    },
  },
})
