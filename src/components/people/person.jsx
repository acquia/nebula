import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'

function Person({
  name,
  title,
  avatar,
  avatarAltText,
  imageClasses,
  textClasses,
  headingElement = 'h3',
  align = 'center',
}) {
  const Heading = headingElement
  return (
    <>
      <img
        className={cn(
          'h-auto rounded-xl sm:w-48 lg:w-60',
          imageClasses,
          align === 'center' && 'mx-auto'
        )}
        src={avatar}
        alt={avatarAltText}
      />
      <div className={cn('mt-2 flex flex-col gap-1 sm:mt-4', textClasses)}>
        <Heading className="font-bold text-gray-800 sm:text-base lg:text-lg">
          {name}
        </Heading>
        <p className="text-xs text-blue-700 sm:text-sm lg:text-base">{title}</p>
      </div>
    </>
  )
}

Person.propTypes = {
  /**
   * The name of the author.
   */
  name: PropTypes.string.isRequired,
  /**
   * The title of the author.
   */
  title: PropTypes.string.isRequired,
  /**
   * The path to the author's avatar image.
   */
  avatar: PropTypes.string.isRequired,
  /**
   * The alt text for the author's avatar image.
   */
  avatarAltText: PropTypes.string.isRequired,
  /**
   * Type of heading to use for the author's name.
   */
  headingElement: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  /**
   * The alignment of the author's name and title.
   */
  align: PropTypes.oneOf(['left', 'center', 'right']),
  /**
   * Additional classes to apply to the image.
   */
  imageClasses: PropTypes.string,
  /**
   * Additional classes to apply to the name + title text container.
   */
  textClasses: PropTypes.string,
}

export default Person
