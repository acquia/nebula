import PropTypes from 'prop-types'

import Copyright from './copyright'

const FooterCopyright = ({ footerElement, text, textColor }) => {
  const Footer = footerElement || 'footer'

  return (
    <Footer className="mt-5 pt-5 border-t border-gray-200">
      <Copyright text={text} textColor={textColor} />
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
