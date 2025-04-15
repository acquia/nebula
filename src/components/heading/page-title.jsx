import PropTypes from 'prop-types'

import Heading from './heading'

const PageTitle = ({ className, headingSize, layout, textColor, title }) => {
  return (
    <Heading
      className={className}
      heading={title}
      headingElement="h1"
      headingSize={headingSize}
      layout={layout}
      textColor={textColor}
    />
  )
}

PageTitle.displayName = 'PageTitle'
export default PageTitle

/**
 * PageTitle component props
 */
PageTitle.propTypes = {
  /**
   * Additional class names
   */
  className: PropTypes.string,

  /**
   * Size of the heading
   */
  headingSize: PropTypes.oneOf(['ExtraLarge', 'Large', 'Medium', 'Small']),

  /**
   * Layout of the heading
   */
  layout: PropTypes.oneOf(['Left aligned', 'Center aligned', 'Right aligned']),

  /**
   * Color of the text
   */
  textColor: PropTypes.oneOf(['Dark', 'Light']),

  /**
   * The title text content
   */
  title: PropTypes.string.isRequired,
}
