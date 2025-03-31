import PropTypes from 'prop-types'

const FooterMinimal = ({ copyright, footerElement, social }) => {
  const Footer = footerElement || 'footer'

  return (
    <Footer className="mt-5 border-t border-slate-200 pt-5">
      <div className="sm:flex sm:items-center sm:justify-between">
        {copyright && (
          <div className="flex flex-wrap items-center gap-3">{copyright}</div>
        )}
        {social}
      </div>
    </Footer>
  )
}

export default FooterMinimal

FooterMinimal.propTypes = {
  /**
   * Allows for customizing the footer element.
   * Use 'div' if nesting within a footer element.
   * @default 'footer'
   */
  footerElement: PropTypes.elementType,
  /**
   * The copyright component and text to display in the footer.
   */
  copyright: PropTypes.node,
  /**
   * The social icons to display in the footer.
   */
  social: PropTypes.node,
}
