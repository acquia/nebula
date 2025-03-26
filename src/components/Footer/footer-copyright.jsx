import PropTypes from 'prop-types'

import Copyright from './copyright'

const FooterCopyright = ({ footerElement }) => {
  const Footer = footerElement || 'footer'

  return (
    <Footer className="mt-5 border-t border-solid border-slate-200 pt-5">
      <div className="sm:flex sm:items-center sm:justify-between">
        {/* <div className="flex flex-wrap items-center gap-3"> */}
        <Copyright text={`© ${new Date().getFullYear()} Company Name.`} />
        {/* </div> */}
      </div>
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
}
