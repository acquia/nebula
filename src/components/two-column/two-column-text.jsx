import { cva } from 'class-variance-authority'

import Button from '../button/button'
import Heading from '../heading/heading'
import Text from '../text/text'

const heroVariants = cva('gap-8 mx-auto flex w-full max-w-[1360px] flex-col', {
  variants: {
    layout: {
      leftAligned: 'md:flex-row items-start justify-between',
      centered: 'flex-col items-center justify-center text-center',
    },
  },
  defaultVariants: {
    layout: 'leftAligned',
  },
})

const TwoColumnText = ({
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
}) => {
  const getButtonVariant = (style) => {
    if (style === 'Solid') {
      return 'solid'
    }
    if (style === 'Outline') {
      return textColor === 'Dark' ? 'outlineDark' : 'outlineLight'
    }
    return 'solid'
  }

  return (
    <div className="py-24 flex w-full justify-start bg-cover bg-center bg-no-repeat">
      <div className="flex w-full items-center justify-center">
        <div className={heroVariants({ layout })}>
          <div
            className={`max-w-xl gap-4 xl:max-w-lg flex flex-col items-start justify-start ${layout === 'centered' ? 'items-center' : 'items-start'}`}
          >
            <div className="mb-4">
              <Heading
                heading={heading}
                headingElement={headingElement}
                headingSize={headingSize}
                preHeading={preHeading}
                textColor={textColor}
              />
            </div>
            {text && (
              <Text
                className="mb-4"
                text={text}
                textColor={textColor}
                textSize="Large"
              />
            )}
            <div
              className={`gap-4 flex w-full ${layout === 'centered' ? 'justify-center' : 'justify-start'}`}
            >
              {button1Label && (
                <Button
                  link={button1Link}
                  variant={getButtonVariant(button1Style)}
                >
                  {button1Label}
                </Button>
              )}
              {button2Label && (
                <Button
                  link={button2Link}
                  variant={getButtonVariant(button2Style)}
                >
                  {button2Label}
                </Button>
              )}
            </div>
          </div>
          <div className="max-w-3xl flex">
            <img
              alt="Hero featured image"
              className="max-width-full w-full"
              src={image}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwoColumnText
