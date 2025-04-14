import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'
import Person from './person'

/**
 * A card component for displaying a person's name, title, and avatar.
 */
function PersonCard({ backgroundColor = '', className, ...props }) {
  return (
    <div
      className={cn(
        'align-center min-h-45 max-w-70 gap-4 rounded-2xl p-4 flex flex-col justify-center text-center leading-[normal]',
        'bg-[var(--color-bg)]',
        className
      )}
      style={{
        '--color-bg': backgroundColor,
      }}
    >
      <Person {...props} />
    </div>
  )
}

PersonCard.propTypes = {
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
   * The background color of the card.
   */
  backgroundColor: PropTypes.string,
  /**
   * Additional classes to apply to the card.
   */
  className: PropTypes.string,
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

export default PersonCard
