import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

import TwoColumnText from '../two-column/two-column-text'

const backgroundVariants = cva('align-center px-8 py-16 h-full w-full', {
  variants: {
    darkenImage: {
      false: null,
      true: 'backdrop-brightness-75',
    },
  },
})

const Hero = ({
  layout,
  preHeading,
  heading,
  headingElement,
  headingSize = 'Large',
  text,
  textColor = 'Dark',
  button1Label,
  button1Link,
  button1Style = 'Solid',
  button2Label,
  button2Link,
  button2Style = 'Outline',
  image,
  backgroundImage,
  darkenImage,
}) => {
  return (
    <div
      className="flex min-h-[672px] w-full justify-start bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={backgroundVariants({ darkenImage })}>
        <TwoColumnText
          button1Label={button1Label}
          button1Link={button1Link}
          button1Style={button1Style}
          button2Label={button2Label}
          button2Link={button2Link}
          button2Style={button2Style}
          heading={heading}
          headingElement={headingElement}
          headingSize={headingSize}
          image={image}
          layout={layout}
          preHeading={preHeading}
          text={text}
          textColor={textColor}
        />
      </div>
    </div>
  )
}

export default Hero

/**
 * Hero component that displays a full-width background with content
 */
Hero.propTypes = {
  /** URL of the background image */
  backgroundImage: PropTypes.string,
  /** Label for the first button */
  button1Label: PropTypes.string,
  /** URL for the first button */
  button1Link: PropTypes.string,
  /**
   * Style variant for the first button
   * @default 'Solid'
   */
  button1Style: PropTypes.string,
  /** Label for the second button */
  button2Label: PropTypes.string,
  /** URL for the second button */
  button2Link: PropTypes.string,
  /**
   * Style variant for the second button
   * @default 'Outline'
   */
  button2Style: PropTypes.string,
  /** Whether to darken the background image */
  darkenImage: PropTypes.bool,
  /** Main heading text */
  heading: PropTypes.string,
  /** HTML element to use for the heading */
  headingElement: PropTypes.string,
  /**
   * Size variant for the heading
   * @default 'Large'
   */
  headingSize: PropTypes.string,
  /** URL or object for the foreground image */
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Layout configuration for the component */
  layout: PropTypes.string,
  /** Text displayed above the heading */
  preHeading: PropTypes.string,
  /** Main content text */
  text: PropTypes.string,
  /**
   * Color variant for the text
   * @default
   */
  textColor: PropTypes.string,
}
