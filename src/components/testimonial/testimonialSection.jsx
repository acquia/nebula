import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

import Testimonial from './testimonial'

export default function TestimonialSection({
  background,
  image,
  imageAltText,
  imagePlacement = 'left',
  textColor,
  ...props
}) {
  const variants = cva(
    'min-h-100 gap-8 p-8 flex flex-row flex-wrap items-center justify-between bg-top bg-no-repeat',
    {
      variants: {
        textColor: {
          Dark: '',
          Light: 'text-white',
        },
      },
    }
  )

  return (
    <div
      className={variants({ textColor })}
      style={{ backgroundImage: `url(${background})`, color: textColor }}
    >
      {image && imagePlacement === 'left' && (
        <div className="md:flex-1">
          <img alt={imageAltText} src={image} />
        </div>
      )}
      <div className="md:flex-1">
        <Testimonial textColor={textColor} {...props} />
      </div>
      {image && imagePlacement === 'right' && (
        <div className="md:flex-1">
          <img alt={imageAltText} src={image} />
        </div>
      )}
    </div>
  )
}

TestimonialSection.propTypes = {
  /** Background image URL for the testimonial section */
  background: PropTypes.string,
  /** Image URL to be displayed alongside the testimonial */
  image: PropTypes.string,
  /** Alt text for the image for accessibility */
  imageAltText: PropTypes.string,
  /** Controls the placement of the image relative to the testimonial text */
  imagePlacement: PropTypes.oneOf(['left', 'right']),
  /** Additional props passed to the Testimonial component */
  props: PropTypes.object,
  /** Controls the text color of the testimonial */
  textColor: PropTypes.oneOf(['Dark', 'Light']),
}

TestimonialSection.defaultProps = {
  imagePlacement: 'left',
}
