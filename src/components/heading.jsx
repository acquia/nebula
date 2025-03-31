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
      Dark: 'text-blue-700',
      Light: 'text-primary-light',
    },
  },
})

const headingVariants = cva('leading-[normal] font-bold text-balance', {
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
  preHeading,
  heading,
  headingElement = 'h2',
  layout = 'Left aligned',
  headingSize = 'ExtraLarge',
  textColor = 'Dark',
  className,
}) => {
  const Heading = headingElement
  return (
    <div className={cn(containerVariants({ layout }), className)}>
      {preHeading && (
        <div className={preHeadingVariants({ textColor })}>{preHeading}</div>
      )}
      {heading && (
        <Heading className={headingVariants({ textColor, headingSize })}>
          {heading}
        </Heading>
      )}
    </div>
  )
}

export default Heading
