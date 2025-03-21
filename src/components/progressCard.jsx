const ProgressCard = ({
  title = "Project",
  link = "#",
  status = "Not Started",
  progress = 0,
  footer = null,
}) => {
  const statusBadge = {
    "Not Started": "bg-drupal-gray-mildest text-drupal-gray-darker",
    "In Progress": "bg-drupal-purple text-drupal-navy",
    Completed: "bg-green-200 text-drupal-green",
  };
  return (
    <div className="w-full max-w-md rounded-lg bg-drupal-blue text-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col space-y-1 p-6">
        <div className="flex w-full items-start justify-between">
          <div className="space-y-2">
            <span
              className={`${statusBadge[status]} inline-flex items-center rounded-full border-transparent px-2 py-0.5 text-xs font-medium`}
            >
              {status}
            </span>
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>
          <a
            href={link}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-drupal-gray-mildest text-sm font-medium whitespace-nowrap text-drupal-dark-navy transition-colors hover:bg-drupal-gray-milder"
            role="link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.78 5.113C14.09 3.425 12.48 1.815 11.998 0c-.48 1.815-2.09 3.425-3.778 5.113-2.534 2.53-5.405 5.4-5.405 9.702a9.184 9.185 0 1 0 18.368 0c0-4.303-2.871-7.171-5.405-9.702M6.72 16.954c-.563-.019-2.64-3.6 1.215-7.416l2.55 2.788a.218.218 0 0 1-.016.325c-.61.625-3.204 3.227-3.527 4.126-.066.186-.164.18-.222.177M12 21.677a3.158 3.158 0 0 1-3.158-3.159 3.291 3.291 0 0 1 .787-2.087c.57-.696 2.37-2.655 2.37-2.655s1.774 1.988 2.367 2.649a3.09 3.09 0 0 1 .792 2.093A3.158 3.158 0 0 1 12 21.677m6.046-5.123c-.068.15-.223.398-.431.405-.371.014-.411-.177-.686-.583-.604-.892-5.864-6.39-6.848-7.455-.866-.935-.122-1.595.223-1.94C10.736 6.547 12 5.285 12 5.285s3.766 3.574 5.336 6.016c1.57 2.443 1.029 4.556.71 5.253"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-drupal-gray-mildest">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div
              aria-valuemax="100"
              aria-valuemin="0"
              role="progressbar"
              data-state="indeterminate"
              data-max="100"
              className="relative h-2 w-full overflow-hidden rounded-full bg-drupal-light-blue"
            >
              <div
                data-state="indeterminate"
                data-max="100"
                className="h-full w-full flex-1 border-r-3 border-drupal-red bg-drupal-yellow transition-all"
                style={{ transform: `translateX(-${100 - progress}%)` }}
              ></div>
            </div>
          </div>
          <div className="overflow-hidden" style={{ height: "0px" }}>
            <div></div>
          </div>
        </div>
      </div>
      {footer && (
        <div className="flex items-center p-6 pt-0 text-sm text-drupal-gray-mildest">
          {footer}
        </div>
      )}
    </div>
  );
};

ProgressCard.displayName = "Card";
export default ProgressCard;
