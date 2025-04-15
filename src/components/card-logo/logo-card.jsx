import PropTypes from 'prop-types'

export default function LogoCard({
  altText,
  backgroundColor = '#F1F5F9',
  image,
}) {
  return (
    <div
      className="align-center max-h-33 max-w-50 gap-4 rounded-2xl p-6 flex flex-col justify-center leading-[normal]"
      style={{ backgroundColor }}
    >
      <img alt={altText} className="w-50 h-auto object-contain" src={image} />
    </div>
  )
}

LogoCard.propTypes = {
  /**
   * The alt text for the logo image.
   */
  altText: PropTypes.string,
  /**
   * The background color of the card.
   */
  backgroundColor: PropTypes.string,
  /**
   * The image source URL for the logo.
   */
  image: PropTypes.string.isRequired,
}

LogoCard.defaultProps = {
  backgroundColor: '#F1F5F9',
}
