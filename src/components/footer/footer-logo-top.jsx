import PropTypes from 'prop-types'

export default function FooterLogoTop({ footerElement, logo, social }) {
  const Footer = footerElement || 'footer'
  return (
    <Footer className="mt-5 gap-4 px-8 py-3 pt-5 md:grid-cols-[1fr_1fr] grid w-full grid-cols-2 justify-between border-t border-gray-200">
      <div className="my-1 max-h-8 md:my-3 items-center">{logo}</div>
      {social && <div className="flex justify-end">{social}</div>}
    </Footer>
  )
}

FooterLogoTop.propTypes = {
  /**
   * Allows for customizing the footer element.
   * Use 'div' if nesting within a footer element.
   * @default 'footer'
   */
  footerElement: PropTypes.elementType,
  /**
   * The logo element to display in the footer.
   */
  logo: PropTypes.element.isRequired,
  /**
   * The social icons to display in the footer.
   */
  social: PropTypes.node,
}
