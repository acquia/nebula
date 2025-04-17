import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'

export default function IconListItem({
  bulletImage,
  children,
  className,
  iconClassName,
}) {
  return (
    <li className={cn('mb-4 gap-x-3 flex', className)}>
      {bulletImage ? (
        <span
          className={cn(
            'mt-0.5 size-5 min-h-6 min-w-6 flex items-center justify-center rounded-full',
            iconClassName
          )}
        >
          <img className="size-3.5" src={bulletImage} />
        </span>
      ) : null}
      <div>{children}</div>
    </li>
  )
}

IconListItem.propTypes = {
  /**
   * The image to use as the bullet point.
   */
  bulletImage: PropTypes.string,
  /**
   * The content of the list item.
   */
  children: PropTypes.node,
  /**
   * Additional class names for the list item.
   */
  className: PropTypes.string,
  /**
   * Additional class names for the icon.
   */
  iconClassName: PropTypes.string,
}
