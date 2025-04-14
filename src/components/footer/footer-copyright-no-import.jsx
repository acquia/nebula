import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'

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

const FooterCopyright = ({ className, footerElement, text, textColor }) => {
  const Footer = footerElement || 'footer'

  return (
    <Footer className={cn('mt-5 pt-5 border-t border-gray-200', className)}>
      <p className={textVariants({ textColor })}>{text}</p>
    </Footer>
  )
}

export default FooterCopyright

FooterCopyright.propTypes = {
  /**
   * Additional classes to apply.
   */
  className: PropTypes.string,
  /**
   * Allows for customizing the footer element.
   * Use 'div' if nesting within a footer element.
   * @default 'footer'
   */
  footerElement: PropTypes.elementType,
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
