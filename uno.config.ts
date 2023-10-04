import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetUseful } from 'unocss-preset-useful'

export default defineConfig({
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
  ],
  rules: [
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {

      primary: {
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

      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',

      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
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
