import { cva } from 'class-variance-authority'

import { cn } from '../lib/utils'

const textVariants = cva('', {
  variants: {
    textColor: {
      Dark: 'text-black',
      Light: 'text-white',
    },
    linkColor: {
      Dark: 'focus-visible:rounded-lg text-gray-900 hover:text-primary-600 hover:underline hover:underline-offset-3 focus:text-primary-600 focus-visible:border-transparent focus-visible:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 active:text-primary-800',
      Light:
        'focus-visible:rounded-lg text-white hover:text-primary-200 hover:underline hover:underline-offset-3 focus:text-primary-200 focus-visible:border-transparent focus-visible:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 active:text-primary-300',
    },
    textSize: {
      Large: 'text-base',
      Medium: 'text-sm',
      Small: 'text-xs',
    },
    defaultVariants: {
      textColor: 'Dark',
      textSize: 'Medium',
    },
  },
})

const Breadcrumb = ({ className, links, textColor, textSize }) => {
  return (
    links && (
      <nav aria-label="Breadcrumbs">
        <ol
          className={cn(
            'flex items-center whitespace-nowrap',
            textVariants({ textColor, textSize }),
            className
          )}
        >
          {links.map(({ key, text, url }, index) => (
            <li key={key} className="inline-flex items-center">
              {url ? (
                <a
                  className={cn('p-0', textVariants({ linkColor: textColor }))}
                  href={url}
                >
                  {text}
                </a>
              ) : (
                <span className="font-semibold inline-flex items-center truncate">
                  {text}
                </span>
              )}
              {index !== links.length - 1 && (
                <svg
                  aria-hidden="true"
                  className="mx-2 size-4 shrink-0 text-gray-400"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              )}
            </li>
          ))}
        </ol>
      </nav>
    )
  )
}

Breadcrumb.displayName = 'Breadcrumb'
export default Breadcrumb
