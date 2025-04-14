import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

const textVariants = cva('text-xs', {
  variants: {
    textColor: {
      Dark: 'text-gray-dark',
      Light: 'text-gray-light',
    },
    defaultVariants: {
      textColor: 'Dark',
    },
  },
})

/**
 * !NOTE: This is almost the same as the Text component.
 * Possibly re-use instead of this one, but pass through the textSize prop
 * and textColor override?
 
 */
const Copyright = ({ text, textColor }) => {
  return <p className={textVariants({ textColor })}>{text}</p>
}

export default Copyright

Copyright.propTypes = {
  /**
   * The text to display in the copyright section.
   */
  text: PropTypes.string,
  /**
   * Specifies the text color to use.
   * Options are 'Dark' and 'Light'.
   */
  textColor: PropTypes.oneOf(['Dark', 'Light']),
}
