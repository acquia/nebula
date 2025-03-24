import { cva } from 'class-variance-authority'

import Heading from './heading'

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
  layout = 'Text - Image',
  preHeading = 'About us',
  heading = 'Who we are',
  headingElement = 'h2',
  text = 'This is a space to talk about your organization, its products, services or values.',
  image = '/src/assets/images/placeholder.png',
}) => {
  return (
    <div className={twoColumnTextImageLayoutVariants({ layout })}>
      <div className="md:flex-1">
        <Heading
          preHeading={preHeading}
          heading={heading}
          headingSize="Medium"
          headingElement={headingElement}
          className="mb-4"
        />
        <p>{text}</p>
      </div>
      <div className="md:flex-1">
        <img src={image} alt={heading} />
      </div>
    </div>
  )
}

TwoColumnTextImage.displayName = 'TwoColumnTextImage'
export default TwoColumnTextImage
