import PropTypes from 'prop-types'

import Social from './social'

export default function FooterLogoTop({ footerElement, logo }) {
  const Footer = footerElement || 'footer'
  return (
    <Footer className="grid w-full grid-cols-2 justify-between gap-4 border-t border-solid border-slate-200 bg-white px-8 py-3 leading-[normal] md:grid-cols-[1fr_1fr]">
      <div className="my-1 max-h-8 items-center md:my-3">{logo}</div>
      <div className="justify-self-end md:px-6 md:py-2">
        <Social />
      </div>
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
}
