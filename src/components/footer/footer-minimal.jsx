import PropTypes from 'prop-types'

import Social from '../social/social'
import Copyright from './copyright'

const FooterMinimal = ({ footerElement }) => {
  const Footer = footerElement || 'footer'

  return (
    <Footer className="mt-5 border-t border-solid border-slate-200 pt-5">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Copyright text={`© ${new Date().getFullYear()} Company Name.`} />
        </div>
        <Social variant="ghostNeutral" />
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
}
