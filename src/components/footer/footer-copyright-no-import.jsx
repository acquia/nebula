import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

const textVariants = cva('text-xs', {
  variants: {
    textColor: {
      Dark: 'text-gray-600',
      Light: 'text-gray-200',
    },
    defaultVariants: {
      textColor: 'Dark',
    },
  },
})

const FooterCopyright = ({ footerElement, text, textColor }) => {
  const Footer = footerElement || 'footer'

  return (
    <Footer className="mt-5 border-t border-slate-200 pt-5">
      <p className={textVariants({ textColor })}>{text}</p>
    </Footer>
  )
}

export default FooterCopyright

FooterCopyright.propTypes = {
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
