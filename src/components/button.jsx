import { cva } from 'class-variance-authority'

import { cn } from '../lib/utils'

const focusStyles =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:no-underline focus-visible:outline-primary-500'

const buttonVariants = cva(
  `inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${focusStyles}`,
  {
    variants: {
      variant: {
        solid:
          'border border-transparent bg-primary-600 text-white hover:bg-primary-700 focus:bg-primary-700 active:bg-primary-800',
        outlineDark:
          'border border-primary-600 text-primary-600 hover:border-primary-800 hover:bg-primary-100 hover:text-primary-800 focus:border-primary-800 focus:bg-primary-100 focus:text-primary-800 active:border-primary-900 active:bg-primary-200 active:text-primary-900',
        outlineLight:
          'border border-white text-white hover:border-gray-300 hover:bg-gray-800 focus:border-gray-300 focus:bg-gray-800 active:border-gray-400 active:bg-gray-700',
        ghost:
          'border border-transparent text-primary-600 hover:bg-primary-100 hover:text-primary-800 focus:bg-primary-100 focus:text-primary-800 active:bg-primary-200 active:text-primary-900',
        ghostNeutral:
          'border border-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-800 focus:bg-gray-200 focus:text-gray-800 active:bg-gray-300 active:text-gray-900',
        ghostLight:
          'border border-transparent text-white hover:border-gray-300 hover:bg-gray-800 focus:border-gray-300 focus:bg-gray-800 active:border-gray-400 active:bg-gray-700',
        link: 'p-0 text-primary-600 hover:text-primary-800 hover:underline hover:underline-offset-2 focus:text-primary-800 active:text-primary-900',
        linkUnderline:
          'p-0 text-gray-900 underline underline-offset-3 hover:text-primary-600 focus:text-primary-600 active:text-primary-800',
        linkDark:
          'p-0 text-gray-900 hover:text-primary-600 hover:underline hover:underline-offset-3 focus:text-primary-600 active:text-primary-800',
      },
    },
    defaultVariants: {
      variant: 'solid',
    },
  }
)

const Button = ({
  children = 'Button',
  link = '#',
  variant,
  className = '',
}) => {
  return (
    <a className={cn(buttonVariants({ variant, className }))} href={link}>
      {children}
      <ChevronRightIcon />
    </a>
  )
}

export const Link = ({
  children,
  link = '#',
  variant = 'link',
  className = '',
}) => {
  return (
    <a className={cn(buttonVariants({ variant, className }))} href={link}>
      {children}
    </a>
  )
}

const ChevronRightIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
)

Button.displayName = 'Button'
export default Button
