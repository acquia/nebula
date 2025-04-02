import PropTypes from 'prop-types'

const FooterLinks = ({ children, className, title }) => {
  return (
    <div className={className}>
      {title && (
        <div className="mb-3 text-xs font-semibold uppercase">{title}</div>
      )}
      <div className="grid space-y-3 text-sm">{children}</div>
    </div>
  )
}

export default FooterLinks

FooterLinks.propTypes = {
  /**
   * The content of the column.
   */
  children: PropTypes.node,
  /**
   * Additional classes to apply to the column.
   */
  className: PropTypes.string,
  /**
   * The title of the column.
   */
  title: PropTypes.string,
}
