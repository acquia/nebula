import { cva } from 'class-variance-authority'

import { cn } from '../lib/utils'
import Heading from './heading'
import Text from './text'

const twoColumnTextImageLayoutVariants = cva(
  'flex flex-col flex-wrap items-center justify-between gap-8',
  {
    variants: {
      layout: {
        'Text - Image': 'flex-row',
        'Image - Text': 'flex-col',
      },
    },
    defaultVariants: {
      layout: 'Text - Image',
    },
  }
)

const TwoColumnTextImage = ({
  className,
  layout = 'Text - Image',
  preHeading = 'About us',
  heading = 'Who we are',
  headingElement = 'h2',
  headingSize = 'Large',
  text = 'This is a space to talk about your organization, its products, services or values.',
  textColor,
  textSize,
  image = '/src/assets/images/placeholder.png',
}) => {
  return (
    <div
      className={cn(twoColumnTextImageLayoutVariants({ layout }), className)}
    >
      <div className="md:flex-1">
        <Heading
          className="mb-4"
          heading={heading}
          headingElement={headingElement}
          headingSize={headingSize}
          preHeading={preHeading}
        />
        <Text
          className="text-balance"
          text={text}
          textColor={textColor}
          textSize={textSize}
        />
      </div>
      <div className="md:flex-1">
        <img alt={heading} src={image} />
      </div>
    </div>
  )
}

TwoColumnTextImage.displayName = 'TwoColumnTextImage'
export default TwoColumnTextImage
