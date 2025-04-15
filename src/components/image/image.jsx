import PropTypes from 'prop-types'

import { cn } from '../../lib/utils'

const Image = ({ alt, className, src, ...props }) => {
  return (
    <img
      alt={alt}
      className={(cn('my-8 max-w-full'), className)}
      src={src}
      {...props}
    />
  )
}

export default Image

Image.propTypes = {
  /**
   * The alt text for the image.
   */
  alt: PropTypes.string,
  /**
   * Additional classes to apply.
   */
  className: PropTypes.string,
  /**
   * The source URL of the image.
   */
  src: PropTypes.string,
}
