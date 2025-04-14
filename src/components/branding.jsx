import PropTypes from 'prop-types'

import { cn } from '../lib/utils'

const Branding = ({ className, homeUrl, logo, siteName, title }) => {
  if (!logo) return null

  const img = (
    <img
      alt=""
      className="max-h-full"
      fetchPriority="high"
      src={logo}
      title={title}
    />
  )

  return (
    <>
      {homeUrl ? (
        <a
          aria-label={siteName}
          className={cn('inline-block', className)}
          href={homeUrl}
        >
          {img}
        </a>
      ) : (
        img
      )}
    </>
  )
}

export default Branding

Branding.propTypes = {
  /**
   * Additional classes to apply.
   */
  className: PropTypes.string,
  /**
   * The URL of the home page.
   */
  homeUrl: PropTypes.string,
  /**
   * The URL of the logo image.
   */
  logo: PropTypes.string,
  /**
   * The name of the site.
   */
  siteName: PropTypes.string,
  /**
   * The title tooltip when hovering over the logo image.
   */
  title: PropTypes.string,
}
