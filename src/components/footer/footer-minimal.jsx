import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'

const FooterMinimal = ({ className, copyright, footerElement, social }) => {
  const Footer = footerElement || 'footer'

  return (
    <Footer className={cn('mt-5 pt-5 border-t border-gray-200', className)}>
      <div className="sm:flex sm:items-center sm:justify-between">
        {copyright && (
          <div className="gap-3 flex flex-wrap items-center">{copyright}</div>
        )}
        {social}
      </div>
    </Footer>
  )
}

export default FooterMinimal

FooterMinimal.propTypes = {
  /**
   * Additional classes to apply.
   */
  className: PropTypes.string,
  /**
   * The copyright component and text to display in the footer.
   */
  copyright: PropTypes.node,
  /**
   * Allows for customizing the footer element.
   * Use 'div' if nesting within a footer element.
   * @default 'footer'
   */
  footerElement: PropTypes.elementType,
  /**
   * The social icons to display in the footer.
   */
  social: PropTypes.node,
}
