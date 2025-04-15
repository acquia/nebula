import { useState } from 'react'
import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'

const NavigationMenu = ({ backgroundColor = '#ffffff', label, links }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="md:hidden flex justify-end">
        <button
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="size-9 rounded-lg text-sm font-semibold relative flex items-center justify-center border border-gray-200 text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none"
          onClick={() => {
            setOpen(!open)
          }}
          type="button"
        >
          <svg
            className={cn('size-4', open ? 'hidden' : '')}
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
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
          <svg
            className={cn('size-4 shrink-0', open ? '' : 'hidden')}
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span className="sr-only">{`${open ? 'Close' : 'Open'} navigation`}</span>
        </button>
      </div>
      <nav
        aria-label={label}
        className={cn(
          'left-0 px-10 py-6 md:static md:block md:w-full md:border-none md:px-8 md:py-0 bg absolute w-screen border-b border-solid border-gray-200',
          'bg-[var(--color-bg)]',
          open ? '' : 'hidden'
        )}
        style={{
          '--color-bg': backgroundColor,
        }}
      >
        <div className="p-2 max-h-[75vh] overflow-hidden overflow-y-auto">
          <div className="gap-0.5 py-2 md:flex-row md:items-center md:justify-center md:gap-1 md:py-0 flex flex-col">
            {links.map(({ key, title, url }) => (
              <a
                key={key}
                aria-current="page"
                className="p-1 text-sm focus-visible:rounded-lg flex items-center text-primary-600 hover:text-primary-800 hover:underline hover:underline-offset-2 focus:text-primary-800 focus-visible:border-transparent focus-visible:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 active:text-primary-900"
                href={url}
              >
                {title}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavigationMenu

NavigationMenu.propTypes = {
  /**
   * The background color of the navigation menu
   */
  backgroundColor: PropTypes.string,

  /**
   * The accessible label for the navigation menu
   */
  label: PropTypes.string.isRequired,

  /**
   * Array of link objects to be rendered in the navigation menu
   */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Unique identifier for the link
       */
      key: PropTypes.string.isRequired,

      /**
       * Display text for the link
       */
      title: PropTypes.string.isRequired,

      /**
       * URL the link points to
       */
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
}
