import { cva } from 'class-variance-authority'

import { cn } from '../lib/utils'
import Button from './button'
import Heading from './heading'

const cardVariants = cva(
  'flex w-full max-w-md flex-col items-center gap-4 rounded-2xl pb-6 leading-[normal]',
  {
    variants: {
      layout: {
        'Left aligned': 'items-start text-left',
        'Center aligned': 'items-center text-center',
        'Right aligned': 'items-end text-right',
      },
      textColor: {
        Default: null,
        Dark: 'text-blue-700',
        Light: 'text-white',
      },
      image: {
        true: null,
        false: 'pt-8',
      },
    },
    defaultVariants: {
      textColor: 'Default',
    },
  }
)

const Card = ({
  altText = '',
  backgroundColor = '#ffffff',
  backgroundColorOnHover = '#E2E8F0',
  className,
  image,
  heading,
  headingElement = 'h2',
  layout = 'Left aligned',
  link,
  linkLabel,
  linkVariant = 'link',
  text,
  textColor,
}) => {
  const cardBackgroundClassName = `card-${backgroundColor.substring(1)}`
  const cardBackgroundClassNameOnHover = `card-${backgroundColorOnHover.substring(1)}`

  return (
    <>
      <style>
        {`
          .${cardBackgroundClassName} {
            background-color: ${backgroundColor};
          }
          .${cardBackgroundClassNameOnHover}:hover {
            background-color: ${backgroundColorOnHover};
          }
        `}
      </style>
      <div
        className={cn(
          cardVariants({ layout, textColor, image: !!image }),
          cardBackgroundClassName,
          cardBackgroundClassNameOnHover,
          className
        )}
      >
        {image && (
          <img
            alt={altText}
            className="w-full rounded-2xl object-cover object-center"
            src={image}
          />
        )}
        <div className="px-6 pt-2">
          {heading && (
            <Heading
              className="mb-2"
              heading={heading}
              headingElement={headingElement}
              headingSize="Small"
              layout={layout}
              textColor={textColor}
            />
          )}
          {text && <p className="mb-4 leading-6">{text}</p>}
          {link && linkLabel && (
            <Button link={link} variant={linkVariant}>
              {linkLabel}
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default Card
