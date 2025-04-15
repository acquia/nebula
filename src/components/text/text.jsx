import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'

const textVariants = cva('my-8', {
  variants: {
    textColor: {
      Dark: 'text-black',
      Light: 'text-white',
    },
    textSize: {
      ExtraSmall: 'text-xs',
      Small: 'text-sm',
      Normal: 'text-base/6',
      Large: 'text-lg/8',
      ExtraLarge: 'text-xl/8',
    },
  },
})

const Text = ({ text, textSize, textColor, className }) => {
  return (
    <p className={cn(textVariants({ textColor, textSize }), className)}>
      {text}
    </p>
  )
}

export default Text

/**
 * Text component with customizable appearance
 * @component
 */
Text.propTypes = {
  /** Additional class names to apply to the text */
  className: PropTypes.string,
  /** The content to be displayed */
  text: PropTypes.node.isRequired,
  /** Controls the text color */
  textColor: PropTypes.oneOf(['Dark', 'Light']),
  /** Controls the size of the text */
  textSize: PropTypes.oneOf([
    'ExtraSmall',
    'Small',
    'Normal',
    'Large',
    'ExtraLarge',
  ]),
}
