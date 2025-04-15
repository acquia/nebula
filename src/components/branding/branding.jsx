import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'

const sizeVariants = cva('max-h-full object-contain', {
  variants: {
    size: {
      original: '',
      large: 'scale-75',
      medium: 'scale-50',
      small: 'scale-40',
    },
    defaultVariants: {
      size: 'original',
    },
  },
})

const Branding = ({ className, homeUrl, logo, size, siteName, title }) => {
  if (!logo) return null

  const img = (
    <img
      alt=""
      className={cn(sizeVariants({ size }), !homeUrl && className)}
      fetchPriority="high"
      src={logo}
      title={title}
    />
  )

  return (
    <>
      {homeUrl ? (
        <a aria-label={siteName} className={className} href={homeUrl}>
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
   * The size of the logo.
   * Options are 'original', 'large', 'medium', and 'small'.
   */
  size: PropTypes.oneOf(['original', 'large', 'medium', 'small']),
  /**
   * The title tooltip when hovering over the logo image.
   */
  title: PropTypes.string,
}
