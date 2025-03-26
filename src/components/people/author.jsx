import { Person } from './person'

/**
 * For use in Article sections.
 */
function Author({ ...props }) {
  return (
    <Person
      {...props}
      imageClasses="rounded-full"
      textClasses="items-flex-start"
    />
  )
}

Author.propTypes = {
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
}
