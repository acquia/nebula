import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'

const cardVariants = cva(
  'max-w-md gap-4 rounded-2xl pb-6 flex w-full flex-col items-center leading-[normal]',
  {
    variants: {
      layout: {
        'Left aligned': 'items-start text-left',
        'Center aligned': 'items-center text-center',
        'Right aligned': 'items-end text-right',
      },
    },
    defaultVariants: {
      layout: 'Align left',
    },
  }
)

const headingVariants = cva('font-bold sm:text-base lg:text-lg', {
  variants: {
    textColor: {
      Dark: 'text-gray-800',
      Light: 'text-white',
    },
  },
})

const titleVariants = cva('text-xs sm:text-sm lg:text-base', {
  variants: {
    textColor: {
      Dark: 'text-primary-dark',
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
  backgroundColor = '',
  backgroundColorOnHover = '',
  className,
  name,
  headingColor = 'Dark',
  headingElement = 'h3',
  layout = 'Left aligned',
  title,
  titleColor = 'Dark',
  imageClasses,
  textClasses,
}) {
  const Heading = headingElement
  return (
    <div
      className={cn(
        cardVariants({ layout }),
        'rounded-xl',
        'p-4',
        'bg-[var(--color-bg)]',
        'hover:bg-[var(--color-bg-hover)]',
        className
      )}
      style={{
        '--color-bg': backgroundColor,
        '--color-bg-hover': backgroundColorOnHover,
      }}
    >
      {avatar && (
        <img
          alt={avatarAltText}
          className={cn(
            'rounded-xl sm:w-48 lg:w-60 h-auto',
            imageClasses,
            layout === 'center' && 'mx-auto'
          )}
          src={avatar}
        />
      )}
      {(name || title) && (
        <div className={cn('mt-2 gap-1 sm:mt-4 flex flex-col', textClasses)}>
          {name && (
            <Heading
              className={cn(headingVariants({ textColor: headingColor }))}
            >
              {name}
            </Heading>
          )}
          {title && (
            <p className={cn(titleVariants({ textColor: titleColor }))}>
              {title}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

Person.propTypes = {
  /**
   * The image.
   */
  avatar: PropTypes.string,
  /**
   * The alt text for the avatar image.
   */
  avatarAltText: PropTypes.string,
  /**
   * The background color of the card.
   */
  backgroundColor: PropTypes.string,
  /**
   * The background color of the card on hover.
   */
  backgroundColorOnHover: PropTypes.string,
  /**
   * The class name for the card.
   */
  className: PropTypes.string,
  /**
   * The color of the heading text.
   */
  headingColor: PropTypes.oneOf(['Dark', 'Light']),
  /**
   * The heading element.
   */
  headingElement: PropTypes.string,
  /**
   * The class name for the image avatar.
   */
  imageClasses: PropTypes.string,
  /**
   * The layout alignment of the card.
   */
  layout: PropTypes.oneOf(['Left aligned', 'Center aligned', 'Right aligned']),
  /**
   * The name of the person.
   */
  name: PropTypes.string.isRequired,
  /**
   * The class name for the text.
   */
  textClasses: PropTypes.string,
  /**
   * The title of the person.
   */
  title: PropTypes.string,
  /**
   * The color of the title text.
   */
  titleColor: PropTypes.oneOf(['Dark', 'Light']),
}

export default Person
