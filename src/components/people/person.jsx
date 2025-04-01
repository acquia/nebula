import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'

const headingVariants = cva('font-bold sm:text-base lg:text-lg', {
  variants: {
    textColor: {
      Dark: 'text-gray-800',
      Light: 'text-white',
    },
  },
})

const titleVariants = cva('text-xs text-blue-700 sm:text-sm lg:text-base', {
  variants: {
    textColor: {
      Dark: 'text-blue-700',
      Light: 'text-primary-light',
    },
  },
})

/**
 * Consists of an image and text container for a person's name and title.
 */
function Person({
  avatar,
  avatarAltText,
  headingElement = 'h3',
  headingColor = 'Dark',
  name,
  title,
  titleColor = 'Dark',
  imageClasses,
  textClasses,
  align = 'center',
}) {
  const Heading = headingElement
  return (
    <>
      {avatar && (
        <img
          alt={avatarAltText}
          className={cn(
            'h-auto rounded-xl sm:w-48 lg:w-60',
            imageClasses,
            align === 'center' && 'mx-auto'
          )}
          src={avatar}
        />
      )}
      <div className={cn('mt-2 flex flex-col gap-1 sm:mt-4', textClasses)}>
        <Heading className={cn(headingVariants({ textColor: headingColor }))}>
          {name}
        </Heading>
        <p className={cn(titleVariants({ textColor: titleColor }))}>{title}</p>
      </div>
    </>
  )
}

Person.propTypes = {
  /**
   * The alignment of the author's name and title.
   */
  align: PropTypes.oneOf(['left', 'center', 'right']),
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
   * Additional classes to apply to the image.
   */
  imageClasses: PropTypes.string,
  /**
   * The name of the author.
   */
  name: PropTypes.string.isRequired,
  /**
   * Additional classes to apply to the name + title text container.
   */
  textClasses: PropTypes.string,
  /**
   * The title of the author.
   */
  title: PropTypes.string.isRequired,
}

export default Person
