import { cva } from 'class-variance-authority'
import PropTypes from 'prop-types'

import { cn } from '../../lib/utils.js'
import Heading from '../heading/heading.jsx'

const gridVariants = cva(
  'gap-4 mx-auto grid w-full max-w-[1360px] place-items-center',
  {
    variants: {
      cardLayout: {
        '2 columns': 'gap-4 sm:grid-cols-2 md:grid-cols-2 grid grid-cols-1',
        '3 columns': 'gap-4 sm:grid-cols-2 md:grid-cols-3 grid grid-cols-1',
        '4 columns': 'gap-4 sm:grid-cols-2 md:grid-cols-4 grid grid-cols-1',
        '6 columns': 'gap-4 sm:grid-cols-2 md:grid-cols-6 grid grid-cols-1',
      },
    },
    defaultVariants: {
      cardLayout: '3 columns',
    },
  }
)

const CardContainer = ({
  cardLayout,
  children,
  className,
  layout,
  heading,
  headingLevel,
  headingSize = 'Medium',
  preHeading,
  textColor,
}) => {
  return (
    <div className={cn('gap-16 flex flex-col items-center', className)}>
      {heading ? (
        <Heading
          heading={heading}
          headingLevel={headingLevel}
          headingSize={headingSize}
          layout={layout}
          preHeading={preHeading}
          textColor={textColor}
        />
      ) : null}
      <div className={cn(gridVariants({ cardLayout }))}>{children}</div>
    </div>
  )
}

export default CardContainer

CardContainer.propTypes = {
  /**
   * Layout of cards in grid
   */
  cardLayout: PropTypes.oneOf([
    '2 columns',
    '3 columns',
    '4 columns',
    '6 columns',
  ]),
  /**
   * Child components to render inside the card container
   */
  children: PropTypes.node,
  /**
   * Additional class names to apply to the container
   */
  className: PropTypes.string,
  /**
   * Main heading text
   */
  heading: PropTypes.string,
  /**
   * Heading level (h1, h2, etc.)
   */
  headingLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /**
   * Size variant for the heading
   */
  headingSize: PropTypes.string,
  /**
   * Layout configuration
   */
  layout: PropTypes.string,
  /**
   * Text to display above the main heading
   */
  preHeading: PropTypes.string,
  /**
   * Color of the heading text
   */
  textColor: PropTypes.string,
}
