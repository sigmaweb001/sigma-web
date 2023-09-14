// @unocss-include
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const sheetVariants = cva(
  '',
  {
    variants: {
      side: {
        top: '',
        bottom: '',
        left: '',
        right: '',
      },
      component: {
        content: 'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:animate-duration-300 data-[state=open]:animate-duration-500 animated',
        close: '',
      },
    },
    compoundVariants: [
      { side: 'top', component: 'content', class: 'inset-x-0 top-0 border-b data-[state=closed]:animated-slide-out-up data-[state=open]:animated-slide-in-down' },
      { side: 'bottom', component: 'content', class: 'inset-x-0 bottom-0 border-t data-[state=closed]:animated-slide-out-down data-[state=open]:animated-slide-in-up' },
      { side: 'left', component: 'content', class: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:animated-slide-out-right data-[state=open]:animated-slide-in-left sm:max-w-sm' },
      { side: 'right', component: 'content', class: 'inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:animated-slide-out-left data-[state=open]:animated-slide-in-right sm:max-w-sm' },
      { side: 'top', component: 'close', class: 'right-4 top-4' },
      { side: 'bottom', component: 'close', class: 'right-4 bottom-4' },
      { side: 'left', component: 'close', class: 'left-4 top-4' },
      { side: 'right', component: 'close', class: 'right-4 top-4' },
    ],
    defaultVariants: {
      side: 'right',
    },
  },
)

export type SheetContentProps = VariantProps<typeof sheetVariants>
