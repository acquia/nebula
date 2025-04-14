import PropTypes from 'prop-types'

export default function IconListItem({ bulletImage, children }) {
  return (
    <li className="mb-4 gap-x-3 flex">
      {bulletImage ? (
        <span className="mt-0.5 size-5 min-h-6 min-w-6 flex items-center justify-center rounded-full bg-primary-800 fill-white text-white">
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
}
