const Breadcrumb = ({ links }) => {
  return (
    links && (
      <nav aria-labelledby="system-breadcrumb">
        <h2 className="sr-only" id="system-breadcrumb">
          Breadcrumb
        </h2>
        <ol className="flex items-center whitespace-nowrap">
          {links.map(({ key, text, url }, index) => (
            <li key={key} className="inline-flex items-center">
              {url ? (
                <a
                  className="flex items-center p-0 text-sm text-gray-900 hover:text-primary-600 hover:underline hover:underline-offset-3 focus:text-primary-600 focus-visible:rounded-lg focus-visible:border-transparent focus-visible:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 active:text-primary-800"
                  href={url}
                >
                  {text}
                </a>
              ) : (
                <span className="inline-flex items-center truncate text-sm font-semibold text-gray-800">
                  {text}
                </span>
              )}
              {index !== links.length - 1 && (
                <svg
                  aria-hidden="true"
                  className="mx-2 size-4 shrink-0 text-gray-400 dark:text-neutral-600"
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
