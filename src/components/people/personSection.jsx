import PropTypes from 'prop-types'

import Button from '../button/button'
import CardContainer from '../card/cardContainer'
import Heading from '../heading/heading'

export default function PersonSection({
  children,
  headingElement = 'h2',
  heading,
  link,
  linkLabel,
  preHeading,
  text,
}) {
  return (
    <div className="gap-12 max-md:flex-col flex">
      <div className="max-w-2xl gap-6 mx-auto flex flex-1/2 flex-col">
        <Heading
          heading={heading}
          headingElement={headingElement}
          headingSize="Medium"
          preHeading={preHeading}
        />
        <p>{text}</p>
        <div>
          <Button link={link} variant="outlineDark">
            {linkLabel}
          </Button>
        </div>
      </div>
      <div className="flex-1/2">
        <CardContainer>{children}</CardContainer>
      </div>
    </div>
  )
}

PersonSection.propTypes = {
  /**
   * Content to display in the card container
   */
  children: PropTypes.node,
  /**
   * The heading text to display
   */
  heading: PropTypes.string.isRequired,
  /**
   * HTML element to use for the heading
   */
  headingElement: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  /**
   * URL for the button link
   */
  link: PropTypes.string.isRequired,
  /**
   * Text for the button
   */
  linkLabel: PropTypes.string.isRequired,
  /**
   * Text to display above the heading
   */
  preHeading: PropTypes.string,
  /**
   * Text content to display below the heading
   */
  text: PropTypes.string,
}
