import { cva } from 'class-variance-authority'

import { cn } from '../lib/utils'

const containerVariants = cva('dark flex w-full flex-col', {
  variants: {
    layout: {
      'Left aligned': 'items-start text-left',
      'Center aligned': 'items-center text-center',
      'Right aligned': 'items-end text-right',
    },
  },
})

const preHeadingVariants = cva('mb-4 text-lg font-bold', {
  variants: {
    textColor: {
      Dark: 'text-primary-dark',
      Light: 'text-primary-light',
    },
    headingSize: {
      ExtraLarge: 'text-lg',
      Large: 'text-base',
      Medium: 'text-sm',
      Small: 'text-xs',
    },
  },
})

const headingVariants = cva('font-bold leading-[normal] text-balance', {
  variants: {
    textColor: {
      Dark: 'text-black',
      Light: 'text-white',
    },
    headingSize: {
      ExtraLarge: 'text-6xl',
      Large: 'text-4xl',
      Medium: 'text-2xl',
      Small: 'text-lg',
    },
  },
})

const Heading = ({
  className,
  heading,
  headingElement = 'h2',
  headingSize = 'ExtraLarge',
  layout = 'Left aligned',
  preHeading,
  textColor = 'Dark',
}) => {
  const Heading = headingElement
  return preHeading || heading ? (
    <div className={cn(containerVariants({ layout }), className)}>
      {preHeading && (
        <div className={preHeadingVariants({ textColor, headingSize })}>
          {preHeading}
        </div>
      )}
      {heading && (
        <Heading className={headingVariants({ textColor, headingSize })}>
          {heading}
        </Heading>
      )}
    </div>
  ) : null
}

export default Heading
