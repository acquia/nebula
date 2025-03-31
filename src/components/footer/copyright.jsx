import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

const textVariants = cva('text-xs', {
  variants: {
    textColor: {
      Dark: 'text-gray-600',
      Light: 'text-gray-200',
    },
    defaultVariants: {
      textColor: 'solid',
    },
  },
})

const Copyright = ({ textColor, text }) => {
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
