const ProgressCard = ({
  title = 'Project',
  link = '#',
  status = 'Not Started',
  progress = 0,
  footer = null,
}) => {
  const statusBadge = {
    'Not Started': 'bg-gray-200 text-black',
    'In Progress': 'bg-purple-200 text-black',
    Completed: 'bg-green-200 text-black',
  }
  return (
    <div className="max-w-md rounded-lg shadow-sm hover:shadow-lg w-full bg-drupal-blue text-white transition-all duration-300">
      <div className="space-y-1 p-6 flex flex-col">
        <div className="flex w-full items-start justify-between">
          <div className="space-y-2">
            <span
              className={`${statusBadge[status]} px-2 py-0.5 text-xs font-medium inline-flex items-center rounded-full border-transparent`}
            >
              {status}
            </span>
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>
          <a
            aria-label="Open"
            className="h-8 w-8 rounded-md text-sm font-medium inline-flex items-center justify-center bg-gray-100 whitespace-nowrap text-black transition-colors hover:bg-gray-300"
            href={link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M15.78 5.113C14.09 3.425 12.48 1.815 11.998 0c-.48 1.815-2.09 3.425-3.778 5.113-2.534 2.53-5.405 5.4-5.405 9.702a9.184 9.185 0 1 0 18.368 0c0-4.303-2.871-7.171-5.405-9.702M6.72 16.954c-.563-.019-2.64-3.6 1.215-7.416l2.55 2.788a.218.218 0 0 1-.016.325c-.61.625-3.204 3.227-3.527 4.126-.066.186-.164.18-.222.177M12 21.677a3.158 3.158 0 0 1-3.158-3.159 3.291 3.291 0 0 1 .787-2.087c.57-.696 2.37-2.655 2.37-2.655s1.774 1.988 2.367 2.649a3.09 3.09 0 0 1 .792 2.093A3.158 3.158 0 0 1 12 21.677m6.046-5.123c-.068.15-.223.398-.431.405-.371.014-.411-.177-.686-.583-.604-.892-5.864-6.39-6.848-7.455-.866-.935-.122-1.595.223-1.94C10.736 6.547 12 5.285 12 5.285s3.766 3.574 5.336 6.016c1.57 2.443 1.029 4.556.71 5.253"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm flex justify-between">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div
              aria-valuemax="100"
              aria-valuemin="0"
              className="h-2 relative w-full overflow-hidden rounded-full bg-primary-100"
              data-max="100"
              data-state="indeterminate"
              role="progressbar"
            >
              <div
                className="border-red-600 bg-yellow-400 h-full w-full flex-1 border-r-3 transition-all"
                data-max="100"
                data-state="indeterminate"
                style={{ transform: `translateX(-${100 - progress}%)` }}
              ></div>
            </div>
          </div>
          <div className="overflow-hidden" style={{ height: '0px' }}>
            <div></div>
          </div>
        </div>
      </div>
      {footer && (
        <footer className="p-6 pt-0 text-sm flex items-center">{footer}</footer>
      )}
    </div>
  )
}

ProgressCard.displayName = 'Card'
export default ProgressCard
