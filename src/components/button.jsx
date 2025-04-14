import { cva } from 'class-variance-authority'

import { cn } from '../lib/utils'

const baseStyles = {
  disable: 'disabled:pointer-events-none disabled:opacity-50',
  focus:
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:no-underline focus-visible:outline-primary-500 focus-visible:rounded-lg focus-visible:border-transparent',
  svg: '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
}

const buttonVariants = cva(
  cn(
    'gap-2 rounded-lg px-4 py-3 text-sm font-medium inline-flex cursor-pointer items-center justify-center whitespace-nowrap transition-colors',
    baseStyles.disable,
    baseStyles.focus,
    baseStyles.svg
  ),
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
        linkLight:
          'p-0 text-white hover:text-primary-100 hover:underline hover:underline-offset-3 focus:text-primary-100 active:text-primary-200',
        navLinkDark:
          'md:px-1 md:py-3 rounded-none border-s-0 border-transparent hover:border-primary-600 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 active:border-primary-800 active:text-primary-800',
      },
    },
    defaultVariants: {
      variant: 'solid',
    },
  }
)

const Button = ({
  children = 'Button',
  className = '',
  link = '#',
  variant,
  ...props
}) => {
  return (
    <a
      className={cn(buttonVariants({ variant }), className)}
      href={link}
      {...props}
    >
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
  ...props
}) => {
  return (
    <a
      className={cn(buttonVariants({ variant }), className)}
      href={link}
      {...props}
    >
      {children}
    </a>
  )
}

export const IconButton = ({ variant, children, link, ...props }) => {
  return (
    <Link className="size-10" link={link} variant={variant} {...props}>
      {children}
    </Link>
  )
}

const ChevronRightIcon = () => (
  <svg
    aria-hidden="true"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
)

Button.displayName = 'Button'
export default Button
