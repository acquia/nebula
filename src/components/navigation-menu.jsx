import { useState } from 'react'

import { cn } from '../lib/utils'

/* eslint-disable-next-line no-unused-vars */
const NavigationMenu = ({ id, label, links }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="flex justify-end md:hidden">
        <button
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="relative flex size-9 items-center justify-center rounded-lg border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none"
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
          'absolute left-0 w-screen border-b border-solid border-slate-200 bg-white px-10 py-6 md:static md:block md:w-full md:border-none md:px-8 md:py-0',
          open ? '' : 'hidden'
        )}
      >
        <div className="max-h-[75vh] overflow-hidden overflow-y-auto">
          <div className="flex flex-col gap-0.5 py-2 md:flex-row md:items-center md:justify-center md:gap-1 md:py-0">
            {links.map(({ key, title, url }) => (
              <a
                key={key}
                aria-current="page"
                className="flex items-center p-2 text-sm text-blue-600 focus:text-blue-600 focus:outline-none dark:text-blue-500 dark:focus:text-blue-500"
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
