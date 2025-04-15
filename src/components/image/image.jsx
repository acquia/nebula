import PropTypes from 'prop-types'

const Image = ({ image }) => {
  return <img {...image} className="my-8 max-w-full" />
}

export default Image

Image.propTypes = {
  image: PropTypes.shape({
    alt: PropTypes.string,
    className: PropTypes.string,
    src: PropTypes.string,
  }),
}
